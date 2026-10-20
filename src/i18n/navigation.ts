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
  menu: string;
  primaryLabel: string;
  homeLabel: string;
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
      { label: 'How it works', href: '/en/how-it-works/' },
      { label: 'For your team', href: '/en/workplace-teams/' },
      { label: 'Integrations', href: '/en/integrations/' },
      { label: 'Setup & pilot', href: '/en/pricing/' },
    ],
    login: 'Sign in',
    menu: 'Menu',
    primaryLabel: 'Primary navigation',
    homeLabel: 'Conference Manager home',
    bookDemo: 'Book a demo',
    languageLabel: 'Language',
    skipToContent: 'Skip to content',
    footer: {
      productHeading: 'Explore Conference Manager',
      resourcesHeading: 'Evaluate',
      brandHeading: 'Conference Manager by Pavurel',
      brandBody:
        'Conference Manager by Pavurel brings meeting requests, guests, catering and equipment together for your office and conference team.',
      productLinks: [
        { label: 'Product', href: '/en/product/' },
        { label: 'How it works', href: '/en/how-it-works/' },
        { label: 'For your team', href: '/en/workplace-teams/' },
        { label: 'About Conference Manager', href: '/en/company/' },
      ],
      resourceLinks: [
        { label: 'Integrations', href: '/en/integrations/' },
        { label: 'Security & trust', href: '/en/security-trust/' },
        { label: 'Setup & pilot', href: '/en/pricing/' },
        { label: 'Insights', href: '/en/insights/' },
      ],
      demoLabel: 'Book a demo',
      loginLabel: 'Customer login',
    },
  },
  de: {
    items: [
      { label: 'So funktioniert es', href: '/de/how-it-works/' },
      { label: 'Für Ihr Team', href: '/de/workplace-teams/' },
      { label: 'Integrationen', href: '/de/integrations/' },
      { label: 'Einführung & Pilot', href: '/de/pricing/' },
    ],
    login: 'Anmelden',
    menu: 'Menü',
    primaryLabel: 'Hauptnavigation',
    homeLabel: 'Conference Manager Startseite',
    bookDemo: 'Demo anfragen',
    languageLabel: 'Sprache',
    skipToContent: 'Zum Inhalt springen',
    footer: {
      productHeading: 'Conference Manager kennenlernen',
      resourcesHeading: 'Evaluieren',
      brandHeading: 'Conference Manager by Pavurel',
      brandBody:
        'Conference Manager by Pavurel führt Besprechungsanfragen, Gäste, Catering und Technik für Ihr Office- und Konferenzteam zusammen.',
      productLinks: [
        { label: 'Produkt', href: '/de/product/' },
        { label: 'So funktioniert es', href: '/de/how-it-works/' },
        { label: 'Für Ihr Team', href: '/de/workplace-teams/' },
        { label: 'Über Conference Manager', href: '/de/company/' },
      ],
      resourceLinks: [
        { label: 'Integrationen', href: '/de/integrations/' },
        { label: 'Sicherheit & Vertrauen', href: '/de/security-trust/' },
        { label: 'Einführung & Pilot', href: '/de/pricing/' },
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
