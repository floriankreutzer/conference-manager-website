import { EventEmitter } from 'node:events';
import { describe, expect, it, vi } from 'vitest';
import {
  createTransactionalEmailSender,
  TransactionalEmailError,
} from './transactional-email.js';

const config = {
  secretKey: 'test-secret',
  projectId: '00000000-0000-0000-0000-000000000000',
  region: 'fr-par',
  senderEmail: 'sender@example.org',
  senderName: 'Conference Manager',
  recipientEmail: 'demo@example.org',
  recipientName: 'Demo Team',
};

const demoRequest = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.org',
  company: 'Analytical Engines Ltd',
  companySize: '250-999',
  message: 'Please contact me.',
  locale: 'en',
  privacyAcknowledged: true,
};

function requestDouble({ statusCode = 200, networkError = false, timeout = false } = {}) {
  return vi.fn((options, callback) => {
    const request = new EventEmitter();
    request.destroy = vi.fn((error) => request.emit('error', error));
    request.end = vi.fn(() => {
      if (timeout) {
        request.emit('timeout');
        return;
      }
      if (networkError) {
        request.emit('error', new Error('socket failed'));
        return;
      }

      const response = new EventEmitter();
      response.statusCode = statusCode;
      response.resume = vi.fn();
      callback(response);
      response.emit('end');
    });
    return request;
  });
}

describe('Scaleway Transactional Email transport', () => {
  it('accepts a successful provider response', async () => {
    const request = requestDouble({ statusCode: 200 });
    const send = createTransactionalEmailSender({ request });

    await expect(send(config, demoRequest)).resolves.toBeUndefined();
    expect(request).toHaveBeenCalledOnce();
  });

  it('classifies an explicit provider rejection as non-ambiguous', async () => {
    const send = createTransactionalEmailSender({ request: requestDouble({ statusCode: 503 }) });

    await expect(send(config, demoRequest)).rejects.toMatchObject({
      name: 'TransactionalEmailError',
      statusCode: 503,
      ambiguous: false,
    });
  });

  it('classifies a network failure as ambiguous', async () => {
    const send = createTransactionalEmailSender({ request: requestDouble({ networkError: true }) });

    await expect(send(config, demoRequest)).rejects.toMatchObject({
      name: 'TransactionalEmailError',
      ambiguous: true,
    });
  });

  it('classifies a timeout as ambiguous and destroys the request', async () => {
    const request = requestDouble({ timeout: true });
    const send = createTransactionalEmailSender({ request });

    await expect(send(config, demoRequest)).rejects.toBeInstanceOf(TransactionalEmailError);
    const requestInstance = request.mock.results[0].value;
    expect(requestInstance.destroy).toHaveBeenCalledOnce();
  });
});
