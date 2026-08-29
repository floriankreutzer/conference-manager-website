function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizedHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [name.toLowerCase(), String(value)]),
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

  const csp = headers['content-security-policy'] ?? '';
  requireCondition(csp.includes("object-src 'none'"), "CSP must contain object-src 'none'");
  requireCondition(csp.includes('frame-ancestors'), 'CSP must define frame-ancestors');
  requireCondition(csp.includes('base-uri'), 'CSP must define base-uri');
  requireCondition(
    headers['strict-transport-security']?.includes('max-age='),
    'HSTS must be present',
  );
  requireCondition(headers['referrer-policy'], 'Referrer-Policy must be present');
  requireCondition(headers['permissions-policy'], 'Permissions-Policy must be present');
  requireCondition(
    headers['x-content-type-options']?.toLowerCase() === 'nosniff',
    'X-Content-Type-Options must be nosniff',
  );
}
