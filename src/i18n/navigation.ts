import type { Locale } from '@config/locales';

export type NavigationItem = {
  label: string;
  href: string;
};

type NavigationCopy = {
  items: NavigationItem[];
  login: string;
  bookDemo: string;
  languageLabel: string;
  skipToContent: string;
  footer: {
    productHeading: string;
    resourcesHeading: string;
    brandHeading: string;
    brandBody: string;
    productLinks: NavigationItem[];
    resourceLinks: NavigationItem[];
    demoLabel: string;
    loginLabel: string;
  };
};

const copy: Record<Locale, NavigationCopy> = {
  en: {
    items: [
      { label: 'Product', href: '/en/product/' },
      { label: 'How it works', href: '/en/how-it-works/' },
      { label: 'For Workplace Teams', href: '/en/workplace-teams/' },
      { label: 'Integrations', href: '/en/integrations/' },
      { label: 'Security & Trust', href: '/en/security-trust/' },
      { label: 'Company', href: '/en/company/' },
    ],
    login: 'Login',
    bookDemo: 'Book a demo',
    languageLabel: 'Language',
    skipToContent: 'Skip to content',
    footer: {
      productHeading: 'Explore Conference Manager',
      resourcesHeading: 'Evaluate',
      brandHeading: 'Conference Manager by Pavurel',
      brandBody:
        'Pavurel brings a consistent corporate frame to Conference Manager: operational precision with warm workplace hospitality. Conference Manager remains the product; by Pavurel is the corporate endorsement.',
      productLinks: [
        { label: 'Product', href: '/en/product/' },
        { label: 'How it works', href: '/en/how-it-works/' },
        { label: 'For Workplace Teams', href: '/en/workplace-teams/' },
        { label: 'Company / Pavurel', href: '/en/company/' },
      ],
      resourceLinks: [
        { label: 'Integrations', href: '/en/integrations/' },
        { label: 'Security & Trust', href: '/en/security-trust/' },
        { label: 'Pricing approach', href: '/en/pricing/' },
        { label: 'Insights', href: '/en/insights/' },
      ],
      demoLabel: 'Book a demo',
      loginLabel: 'Customer login',
    },
  },
  de: {
    items: [
      { label: 'Produkt', href: '/de/product/' },
      { label: 'So funktioniert es', href: '/de/how-it-works/' },
      { label: 'Für Workplace Teams', href: '/de/workplace-teams/' },
      { label: 'Integrationen', href: '/de/integrations/' },
      { label: 'Security & Trust', href: '/de/security-trust/' },
      { label: 'Unternehmen', href: '/de/company/' },
    ],
    login: 'Login',
    bookDemo: 'Demo anfragen',
    languageLabel: 'Sprache',
    skipToContent: 'Zum Inhalt springen',
    footer: {
      productHeading: 'Conference Manager kennenlernen',
      resourcesHeading: 'Evaluieren',
      brandHeading: 'Conference Manager by Pavurel',
      brandBody:
        'Pavurel gibt Conference Manager einen konsistenten Corporate-Rahmen: operative Präzision mit warmer Workplace Hospitality. Conference Manager bleibt das Produkt; by Pavurel ist das Corporate Endorsement.',
      productLinks: [
        { label: 'Produkt', href: '/de/product/' },
        { label: 'So funktioniert es', href: '/de/how-it-works/' },
        { label: 'Für Workplace Teams', href: '/de/workplace-teams/' },
        { label: 'Unternehmen / Pavurel', href: '/de/company/' },
      ],
      resourceLinks: [
        { label: 'Integrationen', href: '/de/integrations/' },
        { label: 'Security & Trust', href: '/de/security-trust/' },
        { label: 'Preismodell', href: '/de/pricing/' },
        { label: 'Insights', href: '/de/insights/' },
      ],
      demoLabel: 'Demo anfragen',
      loginLabel: 'Kunden-Login',
    },
  },
};

export function getNavigationCopy(locale: Locale): NavigationCopy {
  return copy[locale];
}
