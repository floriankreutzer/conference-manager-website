import type { Locale } from '@config/locales';

type SiteMetadataCopy = {
  socialImageAlt: string;
};

const siteMetadataCopy: Record<Locale, SiteMetadataCopy> = {
  en: {
    socialImageAlt:
      'Illustrative meeting room with burgundy chairs and a prepared conference table.',
  },
  de: {
    socialImageAlt:
      'Illustrativer Besprechungsraum mit bordeauxfarbenen Stühlen und vorbereitetem Besprechungstisch.',
  },
};

export function getSiteMetadataCopy(locale: Locale): SiteMetadataCopy {
  return siteMetadataCopy[locale];
}
