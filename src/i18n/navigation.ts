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
};

const copy: Record<Locale, NavigationCopy> = {
  en: {
    items: [
      { label: 'Product', href: '/en/product/' },
      { label: 'How it works', href: '/en/how-it-works/' },
      { label: 'Integrations', href: '/en/integrations/' },
      { label: 'For Workplace Teams', href: '/en/workplace-teams/' },
      { label: 'Security & Trust', href: '/en/security-trust/' },
      { label: 'Pricing', href: '/en/pricing/' },
      { label: 'Insights', href: '/en/insights/' },
    ],
    login: 'Login',
    bookDemo: 'Book a demo',
    languageLabel: 'Language',
  },
  de: {
    items: [
      { label: 'Produkt', href: '/de/product/' },
      { label: 'So funktioniert es', href: '/de/how-it-works/' },
      { label: 'Integrationen', href: '/de/integrations/' },
      { label: 'Für Workplace Teams', href: '/de/workplace-teams/' },
      { label: 'Security & Trust', href: '/de/security-trust/' },
      { label: 'Preise', href: '/de/pricing/' },
      { label: 'Insights', href: '/de/insights/' },
    ],
    login: 'Login',
    bookDemo: 'Demo buchen',
    languageLabel: 'Sprache',
  },
};

export function getNavigationCopy(locale: Locale): NavigationCopy {
  return copy[locale];
}
