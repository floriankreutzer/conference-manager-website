import https from 'node:https';
import { parseFormBody, toPlainTextEmail, validateDemoRequest } from './validation.js';

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body),
  };
}

function getHeader(headers, name) {
  if (!headers || typeof headers !== 'object') return '';
  const target = name.toLowerCase();
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === target);
  return typeof entry?.[1] === 'string' ? entry[1] : '';
}

export function readRequiredEnv(env = process.env) {
  const config = {
    secretKey: env.SCW_SECRET_KEY,
    projectId: env.SCW_PROJECT_ID,
    region: env.SCW_TEM_REGION || 'fr-par',
    senderEmail: env.DEMO_REQUEST_SENDER_EMAIL,
    senderName: env.DEMO_REQUEST_SENDER_NAME || 'Conference Manager',
    recipientEmail: env.DEMO_REQUEST_RECIPIENT_EMAIL,
    recipientName: env.DEMO_REQUEST_RECIPIENT_NAME || 'Conference Manager Demo',
  };

  const requiredKeys = ['secretKey', 'projectId', 'senderEmail', 'recipientEmail'];
  return requiredKeys.some((key) => !config[key]) ? null : config;
}

export function sendTransactionalEmail(config, request) {
  const payload = JSON.stringify({
    from: { name: config.senderName, email: config.senderEmail },
    to: [{ name: config.recipientName, email: config.recipientEmail }],
    subject: `Conference Manager demo request — ${request.company}`,
    text: toPlainTextEmail(request),
    project_id: config.projectId,
    additional_headers: [{ key: 'Reply-To', value: request.email }],
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
    const req = https.request(options, (res) => {
      res.resume();
      res.on('end', () => {
        const statusCode = res.statusCode ?? 500;
        if (statusCode >= 200 && statusCode < 300) {
          resolve();
          return;
        }
        reject(new Error(`Transactional Email returned ${statusCode}`));
      });
    });

    req.on('timeout', () => req.destroy(new Error('Transactional Email timeout')));
    req.on('error', reject);
    req.end(payload);
  });
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
    if (!config) return response(503, { status: 'error', code: 'temporarily_unavailable' });

    try {
      await sendEmail(config, validation.value);
      return response(202, { status: 'accepted' });
    } catch {
      return response(503, { status: 'error', code: 'temporarily_unavailable' });
    }
  };
}

export const handle = createHandler();
