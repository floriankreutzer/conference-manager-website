function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizedHeaders(headers) {
  const normalized = new Map();
  for (const [name, value] of Object.entries(headers)) {
    const key = name.toLowerCase();
    requireCondition(!normalized.has(key), 'Response headers must not have duplicate names');
    requireCondition(
      !/[\r\n]/u.test(String(value)),
      'Response header values must not contain newlines',
    );
    normalized.set(key, String(value));
  }
  return Object.fromEntries(normalized);
}

function parseCsp(value) {
  requireCondition(typeof value === 'string' && value.trim(), 'CSP must be present');
  assertAsciiHeader(value, 'CSP');
  requireCondition(!/[,\r\n]/u.test(value), 'CSP must be one unambiguous policy');
  const directives = new Map();
  for (const part of value.split(';')) {
    if (!part.trim()) continue;
    const [rawName, ...sources] = part.trim().split(/\s+/u);
    const name = rawName.toLowerCase();
    requireCondition(/^[a-z][a-z0-9-]*$/u.test(name), 'CSP directive name is invalid');
    requireCondition(!directives.has(name), 'CSP must not contain duplicate directives');
    requireCondition(
      sources.every(
        (source) =>
          !source.includes('*') &&
          !/^'(?:unsafe-[^']+|wasm-unsafe-eval)'$/iu.test(source) &&
          !/^[a-z][a-z0-9+.-]*:$/iu.test(source) &&
          !/^http:\/\//iu.test(source),
      ),
      'CSP must not permit wildcard sources, insecure sources or unsafe execution',
    );
    directives.set(name, sources);
  }
  return directives;
}

function assertAsciiHeader(value, name) {
  requireCondition(
    typeof value === 'string' && /^[\t\x20-\x7e]*$/u.test(value),
    `${name} must use ASCII header syntax`,
  );
}

function parsePermissionsPolicy(value) {
  assertAsciiHeader(value, 'Permissions-Policy');
  // Validate a complete RFC 8941 subset: lowercase keys and inner lists containing
  // self or structured strings. Unsupported item types and parameters fail closed.
  const quotedString = String.raw`"(?:[\x20-\x21\x23-\x5b\x5d-\x7e]|\\["\\])*"`;
  const item = `(?:self|${quotedString})`;
  const member = new RegExp(
    String.raw`([a-z*][a-z0-9_.*-]*)=\(( *(?:${item}(?: +${item})* *)?)\)[ \t]*(,|$)[ \t]*`,
    'uy',
  );
  // A structured dictionary permits leading SP, but not a leading HTAB.
  const policy = value.replace(/^ */u, '');
  const permissions = new Map();
  while (member.lastIndex < policy.length) {
    const match = member.exec(policy);
    requireCondition(match, 'Permissions-Policy must use supported structured allowlists');
    requireCondition(
      !permissions.has(match[1]),
      'Permissions-Policy contains duplicate directives',
    );
    permissions.set(match[1], match[2].trim());
    requireCondition(
      match[3] !== ',' || member.lastIndex < policy.length,
      'Permissions-Policy must not contain a trailing comma',
    );
  }
  return permissions;
}

function assertRestrictedDirective(directives, name, allowed) {
  const sources = directives.get(name);
  requireCondition(
    sources?.length === 1 && allowed.includes(sources[0]),
    `CSP ${name} must contain one restrictive allowed source`,
  );
}

function assertExecutionSources(sources, name) {
  const hashedOrNonce = /^'(?:nonce|sha256|sha384|sha512)-[A-Za-z0-9+/_-]+={0,2}'$/u;
  requireCondition(
    sources?.length > 0 &&
      sources.every(
        (source) => source === "'self'" || source === "'none'" || hashedOrNonce.test(source),
      ) &&
      (!sources.includes("'none'") || sources.length === 1),
    `CSP ${name} must restrict execution to same-origin assets or explicit hashes/nonces`,
  );
}

function assertSecurityHeaders(headers) {
  const directives = parseCsp(headers['content-security-policy']);
  assertRestrictedDirective(directives, 'default-src', ["'none'", "'self'"]);
  assertRestrictedDirective(directives, 'object-src', ["'none'"]);
  assertRestrictedDirective(directives, 'base-uri', ["'none'", "'self'"]);
  assertRestrictedDirective(directives, 'frame-ancestors', ["'none'", "'self'"]);

  for (const type of ['script', 'style']) {
    const fallback = directives.get(`${type}-src`) ?? directives.get('default-src');
    assertExecutionSources(fallback, `${type}-src`);
    for (const variant of ['elem', 'attr']) {
      assertExecutionSources(
        directives.get(`${type}-src-${variant}`) ?? fallback,
        `${type}-src-${variant}`,
      );
    }
  }

  const hsts = headers['strict-transport-security'] ?? '';
  assertAsciiHeader(hsts, 'HSTS');
  const hstsDirectives = new Map();
  for (const part of hsts.split(';')) {
    // RFC 6797 section 6.1 permits empty directives, including a trailing semicolon.
    if (!part.trim()) continue;
    const match =
      /^\s*([a-z][a-z0-9-]*)(?:\s*=\s*("(?:[^"\\]|\\[\t\x20-\x7e])*"|[!#$%&'*+.^`|~0-9A-Za-z_-]+))?\s*$/iu.exec(
        part,
      );
    requireCondition(match, 'HSTS directive is malformed');
    const name = match[1].toLowerCase();
    requireCondition(!hstsDirectives.has(name), 'HSTS must not contain duplicate directives');
    requireCondition(
      name !== 'includesubdomains' || match[2] === undefined,
      'HSTS includeSubDomains must be valueless',
    );
    hstsDirectives.set(name, match[2]);
  }
  const rawMaxAge = hstsDirectives.get('max-age') ?? '';
  const maxAge = rawMaxAge.startsWith('"')
    ? rawMaxAge.slice(1, -1).replace(/\\([\t\x20-\x7e])/gu, '$1')
    : rawMaxAge;
  requireCondition(
    /^\d+$/u.test(maxAge) && Number.isSafeInteger(Number(maxAge)) && Number(maxAge) > 0,
    'HSTS max-age must be a positive integer',
  );

  const referrerPolicies = new Set([
    'no-referrer',
    'same-origin',
    'strict-origin',
    'strict-origin-when-cross-origin',
  ]);
  assertAsciiHeader(headers['referrer-policy'], 'Referrer-Policy');
  requireCondition(
    referrerPolicies.has(headers['referrer-policy']?.trim().toLowerCase()),
    'Referrer-Policy must limit cross-origin disclosure',
  );

  const permissions = parsePermissionsPolicy(headers['permissions-policy']);
  requireCondition(
    ['camera', 'microphone', 'geolocation'].every((feature) => permissions.get(feature) === ''),
    'Permissions-Policy must disable camera, microphone and geolocation',
  );
  assertAsciiHeader(headers['x-content-type-options'], 'X-Content-Type-Options');
  requireCondition(
    headers['x-content-type-options']?.trim().toLowerCase() === 'nosniff',
    'X-Content-Type-Options must be nosniff',
  );
}

export function validateDeploymentOrigin(value) {
  const url = new URL(value);
  requireCondition(url.protocol === 'https:', 'Deployment origin must use HTTPS');
  requireCondition(
    !url.username && !url.password,
    'Deployment origin must not contain credentials',
  );
  requireCondition(
    !url.search && !url.hash,
    'Deployment origin must not contain query or fragment',
  );
  requireCondition(
    url.pathname === '/' || url.pathname === '',
    'Deployment origin must not contain a path',
  );
  requireCondition(
    !['localhost', '127.0.0.1', '::1'].includes(url.hostname),
    'Deployment origin must be public',
  );
  return url.origin;
}

export function assertDeploymentContract({
  mode,
  origin,
  pageHtml,
  pageHeaders,
  robotsText,
  sitemapText,
}) {
  requireCondition(
    mode === 'preview' || mode === 'production',
    'Mode must be preview or production',
  );
  const normalizedOrigin = validateDeploymentOrigin(origin);
  const headers = normalizedHeaders(pageHeaders);

  requireCondition(
    pageHtml.includes(`${normalizedOrigin}/en/`),
    'Rendered page does not reference the expected canonical origin',
  );

  if (mode === 'preview') {
    requireCondition(
      /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(pageHtml),
      'Preview page must contain noindex robots metadata',
    );
    requireCondition(
      robotsText === 'User-agent: *\nDisallow: /\n',
      'Preview robots.txt must block crawling',
    );
    requireCondition(
      !sitemapText.includes('<url>'),
      'Preview sitemap must not expose indexable URLs',
    );
    return;
  }

  requireCondition(!/noindex/i.test(pageHtml), 'Production page must not contain noindex');
  requireCondition(robotsText.includes('Allow: /'), 'Production robots.txt must allow crawling');
  requireCondition(
    robotsText.includes(`${normalizedOrigin}/sitemap.xml`),
    'Production robots.txt must reference the production sitemap',
  );
  requireCondition(
    sitemapText.includes(`${normalizedOrigin}/en/`),
    'Production sitemap must contain the English homepage',
  );
  requireCondition(
    sitemapText.includes(`${normalizedOrigin}/de/`),
    'Production sitemap must contain the German homepage',
  );

  assertSecurityHeaders(headers);
}
