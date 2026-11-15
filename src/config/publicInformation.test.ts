import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDemoRequestConfig } from './demoRequest';
import { getPublicInformationConfig, parsePublicInformationConfig } from './publicInformation';

const configured = {
  en: {
    legalNotice: 'https://information.example.invalid/en/legal/',
    privacy: 'https://information.example.invalid/en/privacy/',
    contact: 'https://information.example.invalid/en/contact/',
  },
  de: {
    legalNotice: 'https://information.example.invalid/de/impressum/',
    privacy: 'https://information.example.invalid/de/datenschutz/',
    contact: 'https://information.example.invalid/de/kontakt/',
  },
};

describe('localized public information configuration', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('does not invent destinations for a preview without approved URLs', () => {
    expect(parsePublicInformationConfig({ en: {}, de: {} }, false)).toEqual({ en: {}, de: {} });
  });

  it('retains each explicitly configured preview destination without inferring a translation', () => {
    expect(
      parsePublicInformationConfig({ en: {}, de: { privacy: configured.de.privacy } }, false),
    ).toEqual({ en: {}, de: { privacy: configured.de.privacy } });
  });

  it('accepts the complete explicit destination set for an indexable build', () => {
    expect(parsePublicInformationConfig(configured, true)).toEqual(configured);
  });

  it('does not activate demo processing through general legal or contact destinations', () => {
    vi.stubEnv('PUBLIC_LEGAL_NOTICE_URL_EN', configured.en.legalNotice);
    vi.stubEnv('PUBLIC_LEGAL_NOTICE_URL_DE', configured.de.legalNotice);
    vi.stubEnv('PUBLIC_PRIVACY_URL_EN', configured.en.privacy);
    vi.stubEnv('PUBLIC_PRIVACY_URL_DE', configured.de.privacy);
    vi.stubEnv('PUBLIC_CONTACT_URL_EN', configured.en.contact);
    vi.stubEnv('PUBLIC_CONTACT_URL_DE', configured.de.contact);
    vi.stubEnv('PUBLIC_DEMO_REQUEST_ENDPOINT', 'https://forms.example.invalid/submit');
    vi.stubEnv('PUBLIC_DEMO_PRIVACY_URL', '');
    expect(getPublicInformationConfig(true)).toEqual(configured);
    expect(getDemoRequestConfig()).toEqual({
      enabled: false,
    });
    vi.stubEnv('PUBLIC_DEMO_PRIVACY_URL', 'https://privacy.example.invalid/demo-request');
    expect(getDemoRequestConfig()).toEqual({
      enabled: true,
      endpoint: 'https://forms.example.invalid/submit',
      privacyUrl: 'https://privacy.example.invalid/demo-request',
    });
  });

  for (const locale of ['en', 'de'] as const) {
    for (const field of ['legalNotice', 'privacy', 'contact'] as const) {
      it(`requires ${locale} ${field} for an indexable build`, () => {
        const values = structuredClone(configured);
        values[locale][field] = '';
        expect(() => parsePublicInformationConfig(values, true)).toThrow(
          'is required for an indexable build',
        );
      });

      it.each([
        'http://information.example.invalid/legal/',
        'javascript:alert(1)',
        'mailto:unapproved@example.invalid',
        '//information.example.invalid/legal/',
        'https://user:password@information.example.invalid/legal/',
        'https://information.example.invalid/legal/?next=https://other.example.invalid/',
        'https://information.example.invalid/legal/#fragment',
      ])(`rejects unsafe ${locale} ${field} even in a preview: %s`, (value) => {
        const values = structuredClone(configured);
        values[locale][field] = value;
        expect(() => parsePublicInformationConfig(values, false)).toThrow();
      });
    }
  }
});
