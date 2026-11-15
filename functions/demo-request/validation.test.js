import { describe, expect, it } from 'vitest';
import { demoRequestServerLimits, parseFormBody, validateDemoRequest } from './validation.js';

const validFields = {
  locale: 'de',
  firstName: 'Zoë',
  lastName: 'Müller',
  email: 'form-contract@example.invalid',
  company: 'Synthetic Unicode Contract',
  companySize: '250-999',
  message: '',
  website: '',
  privacyAcknowledged: 'true',
};

describe('bounded native form decoding', () => {
  it.each([
    ['ASCII', 'a'.repeat(2000)],
    ['umlauts', 'ä'.repeat(2000)],
    ['three-byte characters', '界'.repeat(2000)],
    ['surrogate pairs', '😀'.repeat(1000)],
  ])('accepts the actual 2,000-code-unit message boundary for %s', (_, message) => {
    const body = new URLSearchParams({ ...validFields, message }).toString();
    for (const base64 of [false, true]) {
      const parsed = parseFormBody(base64 ? Buffer.from(body).toString('base64') : body, base64);
      expect(parsed.locale).toBe('de');
      expect(parsed.issue).toBeNull();
      expect(parsed.fields.message).toBe(message);
      expect(validateDemoRequest(parsed.fields).ok).toBe(true);
    }
  });

  it('accepts all text fields at their declared limits without increasing those limits', () => {
    const fields = {
      ...validFields,
      firstName: '界'.repeat(demoRequestServerLimits.firstName),
      lastName: '界'.repeat(demoRequestServerLimits.lastName),
      company: '界'.repeat(demoRequestServerLimits.company),
      message: '界'.repeat(demoRequestServerLimits.message),
    };
    const parsed = parseFormBody(new URLSearchParams(fields).toString());
    expect(validateDemoRequest(parsed.fields).ok).toBe(true);
    for (const field of ['firstName', 'lastName', 'company', 'message']) {
      expect(validateDemoRequest({ ...fields, [field]: `${fields[field]}a` })).toMatchObject({
        ok: false,
        code: 'invalid_request',
        fields: [field],
      });
    }
  });

  it('preserves the 12,000-byte decoded-data boundary and the locale on rejection', () => {
    const overhead = 'locale=de&message='.length;
    const atLimit = `locale=de&message=${'a'.repeat(demoRequestServerLimits.bodyBytes - overhead)}`;
    expect(parseFormBody(atLimit).fields).not.toBeNull();
    expect(parseFormBody(`${atLimit}a`)).toEqual({ fields: null, locale: 'de', issue: 'body' });
    expect(parseFormBody(`message=${'a'.repeat(13000)}`).fields).toBeNull();
  });

  it('bounds percent-encoded and base64 transport before allocating decoded bodies', () => {
    const body = '%61'.repeat(demoRequestServerLimits.bodyBytes + 1);
    expect(body.length).toBeGreaterThan(demoRequestServerLimits.encodedBodyBytes);
    expect(parseFormBody(body).fields).toBeNull();
    const base64 = Buffer.from('a'.repeat(demoRequestServerLimits.encodedBodyBytes + 1)).toString(
      'base64',
    );
    expect(parseFormBody(base64, true).fields).toBeNull();
  });

  it.each(['%', '%GG', '%C3%28', '%ED%A0%80', '\ud800'])(
    'rejects malformed percent encoding or Unicode: %s',
    (message) => {
      const parsed = parseFormBody(`locale=de&message=${message}`);
      expect(parsed.fields).toBeNull();
      expect(parsed.issue).toBe('form');
    },
  );

  it.each(['not base64', 'YQ', 'YR==', '////', 'YQ==='])(
    'rejects malformed, noncanonical or non-UTF-8 base64: %s',
    (body) => expect(parseFormBody(body, true).fields).toBeNull(),
  );

  it.each(['&email=second@example.invalid', '&locale=en', '&unexpected=value', '&__proto__=value'])(
    'rejects duplicate and unknown field names: %s',
    (suffix) => {
      const parsed = parseFormBody(`${new URLSearchParams(validFields)}${suffix}`);
      expect(parsed.fields).toBeNull();
      expect(parsed.issue).toBe('form');
    },
  );

  it('does not reinterpret escaped separators as additional fields', () => {
    const message = 'Discuss A&B, a=b and a literal % sign.\nSecond line.\tNotes.';
    const parsed = parseFormBody(new URLSearchParams({ ...validFields, message }).toString());
    expect(parsed.fields.message).toBe(message);
    expect(validateDemoRequest(parsed.fields).ok).toBe(true);
  });
});

describe('safe field validation hints', () => {
  it('returns only fixed field identifiers for multiple invalid values', () => {
    const result = validateDemoRequest({
      ...validFields,
      firstName: ' ',
      email: '<private-marker>',
      companySize: 'other',
      privacyAcknowledged: '',
    });
    expect(result).toEqual({
      ok: false,
      code: 'invalid_request',
      fields: ['firstName', 'privacyAcknowledged', 'email', 'companySize'],
    });
    expect(JSON.stringify(result)).not.toContain('private-marker');
  });

  it('rejects control characters in single-line fields and preserves message line breaks', () => {
    expect(validateDemoRequest({ ...validFields, company: 'Name\nOther' })).toMatchObject({
      ok: false,
      fields: ['company'],
    });
    expect(validateDemoRequest({ ...validFields, message: 'Line\nNext\tColumn' }).ok).toBe(true);
    expect(validateDemoRequest({ ...validFields, message: 'Text\u0000hidden' })).toMatchObject({
      ok: false,
      fields: ['message'],
    });
  });

  it.each([null, [], { ...validFields, company: {} }, { ...validFields, unexpected: 'value' }])(
    'rejects non-form values at the validation boundary',
    (fields) =>
      expect(validateDemoRequest(fields)).toEqual({
        ok: false,
        code: 'invalid_request',
        fields: ['form'],
      }),
  );
});
