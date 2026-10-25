import { createHash } from 'node:crypto';
import { demoResponseCopy } from './response-copy.js';

const relevantMediaRanges = new Set([
  'text/html',
  'application/json',
  'text/*',
  'application/*',
  '*/*',
]);

// Native form navigation explicitly prefers HTML. Wildcards alone retain the existing
// JSON contract. A more specific range overrides a wildcard (RFC 9110, section 12.5.1).
export function prefersBrowserHtml(accept) {
  if (typeof accept !== 'string' || accept.length > 4096) return false;
  const qualities = new Map();

  for (const entry of accept.split(',')) {
    const [rawType, ...parameters] = entry.split(';');
    const type = rawType.trim().toLowerCase();
    if (!relevantMediaRanges.has(type)) continue;
    if (qualities.has(type)) return false;

    let quality = 1;
    let hasQuality = false;
    for (const parameter of parameters) {
      const trimmed = parameter.trim();
      // UTF-8 is the only offered charset. Other media parameters are not negotiated.
      if (/^charset\s*=\s*(?:utf-8|"utf-8")$/iu.test(trimmed)) continue;
      const match = /^q\s*=\s*(0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/iu.exec(trimmed);
      if (!match || hasQuality) return false;
      hasQuality = true;
      quality = Number(match[1]);
    }
    qualities.set(type, quality);
  }

  const htmlQuality = qualities.get('text/html') ?? 0;
  const jsonQuality =
    qualities.get('application/json') ??
    qualities.get('application/*') ??
    qualities.get('*/*') ??
    0;
  return htmlQuality > 0 && htmlQuality > jsonQuality;
}

// This standalone fallback uses native canvas colours and the existing system-font
// fallback. Relative layout only: no second brand palette, font asset or runtime dependency.
const responseStyle = `
:root { color-scheme: light; font-family: system-ui, sans-serif; line-height: 1.6; }
body { margin: 0; }
main { box-sizing: border-box; max-inline-size: 68ch; margin-inline: auto; padding: clamp(1rem, 5vw, 3rem); overflow-wrap: anywhere; }
h1 { font-size: clamp(1.6rem, 5vw, 2.25rem); line-height: 1.2; text-wrap: balance; }
p { margin-block: 1em; }
`;
const styleHash = createHash('sha256').update(responseStyle).digest('base64');
const htmlHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Content-Security-Policy': `default-src 'none'; style-src 'sha256-${styleHash}'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`,
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
  'Referrer-Policy': 'no-referrer',
};

function responseLocale(value) {
  return typeof value === 'string' && value.trim().toLowerCase() === 'de' ? 'de' : 'en';
}

function escapeText(value) {
  return value.replace(/[&<>"']/gu, (character) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
  });
}

export function createDemoResponse(statusCode, payload, { accept, locale, headers = {} } = {}) {
  const commonHeaders = { ...headers, 'Cache-Control': 'no-store', Vary: 'Accept' };
  if (!prefersBrowserHtml(accept)) {
    return {
      statusCode,
      headers: { ...commonHeaders, 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    };
  }

  const language = responseLocale(locale);
  const catalogue = demoResponseCopy[language];
  const outcome = payload.status === 'accepted' ? 'accepted' : payload.code;
  const copy = Object.hasOwn(catalogue, outcome)
    ? catalogue[outcome]
    : catalogue.temporarily_unavailable;

  return {
    statusCode,
    headers: { ...commonHeaders, ...htmlHeaders, 'Content-Language': language },
    body: `<!doctype html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeText(copy.title)} — Conference Manager</title>
<style>${responseStyle}</style>
</head>
<body>
<main aria-labelledby="request-result-title">
<p>Conference Manager</p>
<h1 id="request-result-title">${escapeText(copy.title)}</h1>
<p>${escapeText(copy.message)}</p>
<p>${escapeText(copy.next)}</p>
</main>
</body>
</html>`,
  };
}
