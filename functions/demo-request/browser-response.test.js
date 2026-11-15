import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createDemoResponse, prefersBrowserHtml } from './browser-response.js';
import { demoResponseCopy, demoValidationCopy } from './response-copy.js';

const nativeAccept = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';

describe('native form response negotiation', () => {
  it.each([
    nativeAccept,
    'text/html',
    'TEXT/HTML;Q=0.9,application/json;q=0.8',
    'text/html; charset="utf-8",application/json;q=0.5',
    'application/json;q=0.7,text/html;q=0.8,*/*;q=1',
    'text/html;q=0.8,application/*;q=0.7,*/*;q=1',
    'text/html;q=0.1,application/json;q=0,*/*;q=1',
  ])('offers HTML for an explicit stronger preference: %s', (accept) => {
    expect(prefersBrowserHtml(accept)).toBe(true);
  });

  it.each([
    undefined,
    '',
    '*/*',
    'text/*',
    'application/json',
    'text/html,application/json',
    'text/html,*/*',
    'text/html;q=0.8,application/json;q=0.9',
    'text/html;q=0,text/*;q=1,*/*;q=0',
    'application/xhtml+xml',
    'text/html;q=0.8,application/*;q=0.9,*/*;q=0',
    'text/html;q=1.1',
    'text/html;q=-1',
    'text/html;q=.9',
    'text/html;q=0.1234',
    'text/html;q=1;q=0',
    'text/html;q=1,text/html;q=0',
    'text/html;q=1,application/json;q=invalid',
    'text/html; charset=iso-8859-1',
    'text/html; unexpected=parameter',
    `text/html,${'x'.repeat(4096)}`,
  ])('retains JSON for default, tied or ambiguous preferences: %s', (accept) => {
    expect(prefersBrowserHtml(accept)).toBe(false);
  });
});

describe('public result representations', () => {
  const outcomes = [
    [202, { status: 'accepted' }, '{"status":"accepted"}'],
    [
      400,
      { status: 'error', code: 'invalid_request' },
      '{"status":"error","code":"invalid_request"}',
    ],
    [
      405,
      { status: 'error', code: 'method_not_allowed' },
      '{"status":"error","code":"method_not_allowed"}',
    ],
    [
      415,
      { status: 'error', code: 'unsupported_media_type' },
      '{"status":"error","code":"unsupported_media_type"}',
    ],
    [
      503,
      { status: 'error', code: 'temporarily_unavailable' },
      '{"status":"error","code":"temporarily_unavailable"}',
    ],
  ];

  it.each(outcomes)(
    'preserves the JSON bytes and HTTP status for %s',
    (statusCode, payload, body) => {
      const result = createDemoResponse(statusCode, payload);
      expect(result.statusCode).toBe(statusCode);
      expect(result.body).toBe(body);
      expect(result.headers).toMatchObject({
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        Vary: 'Accept',
      });
    },
  );

  for (const locale of ['en', 'de']) {
    it.each(outcomes)(
      `${locale} renders a static protected document for %s`,
      (statusCode, payload) => {
        const result = createDemoResponse(statusCode, payload, { accept: nativeAccept, locale });
        expect(result.statusCode).toBe(statusCode);
        expect(result.headers).toMatchObject({
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Language': locale,
          'Cache-Control': 'no-store',
          Vary: 'Accept, Accept-Language',
          'X-Robots-Tag': 'noindex, nofollow',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'no-referrer',
        });
        expect(result.body).toContain(`<html lang="${locale}">`);
        expect(result.body).toContain('<main aria-labelledby="request-result-title">');
        expect(result.body).toContain('<h1 id="request-result-title">');
        expect(result.body).not.toMatch(/<(?:script|iframe|img|form|input|button|a|link)\b/iu);
        expect(result.body).not.toMatch(/http-equiv|https?:\/\//iu);
        const style = /<style>([\s\S]+)<\/style>/u.exec(result.body)?.[1];
        expect(style).toBeTruthy();
        const hash = createHash('sha256').update(style).digest('base64');
        expect(result.headers['Content-Security-Policy']).toBe(
          `default-src 'none'; style-src 'sha256-${hash}'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`,
        );
      },
    );
  }

  it('retains Retry-After for both representations without an automatic refresh', () => {
    for (const accept of [undefined, nativeAccept]) {
      const result = createDemoResponse(
        503,
        { status: 'error', code: 'temporarily_unavailable' },
        {
          accept,
          headers: { 'Retry-After': '60' },
        },
      );
      expect(result.headers['Retry-After']).toBe('60');
      expect(result.body).not.toMatch(/http-equiv|location\.|setTimeout|<script/iu);
    }
  });

  it.each(['fr', 'de"><script>alert(1)</script>', 'https://untrusted.example.invalid', null])(
    'allows only a fixed locale and never reflects %s',
    (locale) => {
      const result = createDemoResponse(
        400,
        { status: 'error', code: 'invalid_request' },
        {
          accept: nativeAccept,
          locale,
        },
      );
      expect(result.headers['Content-Language']).toBe('en');
      expect(result.body).toContain('<html lang="en">');
      if (typeof locale === 'string') expect(result.body).not.toContain(locale);
    },
  );

  it('keeps the same outcome and copy fields available in both languages', () => {
    expect(Object.keys(demoResponseCopy.de)).toEqual(Object.keys(demoResponseCopy.en));
    for (const catalogue of Object.values(demoResponseCopy)) {
      for (const copy of Object.values(catalogue)) {
        expect(Object.keys(copy)).toEqual(['title', 'message', 'next']);
        for (const text of Object.values(copy)) expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it.each([
    ['de-DE,de;q=0.9,en;q=0.8', 'de'],
    ['en;q=0.4,de;q=0.9', 'de'],
    ['de;q=0,en;q=0.7', 'en'],
    ['de;q=invalid,en;q=1', 'en'],
    ['fr, de;q=0.5', 'de'],
    ['de"><script>alert(1)</script>', 'en'],
    [`de,${'x'.repeat(512)}`, 'en'],
  ])(
    'uses only supported browser-language preferences as a bounded fallback: %s',
    (acceptLanguage, locale) => {
      const result = createDemoResponse(
        400,
        { status: 'error', code: 'invalid_request' },
        { accept: nativeAccept, acceptLanguage },
      );
      expect(result.headers['Content-Language']).toBe(locale);
    },
  );

  it('keeps the form language ahead of a different browser-language preference', () => {
    const result = createDemoResponse(
      400,
      { status: 'error', code: 'invalid_request' },
      { accept: nativeAccept, locale: 'en', acceptLanguage: 'de' },
    );
    expect(result.headers['Content-Language']).toBe('en');
  });

  it.each(['en', 'de'])(
    '%s renders only constant, deduplicated correction text from the allowlist',
    (locale) => {
      const result = createDemoResponse(
        400,
        { status: 'error', code: 'invalid_request' },
        {
          accept: nativeAccept,
          locale,
          invalidFields: [
            'email',
            'email',
            '<private-marker>',
            '__proto__',
            { company: 'private-value' },
          ],
        },
      );
      expect(result.body).toContain(
        `<h2 id="correction-title">${demoValidationCopy[locale].title}</h2>`,
      );
      expect(result.body).toContain(demoValidationCopy[locale].fields.email);
      expect(result.body.match(/<li>/gu)).toHaveLength(1);
      expect(result.body).not.toContain('private-marker');
      expect(result.body).not.toContain('private-value');
      expect(result.body).not.toContain('__proto__');
      expect(result.body).not.toContain(demoValidationCopy[locale].fields.company);
    },
  );

  it('never adds correction details to success or the existing JSON error bytes', () => {
    const options = { invalidFields: ['email'] };
    expect(
      createDemoResponse(400, { status: 'error', code: 'invalid_request' }, options).body,
    ).toBe('{"status":"error","code":"invalid_request"}');
    expect(
      createDemoResponse(202, { status: 'accepted' }, { ...options, accept: nativeAccept }).body,
    ).not.toContain('correction-title');
  });

  it('keeps correction fields complete and equivalent in both locales', () => {
    expect(Object.keys(demoValidationCopy.en.fields)).toEqual(
      Object.keys(demoValidationCopy.de.fields),
    );
    for (const catalogue of Object.values(demoValidationCopy)) {
      expect(catalogue.title.trim()).not.toBe('');
      for (const hint of Object.values(catalogue.fields)) expect(hint.trim()).not.toBe('');
    }
  });
});
