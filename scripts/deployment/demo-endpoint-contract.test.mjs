import { describe, expect, it, vi } from 'vitest';
import { validateDemoEndpoint, verifyDemoEndpoint } from './demo-endpoint-contract.mjs';

function jsonResponse(status, body) {
  return {
    status,
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
  };
}

function successfulFetch() {
  return vi.fn(async (_url, options) => {
    if (options.method === 'GET') {
      return jsonResponse(405, { status: 'error', code: 'method_not_allowed' });
    }
    if (options.headers['Content-Type'] === 'application/json') {
      return jsonResponse(415, { status: 'error', code: 'unsupported_media_type' });
    }

    const values = new URLSearchParams(options.body);
    if (values.get('website')) return jsonResponse(202, { status: 'accepted' });
    if (values.get('firstName') === '<acceptance-invalid-marker>') {
      return jsonResponse(400, { status: 'error', code: 'invalid_request' });
    }
    return jsonResponse(202, { status: 'accepted' });
  });
}

describe('demo endpoint URL validation', () => {
  it('accepts a public HTTPS function URL including a path', () => {
    expect(validateDemoEndpoint('https://example.org/functions/demo')).toBe(
      'https://example.org/functions/demo',
    );
  });

  it('rejects insecure, local, credentialed and query-bearing endpoints', () => {
    expect(() => validateDemoEndpoint('http://example.org/demo')).toThrow(/HTTPS/);
    expect(() => validateDemoEndpoint('https://localhost/demo')).toThrow(/public/);
    expect(() => validateDemoEndpoint('https://user:secret@example.org/demo')).toThrow(
      /credentials/,
    );
    expect(() => validateDemoEndpoint('https://example.org/demo?token=value')).toThrow(/query/);
  });
});

describe('demo endpoint operational acceptance', () => {
  it('runs only non-delivery checks by default', async () => {
    const fetchImpl = successfulFetch();

    await expect(
      verifyDemoEndpoint({ endpoint: 'https://example.org/demo', fetchImpl }),
    ).resolves.toMatchObject({ mode: 'negative' });

    expect(fetchImpl).toHaveBeenCalledTimes(4);
  });

  it('sends exactly one additional synthetic request only in delivery mode', async () => {
    const fetchImpl = successfulFetch();

    await expect(
      verifyDemoEndpoint({
        endpoint: 'https://example.org/demo',
        mode: 'delivery',
        fetchImpl,
      }),
    ).resolves.toMatchObject({ mode: 'delivery' });

    expect(fetchImpl).toHaveBeenCalledTimes(5);
    const deliveryCall = fetchImpl.mock.calls[4];
    const body = new URLSearchParams(deliveryCall[1].body);
    expect(body.get('email')).toBe('demo-acceptance@example.invalid');
    expect(body.get('website')).toBe('');
  });

  it('fails if invalid input is reflected in the public response', async () => {
    const fetchImpl = successfulFetch();
    fetchImpl.mockImplementationOnce(async () =>
      jsonResponse(405, { status: 'error', code: 'method_not_allowed' }),
    );
    fetchImpl.mockImplementationOnce(async () =>
      jsonResponse(415, { status: 'error', code: 'unsupported_media_type' }),
    );
    fetchImpl.mockImplementationOnce(async () => ({
      status: 400,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          status: 'error',
          code: 'invalid_request',
          value: '<acceptance-invalid-marker>',
        }),
      ),
    }));

    await expect(
      verifyDemoEndpoint({ endpoint: 'https://example.org/demo', fetchImpl }),
    ).rejects.toThrow(/reflected/);
  });
});
