import { locales, type Locale } from './locales';
import { parsePublicHttpsUrl } from './publicUrl';

const fields = ['legalNotice', 'privacy', 'contact'] as const;
const environmentNames = {
  legalNotice: 'LEGAL_NOTICE',
  privacy: 'PRIVACY',
  contact: 'CONTACT',
} as const;

export type PublicInformationLinks = Partial<Record<(typeof fields)[number], string>>;
type PublicInformationConfig = Record<Locale, PublicInformationLinks>;

export function parsePublicInformationConfig(
  values: PublicInformationConfig,
  required: boolean,
): PublicInformationConfig {
  const config: PublicInformationConfig = { en: {}, de: {} };

  for (const locale of locales) {
    for (const field of fields) {
      const value = values[locale][field];
      const label = `PUBLIC_${environmentNames[field]}_URL_${locale.toUpperCase()}`;
      if (!value) {
        if (required) {
          throw new Error(`${label} is required for an indexable build.`);
        }
        continue;
      }
      config[locale][field] = parsePublicHttpsUrl(value, label).toString();
    }
  }

  return config;
}

export function getPublicInformationConfig(required: boolean): PublicInformationConfig {
  return parsePublicInformationConfig(
    {
      en: {
        legalNotice: import.meta.env.PUBLIC_LEGAL_NOTICE_URL_EN,
        privacy: import.meta.env.PUBLIC_PRIVACY_URL_EN,
        contact: import.meta.env.PUBLIC_CONTACT_URL_EN,
      },
      de: {
        legalNotice: import.meta.env.PUBLIC_LEGAL_NOTICE_URL_DE,
        privacy: import.meta.env.PUBLIC_PRIVACY_URL_DE,
        contact: import.meta.env.PUBLIC_CONTACT_URL_DE,
      },
    },
    required,
  );
}
