import { describe, expect, it } from 'vitest';
import { assertDeploymentContract, validateDeploymentOrigin } from './deployment-contract.mjs';

const productionHeaders = {
  'content-security-policy':
    "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'x-content-type-options': 'nosniff',
};

function acceptProduction(headers = productionHeaders) {
  return assertDeploymentContract({
    mode: 'production',
    origin: 'https://www.example.org',
    pageHtml: '<link rel="canonical" href="https://www.example.org/en/">',
    pageHeaders: headers,
    robotsText: 'User-agent: *\nAllow: /\nSitemap: https://www.example.org/sitemap.xml\n',
    sitemapText:
      '<url><loc>https://www.example.org/en/</loc></url><url><loc>https://www.example.org/de/</loc></url>',
  });
}

describe('deployment origin validation', () => {
  it('accepts a clean public HTTPS origin', () => {
    expect(validateDeploymentOrigin('https://www.example.org')).toBe('https://www.example.org');
  });

  it('rejects non-HTTPS, credentials and URL paths', () => {
    expect(() => validateDeploymentOrigin('http://www.example.org')).toThrow();
    expect(() => validateDeploymentOrigin('https://user:secret@example.org')).toThrow();
    expect(() => validateDeploymentOrigin('https://www.example.org/path')).toThrow();
  });
});

describe('deployed website acceptance', () => {
  it('accepts the governed preview publication contract', () => {
    expect(() =>
      assertDeploymentContract({
        mode: 'preview',
        origin: 'https://preview.example.org',
        pageHtml:
          '<link rel="canonical" href="https://preview.example.org/en/"><meta name="robots" content="noindex, nofollow">',
        pageHeaders: {},
        robotsText: 'User-agent: *\nDisallow: /\n',
        sitemapText: '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      }),
    ).not.toThrow();
  });

  it('accepts production only with indexable routes and security headers', () => {
    expect(() =>
      assertDeploymentContract({
        mode: 'production',
        origin: 'https://www.example.org',
        pageHtml: '<link rel="canonical" href="https://www.example.org/en/">',
        pageHeaders: productionHeaders,
        robotsText: 'User-agent: *\nAllow: /\nSitemap: https://www.example.org/sitemap.xml\n',
        sitemapText:
          '<url><loc>https://www.example.org/en/</loc></url><url><loc>https://www.example.org/de/</loc></url>',
      }),
    ).not.toThrow();
  });

  it('rejects production without the required edge security contract', () => {
    expect(() =>
      assertDeploymentContract({
        mode: 'production',
        origin: 'https://www.example.org',
        pageHtml: '<link rel="canonical" href="https://www.example.org/en/">',
        pageHeaders: { 'x-content-type-options': 'nosniff' },
        robotsText: 'User-agent: *\nAllow: /\nSitemap: https://www.example.org/sitemap.xml\n',
        sitemapText:
          '<url><loc>https://www.example.org/en/</loc></url><url><loc>https://www.example.org/de/</loc></url>',
      }),
    ).toThrow(/CSP/);
  });
});

describe('effective delivered security policies', () => {
  const restrictiveBase =
    "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'";

  it.each([
    "default-src 'none'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'",
    `${restrictiveBase}; style-src 'self' 'sha256-xR6Gaq7onRAa4Xi1Es8gs7LYLAxCxS17E6eWzdkqaJY='; script-src 'self' 'nonce-c3ludGhldGljLW5vbmNl'`,
    `${restrictiveBase}; form-action 'self' https://approved-form.example.invalid`,
    `${restrictiveBase}; connect-src 'self' https://api.example.invalid wss://socket.example.invalid`,
  ])('accepts restrictive effective fallbacks and explicit source policies: %s', (csp) => {
    expect(() =>
      acceptProduction({ ...productionHeaders, 'content-security-policy': csp }),
    ).not.toThrow();
  });

  it.each([
    "default-src *; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    restrictiveBase.replace("object-src 'none'", "x-object-src 'none'"),
    restrictiveBase.replace("object-src 'none'", "object-src 'self'"),
    restrictiveBase.replace("base-uri 'self'", 'base-uri *'),
    restrictiveBase.replace("base-uri 'self'", 'base-uri https://other.example.invalid'),
    restrictiveBase.replace("frame-ancestors 'none'", 'frame-ancestors *'),
    restrictiveBase.replace("frame-ancestors 'none'", "frame-ancestors 'none' 'self'"),
    `${restrictiveBase}; script-src *`,
    `${restrictiveBase}; script-src https:`,
    `${restrictiveBase}; script-src 'self' 'unsafe-inline'`,
    `${restrictiveBase}; script-src 'self' 'unsafe-eval'`,
    `${restrictiveBase}; script-src 'self' 'wasm-unsafe-eval'`,
    `${restrictiveBase}; style-src 'self' 'UNSAFE-INLINE'`,
    `${restrictiveBase}; script-src https://unapproved-script.example.invalid`,
    `${restrictiveBase}; script-src-elem *`,
    `${restrictiveBase}; script-src-attr 'unsafe-inline'`,
    `${restrictiveBase}; style-src-elem https:`,
    `${restrictiveBase}; style-src-attr 'unsafe-inline'`,
    `${restrictiveBase}; script-src`,
    `${restrictiveBase}; script-src 'none' 'self'`,
    `${restrictiveBase}; connect-src https://*.example.invalid`,
    `${restrictiveBase}; img-src http://images.example.invalid`,
    `${restrictiveBase}; script-src 'self'; SCRIPT-SRC 'none'`,
    `${restrictiveBase}, default-src 'self'`,
    restrictiveBase.replace("base-uri 'self'", "base-uri\u00a0'self'"),
  ])('rejects permissive, duplicate or misleading CSP declarations: %s', (csp) => {
    expect(() =>
      acceptProduction({ ...productionHeaders, 'content-security-policy': csp }),
    ).toThrow(/CSP/);
  });

  it.each([
    'http:',
    'https:',
    'ws:',
    'wss:',
    'WSS:',
    'data:',
    'blob:',
    'filesystem:',
    'ftp:',
    'custom-scheme:',
    'web+example.v2:',
  ])('rejects the complete CSP scheme-source class: %s', (scheme) => {
    expect(() =>
      acceptProduction({
        ...productionHeaders,
        'content-security-policy': `${restrictiveBase}; connect-src ${scheme}`,
      }),
    ).toThrow(/CSP/);
  });

  it.each([
    'max-age=1',
    'max-age="31536000"; includeSubDomains',
    '; max-age=31536000;; includeSubDomains;',
  ])(
    'requires an effective positive HSTS age without inventing a deployment duration: %s',
    (hsts) => {
      expect(() =>
        acceptProduction({ ...productionHeaders, 'strict-transport-security': hsts }),
      ).not.toThrow();
    },
  );

  it.each([
    '',
    'max-age=0',
    'max-age=-1',
    'max-age=1.5',
    'max-age=1e6',
    'max-age=invalid',
    'x-max-age=31536000',
    'max-age=31536000; MAX-AGE=0',
    'max-age=9007199254740992',
    'max-age=31536000, max-age=0',
    'max-age\u00a0=31536000',
    'max-age=31536000; includeSubDomains=true',
    'max-age=31536000; extension=(invalid)',
  ])('rejects disabled, malformed or ambiguous HSTS: %s', (hsts) =>
    expect(() =>
      acceptProduction({ ...productionHeaders, 'strict-transport-security': hsts }),
    ).toThrow(/HSTS/),
  );

  it.each(['', 'unsafe-url', 'no-referrer-when-downgrade', 'invalid'])(
    'rejects unsafe or meaningless referrer-policy presence: %s',
    (policy) =>
      expect(() => acceptProduction({ ...productionHeaders, 'referrer-policy': policy })).toThrow(
        /Referrer-Policy/,
      ),
  );

  it.each([
    '',
    'camera=(), microphone=()',
    'camera=(self), microphone=(), geolocation=()',
    'camera=(), microphone=*, geolocation=()',
    'camera=(), microphone=(), geolocation=(), CAMERA=(self)',
  ])('requires unnecessary device capabilities to be disabled: %s', (policy) => {
    expect(() => acceptProduction({ ...productionHeaders, 'permissions-policy': policy })).toThrow(
      /Permissions-Policy/,
    );
  });

  it.each([
    'geolocation=(),camera=(),microphone=()',
    ' camera=(  ) \t,\tmicrophone=(), geolocation=()\t',
    'camera=(), microphone=(), geolocation=(), payment=(self "https://pay.example.invalid"), usb=()',
    String.raw`camera=(), microphone=(), geolocation=(), example-feature=("comma,value" "escaped \"quote\" and \\ slash")`,
  ])('accepts complete structured allowlists without relaxing required denials: %s', (policy) => {
    expect(() =>
      acceptProduction({ ...productionHeaders, 'permissions-policy': policy }),
    ).not.toThrow();
  });

  it.each([
    'Camera=(), Microphone=(), Geolocation=()',
    'camera =(), microphone=(), geolocation=()',
    'camera= (), microphone=(), geolocation=()',
    'camera=(\t), microphone=(), geolocation=()',
    '\tcamera=(), microphone=(), geolocation=()',
    'camera=(), microphone=(), geolocation=(),',
    'camera=(),, microphone=(), geolocation=()',
    'camera=(), microphone=(), geolocation=(), camera=()',
    'camera=(), microphone=(), geolocation=(), Payment=()',
    'camera=(), microphone=(), geolocation=(), payment=("unterminated)',
    'camera=(), microphone=(), geolocation=(), payment=("https://example.invalid"self)',
    'camera=(), microphone=(), geolocation=(), payment=(self\t"https://example.invalid")',
    'camera=(), microphone=(), geolocation=(), payment=("bad\\escape")',
    String.raw`camera=(), microphone=(), geolocation=(), payment=("https://example.invalid\")`,
    'camera=(), microphone=(), geolocation=(), payment=("https://example.invalid"bad")',
    'camera=(), microphone=(), geolocation=(), payment=((self))',
    'camera=(), microphone=(), geolocation=(), payment=(self);report-to=endpoint',
    'camera=(), microphone=(), geolocation=(), payment=(self);broken="unterminated',
    'camera=(), microphone=(), geolocation=(), payment=?1',
    'camera=(), microphone=(), geolocation=(), payment=(self) trailing',
  ])('rejects malformed or unsupported structured permissions policies: %s', (policy) => {
    expect(() => acceptProduction({ ...productionHeaders, 'permissions-policy': policy })).toThrow(
      /Permissions-Policy/,
    );
  });

  it('does not silently choose between differently cased duplicate headers', () => {
    expect(() =>
      acceptProduction({ ...productionHeaders, 'Strict-Transport-Security': 'max-age=0' }),
    ).toThrow(/duplicate/);
  });
});
