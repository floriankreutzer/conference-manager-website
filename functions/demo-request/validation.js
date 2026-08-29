export const demoRequestServerLimits = Object.freeze({
  bodyBytes: 12_000,
  firstName: 80,
  lastName: 80,
  email: 254,
  company: 160,
  companySize: 40,
  message: 2_000,
  locale: 2,
  honeypot: 200,
});

const allowedCompanySizes = new Set(['1-49', '50-249', '250-999', '1000-4999', '5000+']);
const allowedLocales = new Set(['en', 'de']);
const businessEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

function normalize(value) {
  return typeof value === 'string' ? value.trim().replace(/\r\n?/gu, '\n') : '';
}

function hasControlCharacters(value) {
  return [...value].some((character) => {
    const codePoint = character.codePointAt(0);
    if (codePoint === undefined) return false;
    return (codePoint >= 0 && codePoint <= 8) || codePoint === 11 || codePoint === 12 || (codePoint >= 14 && codePoint <= 31) || codePoint === 127;
  });
}

export function parseFormBody(body, isBase64Encoded = false) {
  if (typeof body !== 'string') return null;

  let decodedBody = body;
  if (isBase64Encoded) {
    try {
      decodedBody = Buffer.from(body, 'base64').toString('utf8');
    } catch {
      return null;
    }
  }

  if (Buffer.byteLength(decodedBody, 'utf8') > demoRequestServerLimits.bodyBytes) return null;

  const params = new URLSearchParams(decodedBody);
  return Object.fromEntries(params.entries());
}

export function validateDemoRequest(raw) {
  if (!raw || typeof raw !== 'object') return { ok: false, code: 'invalid_request' };

  const request = {
    firstName: normalize(raw.firstName),
    lastName: normalize(raw.lastName),
    email: normalize(raw.email).toLowerCase(),
    company: normalize(raw.company),
    companySize: normalize(raw.companySize),
    message: normalize(raw.message),
    locale: normalize(raw.locale).toLowerCase(),
    website: normalize(raw.website),
    privacyAcknowledged: normalize(raw.privacyAcknowledged),
  };

  if (request.website) return { ok: false, code: 'rejected' };

  const required = ['firstName', 'lastName', 'email', 'company', 'companySize', 'locale'];
  if (required.some((field) => !request[field])) return { ok: false, code: 'invalid_request' };
  if (request.privacyAcknowledged !== 'true') return { ok: false, code: 'invalid_request' };

  const lengthChecks = [
    ['firstName', demoRequestServerLimits.firstName],
    ['lastName', demoRequestServerLimits.lastName],
    ['email', demoRequestServerLimits.email],
    ['company', demoRequestServerLimits.company],
    ['companySize', demoRequestServerLimits.companySize],
    ['message', demoRequestServerLimits.message],
    ['locale', demoRequestServerLimits.locale],
    ['website', demoRequestServerLimits.honeypot],
  ];

  if (lengthChecks.some(([field, max]) => request[field].length > max)) {
    return { ok: false, code: 'invalid_request' };
  }

  if (Object.values(request).some(hasControlCharacters)) return { ok: false, code: 'invalid_request' };
  if (!businessEmailPattern.test(request.email)) return { ok: false, code: 'invalid_request' };
  if (!allowedCompanySizes.has(request.companySize)) return { ok: false, code: 'invalid_request' };
  if (!allowedLocales.has(request.locale)) return { ok: false, code: 'invalid_request' };

  return { ok: true, value: request };
}

export function toPlainTextEmail(request) {
  const message = request.message || '(none)';
  return [
    'New Conference Manager demo request',
    '',
    `Name: ${request.firstName} ${request.lastName}`,
    `Business email: ${request.email}`,
    `Company: ${request.company}`,
    `Company size: ${request.companySize}`,
    `Locale: ${request.locale}`,
    '',
    'Message:',
    message,
  ].join('\n');
}
