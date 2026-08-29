import https from 'node:https';
import { toPlainTextEmail } from './validation.js';

export class TransactionalEmailError extends Error {
  constructor(message, { statusCode = null, ambiguous = false } = {}) {
    super(message);
    this.name = 'TransactionalEmailError';
    this.statusCode = statusCode;
    this.ambiguous = ambiguous;
  }
}

export function createTransactionalEmailSender({ request = https.request } = {}) {
  return function sendTransactionalEmail(config, demoRequest) {
    const payload = JSON.stringify({
      from: { name: config.senderName, email: config.senderEmail },
      to: [{ name: config.recipientName, email: config.recipientEmail }],
      subject: `Conference Manager demo request — ${demoRequest.company}`,
      text: toPlainTextEmail(demoRequest),
      project_id: config.projectId,
      additional_headers: [{ key: 'Reply-To', value: demoRequest.email }],
    });

    const options = {
      hostname: 'api.scaleway.com',
      path: `/transactional-email/v1alpha1/regions/${encodeURIComponent(config.region)}/emails`,
      method: 'POST',
      timeout: 8_000,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'X-Auth-Token': config.secretKey,
      },
    };

    return new Promise((resolve, reject) => {
      const req = request(options, (res) => {
        res.resume();
        res.on('end', () => {
          const statusCode = res.statusCode ?? 500;
          if (statusCode >= 200 && statusCode < 300) {
            resolve();
            return;
          }

          reject(
            new TransactionalEmailError('Transactional Email rejected the request', {
              statusCode,
              ambiguous: false,
            }),
          );
        });
      });

      req.on('timeout', () =>
        req.destroy(
          new TransactionalEmailError('Transactional Email request timed out', {
            ambiguous: true,
          }),
        ),
      );
      req.on('error', (error) => {
        reject(
          error instanceof TransactionalEmailError
            ? error
            : new TransactionalEmailError('Transactional Email network failure', {
                ambiguous: true,
              }),
        );
      });
      req.end(payload);
    });
  };
}

export const sendTransactionalEmail = createTransactionalEmailSender();
