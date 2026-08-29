import { describe, expect, it } from 'vitest';
import { assertDeploymentContract, validateDeploymentOrigin } from './deployment-contract.mjs';

const productionHeaders = {
  'content-security-policy': "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'x-content-type-options': 'nosniff',
};

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
        pageHtml: '<link rel="canonical" href="https://preview.example.org/en/"><meta name="robots" content="noindex, nofollow">',
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
        sitemapText: '<url><loc>https://www.example.org/en/</loc></url><url><loc>https://www.example.org/de/</loc></url>',
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
        sitemapText: '<url><loc>https://www.example.org/en/</loc></url><url><loc>https://www.example.org/de/</loc></url>',
      }),
    ).toThrow(/CSP/);
  });
});
