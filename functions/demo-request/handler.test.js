import { describe, expect, it, vi } from 'vitest';
import { readRequiredEnv } from './config.js';
import { createHandler } from './handler.js';
import { parseFormBody, toPlainTextEmail, validateDemoRequest } from './validation.js';

const validFields = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.org',
  company: 'Analytical Engines Ltd',
  companySize: '250-999',
  message: '<script>alert(1)</script>\nPlease contact me.',
  locale: 'en',
  website: '',
  privacyAcknowledged: 'true',
};

const configuredEnv = {
  SCW_SECRET_KEY: 'test-secret-not-production',
  SCW_PROJECT_ID: '00000000-0000-0000-0000-000000000000',
  SCW_TEM_REGION: 'fr-par',
  DEMO_REQUEST_SENDER_EMAIL: 'demo-sender@example.org',
  DEMO_REQUEST_RECIPIENT_EMAIL: 'demo@example.org',
};

function event(fields = validFields, overrides = {}) {
  return {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: new URLSearchParams(fields).toString(),
    isBase64Encoded: false,
    ...overrides,
  };
}

describe('demo request validation', () => {
  it('accepts and normalizes the approved payload', () => {
    const result = validateDemoRequest(validFields);
    expect(result.ok).toBe(true);
    expect(result.value.email).toBe('ada@example.org');
  });

  it('rejects invalid email and unsupported company-size values', () => {
    expect(validateDemoRequest({ ...validFields, email: 'not-an-email' }).ok).toBe(false);
    expect(validateDemoRequest({ ...validFields, companySize: 'unbounded' }).ok).toBe(false);
  });

  it('silently rejects a populated honeypot', () => {
    expect(validateDemoRequest({ ...validFields, website: 'https://bot.example' })).toEqual({
      ok: false,
      code: 'rejected',
    });
  });

  it('rejects oversized encoded bodies', () => {
    expect(parseFormBody(`message=${'a'.repeat(13000)}`)).toBeNull();
  });

  it('keeps submitted markup as plain text rather than generating HTML', () => {
    const result = validateDemoRequest(validFields);
    expect(result.ok).toBe(true);
    const text = toPlainTextEmail(result.value);
    expect(text).toContain('<script>alert(1)</script>');
    expect(text).not.toContain('<html');
  });
});

describe('demo request server configuration', () => {
  it('defaults Transactional Email to the currently supported fr-par region', () => {
    const config = readRequiredEnv({ ...configuredEnv, SCW_TEM_REGION: undefined });
    expect(config?.region).toBe('fr-par');
  });

  it('fails closed for an unsupported Transactional Email region', () => {
    expect(readRequiredEnv({ ...configuredEnv, SCW_TEM_REGION: 'nl-ams' })).toBeNull();
  });
});

describe('Scaleway demo request handler', () => {
  it('allows only POST', async () => {
    const handler = createHandler({ env: configuredEnv, sendEmail: vi.fn() });
    const result = await handler(event(validFields, { httpMethod: 'GET' }));
    expect(result.statusCode).toBe(405);
  });

  it('allows only form-urlencoded content', async () => {
    const handler = createHandler({ env: configuredEnv, sendEmail: vi.fn() });
    const result = await handler(
      event(validFields, { headers: { 'content-type': 'application/json' } }),
    );
    expect(result.statusCode).toBe(415);
  });

  it('fails closed when server-side secrets/configuration are incomplete', async () => {
    const handler = createHandler({ env: {}, sendEmail: vi.fn() });
    const result = await handler(event());
    expect(result.statusCode).toBe(503);
    expect(result.headers['Retry-After']).toBe('60');
    expect(result.body).not.toContain('SCW_SECRET_KEY');
  });

  it('does not send mail for honeypot submissions but returns a generic accepted response', async () => {
    const sendEmail = vi.fn();
    const handler = createHandler({ env: configuredEnv, sendEmail });
    const result = await handler(event({ ...validFields, website: 'spam' }));
    expect(result.statusCode).toBe(202);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('sends only validated normalized data', async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const handler = createHandler({ env: configuredEnv, sendEmail });
    const result = await handler(event({ ...validFields, email: ' ADA@EXAMPLE.ORG ' }));
    expect(result.statusCode).toBe(202);
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail.mock.calls[0][1].email).toBe('ada@example.org');
  });

  it('returns a generic temporary error without automatically retrying provider creation', async () => {
    const sendEmail = vi.fn().mockRejectedValue(new Error('provider detail must not leak'));
    const handler = createHandler({ env: configuredEnv, sendEmail });
    const result = await handler(event());

    expect(sendEmail).toHaveBeenCalledOnce();
    expect(result.statusCode).toBe(503);
    expect(result.headers['Retry-After']).toBe('60');
    expect(result.body).toBe('{"status":"error","code":"temporarily_unavailable"}');
    expect(result.body).not.toContain('provider detail');
  });
});

describe('native browser submission results', () => {
  const browserHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  };

  for (const locale of ['en', 'de']) {
    it(`${locale} returns the same generic HTML for acceptance and a honeypot`, async () => {
      const sendEmail = vi.fn().mockResolvedValue(undefined);
      const handler = createHandler({ env: configuredEnv, sendEmail });
      const accepted = await handler(
        event({ ...validFields, locale }, { headers: browserHeaders }),
      );
      const rejected = await handler(
        event({ ...validFields, locale, website: 'spam' }, { headers: browserHeaders }),
      );

      expect(accepted.statusCode).toBe(202);
      expect(rejected).toEqual(accepted);
      expect(sendEmail).toHaveBeenCalledOnce();
      expect(accepted.headers['Content-Language']).toBe(locale);
      for (const marker of ['Ada', 'ada@example.org', 'Analytical Engines', 'alert(1)', 'spam']) {
        expect(accepted.body).not.toContain(marker);
      }
    });

    it(`${locale} gives a generic correction path without sending invalid fields`, async () => {
      const sendEmail = vi.fn();
      const handler = createHandler({ env: configuredEnv, sendEmail });
      const result = await handler(
        event(
          { ...validFields, locale, email: 'private-invalid-marker' },
          { headers: browserHeaders },
        ),
      );

      expect(result.statusCode).toBe(400);
      expect(result.headers['Content-Language']).toBe(locale);
      expect(result.body).not.toContain('private-invalid-marker');
      expect(sendEmail).not.toHaveBeenCalled();
    });

    it(`${locale} makes an ambiguous provider outcome visible without retrying or exposing details`, async () => {
      const sendEmail = vi.fn().mockRejectedValue(new Error('private-provider-detail'));
      const handler = createHandler({ env: configuredEnv, sendEmail });
      const result = await handler(event({ ...validFields, locale }, { headers: browserHeaders }));

      expect(result.statusCode).toBe(503);
      expect(result.headers['Retry-After']).toBe('60');
      expect(result.body).toContain(
        locale === 'de'
          ? 'Wir können derzeit nicht bestätigen, ob Ihre Anfrage zur Bearbeitung angenommen wurde.'
          : 'We cannot currently confirm whether your request was accepted for processing.',
      );
      expect(result.body).not.toContain('private-provider-detail');
      expect(sendEmail).toHaveBeenCalledOnce();
    });
  }

  it.each([
    [{ httpMethod: 'GET' }, 405],
    [{ headers: { ...browserHeaders, 'Content-Type': 'application/json' } }, 415],
    [{ body: `message=${'a'.repeat(13000)}` }, 400],
  ])('retains pre-send rejection for browser requests: %j', async (overrides, statusCode) => {
    const sendEmail = vi.fn();
    const handler = createHandler({ env: configuredEnv, sendEmail });
    const result = await handler(event(validFields, { headers: browserHeaders, ...overrides }));
    expect(result.statusCode).toBe(statusCode);
    expect(result.headers['Content-Type']).toBe('text/html; charset=utf-8');
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('retains the fail-closed missing-configuration outcome without sending', async () => {
    const sendEmail = vi.fn();
    const handler = createHandler({ env: {}, sendEmail });
    const result = await handler(event(validFields, { headers: browserHeaders }));
    expect(result.statusCode).toBe(503);
    expect(result.headers['Retry-After']).toBe('60');
    expect(result.headers['Content-Type']).toBe('text/html; charset=utf-8');
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
