import { TextDecoder } from 'node:util';

export const demoRequestServerLimits = Object.freeze({
  // Preserve the data budget independently of percent-encoding overhead.
  bodyBytes: 12_000,
  encodedBodyBytes: 36_000,
  firstName: 80,
  lastName: 80,
  email: 254,
  company: 160,
  companySize: 40,
  message: 2_000,
  locale: 2,
  honeypot: 200,
});

const allowedCompanySizes = new Set([
  '1-49',
  '50-249',
  '250-999',
  '1000-4999',
  '5000-9999',
  '10000+',
]);
const allowedLocales = new Set(['en', 'de']);
export const businessEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const allowedFields = new Set([
  'firstName',
  'lastName',
  'email',
  'company',
  'companySize',
  'message',
  'locale',
  'website',
  'privacyAcknowledged',
]);

function normalize(value) {
  return typeof value === 'string' ? value.trim().replace(/\r\n?/gu, '\n') : '';
}

function hasControlCharacters(value, multiline = false) {
  return [...value].some((character) => {
    const codePoint = character.codePointAt(0);
    if (codePoint === undefined) return false;
    return (
      (codePoint >= 0 && codePoint <= 31 && !(multiline && [9, 10].includes(codePoint))) ||
      codePoint === 127
    );
  });
}

export function parseFormBody(body, isBase64Encoded = false) {
  const rejected = (locale, issue = 'form') => ({ fields: null, locale, issue });
  if (typeof body !== 'string') return rejected();

  let decodedBody = body;
  if (isBase64Encoded) {
    // Bound allocation before decoding. Only canonical, padded base64 is accepted.
    const maxBase64Length = 4 * Math.ceil(demoRequestServerLimits.encodedBodyBytes / 3);
    if (body.length > maxBase64Length) return rejected(undefined, 'body');
    if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(body)) {
      return rejected();
    }
    try {
      const bytes = Buffer.from(body, 'base64');
      if (bytes.toString('base64') !== body) return rejected();
      decodedBody = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch {
      return rejected();
    }
  }

  if (
    decodedBody.length > demoRequestServerLimits.encodedBodyBytes ||
    Buffer.byteLength(decodedBody, 'utf8') > demoRequestServerLimits.encodedBodyBytes
  ) {
    return rejected(undefined, 'body');
  }
  if (!decodedBody.isWellFormed()) return rejected();

  const params = new URLSearchParams(decodedBody);
  const locales = params.getAll('locale');
  const locale = locales.length === 1 ? normalize(locales[0]).toLowerCase() : undefined;
  const responseLocale = allowedLocales.has(locale) ? locale : undefined;

  // Decode once for strict UTF-8/escape validation and the unchanged data budget.
  // Parsing still uses the encoded input, so escaped separators remain field data.
  try {
    const formData = decodeURIComponent(decodedBody.replace(/\+/gu, ' '));
    if (Buffer.byteLength(formData, 'utf8') > demoRequestServerLimits.bodyBytes) {
      return rejected(responseLocale, 'body');
    }
  } catch {
    return rejected(responseLocale);
  }

  const seen = new Set();
  for (const key of params.keys()) {
    if (!allowedFields.has(key) || seen.has(key)) return rejected(responseLocale);
    seen.add(key);
  }
  return { fields: Object.fromEntries(params.entries()), locale: responseLocale, issue: null };
}

export function validateDemoRequest(raw) {
  if (
    !raw ||
    typeof raw !== 'object' ||
    Array.isArray(raw) ||
    Object.entries(raw).some(([key, value]) => !allowedFields.has(key) || typeof value !== 'string')
  ) {
    return { ok: false, code: 'invalid_request', fields: ['form'] };
  }

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

  const errors = new Set();
  const required = ['firstName', 'lastName', 'email', 'company', 'companySize', 'locale'];
  for (const field of required) {
    if (!request[field]) errors.add(field);
  }
  if (request.privacyAcknowledged !== 'true') errors.add('privacyAcknowledged');

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

  for (const [field, max] of lengthChecks) {
    if (request[field].length > max || hasControlCharacters(request[field], field === 'message')) {
      errors.add(field);
    }
  }

  if (!businessEmailPattern.test(request.email)) errors.add('email');
  if (!allowedCompanySizes.has(request.companySize)) errors.add('companySize');
  if (!allowedLocales.has(request.locale)) errors.add('locale');
  if (errors.size) return { ok: false, code: 'invalid_request', fields: [...errors] };

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
