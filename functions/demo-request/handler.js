import { readRequiredEnv } from './config.js';
import { sendTransactionalEmail } from './transactional-email.js';
import { parseFormBody, validateDemoRequest } from './validation.js';

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function response(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: { ...jsonHeaders, ...extraHeaders },
    body: JSON.stringify(body),
  };
}

function getHeader(headers, name) {
  if (!headers || typeof headers !== 'object') return '';
  const target = name.toLowerCase();
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === target);
  return typeof entry?.[1] === 'string' ? entry[1] : '';
}

export function createHandler({ env = process.env, sendEmail = sendTransactionalEmail } = {}) {
  return async function demoRequestHandler(event) {
    if (event?.httpMethod !== 'POST') {
      return response(405, { status: 'error', code: 'method_not_allowed' });
    }

    const contentType = getHeader(event.headers, 'content-type')
      .split(';', 1)[0]
      .trim()
      .toLowerCase();
    if (contentType !== 'application/x-www-form-urlencoded') {
      return response(415, { status: 'error', code: 'unsupported_media_type' });
    }

    const raw = parseFormBody(event.body, event.isBase64Encoded === true);
    const validation = validateDemoRequest(raw);
    if (!validation.ok) {
      // Honeypot rejection intentionally looks like a normal accepted request to bots.
      if (validation.code === 'rejected') return response(202, { status: 'accepted' });
      return response(400, { status: 'error', code: 'invalid_request' });
    }

    const config = readRequiredEnv(env);
    if (!config) {
      return response(
        503,
        { status: 'error', code: 'temporarily_unavailable' },
        { 'Retry-After': '60' },
      );
    }

    try {
      // Do not automatically retry create-email calls. A timeout/network failure can be
      // ambiguous and the provider API does not expose an idempotency key for this POST.
      await sendEmail(config, validation.value);
      return response(202, { status: 'accepted' });
    } catch {
      return response(
        503,
        { status: 'error', code: 'temporarily_unavailable' },
        { 'Retry-After': '60' },
      );
    }
  };
}

export const handle = createHandler();
