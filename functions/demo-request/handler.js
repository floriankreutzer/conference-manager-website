import { readRequiredEnv } from './config.js';
import { createDemoResponse as response } from './browser-response.js';
import { sendTransactionalEmail } from './transactional-email.js';
import { parseFormBody, validateDemoRequest } from './validation.js';

function getHeader(headers, name) {
  if (!headers || typeof headers !== 'object') return '';
  const target = name.toLowerCase();
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === target);
  return typeof entry?.[1] === 'string' ? entry[1] : '';
}

export function createHandler({ env = process.env, sendEmail = sendTransactionalEmail } = {}) {
  return async function demoRequestHandler(event) {
    const responseOptions = { accept: getHeader(event?.headers, 'accept') };
    if (event?.httpMethod !== 'POST') {
      return response(405, { status: 'error', code: 'method_not_allowed' }, responseOptions);
    }

    const contentType = getHeader(event.headers, 'content-type')
      .split(';', 1)[0]
      .trim()
      .toLowerCase();
    if (contentType !== 'application/x-www-form-urlencoded') {
      return response(415, { status: 'error', code: 'unsupported_media_type' }, responseOptions);
    }

    const raw = parseFormBody(event.body, event.isBase64Encoded === true);
    const formResponseOptions = { ...responseOptions, locale: raw?.locale };
    const validation = validateDemoRequest(raw);
    if (!validation.ok) {
      // Honeypot rejection intentionally looks like a normal accepted request to bots.
      if (validation.code === 'rejected')
        return response(202, { status: 'accepted' }, formResponseOptions);
      return response(400, { status: 'error', code: 'invalid_request' }, formResponseOptions);
    }

    const config = readRequiredEnv(env);
    if (!config) {
      return response(
        503,
        { status: 'error', code: 'temporarily_unavailable' },
        { ...formResponseOptions, headers: { 'Retry-After': '60' } },
      );
    }

    try {
      // Do not automatically retry create-email calls. A timeout/network failure can be
      // ambiguous and the provider API does not expose an idempotency key for this POST.
      await sendEmail(config, validation.value);
      return response(202, { status: 'accepted' }, formResponseOptions);
    } catch {
      return response(
        503,
        { status: 'error', code: 'temporarily_unavailable' },
        { ...formResponseOptions, headers: { 'Retry-After': '60' } },
      );
    }
  };
}

export const handle = createHandler();
