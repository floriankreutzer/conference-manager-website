import type { Locale } from '@config/locales';

type PricingSection = {
  eyebrow: string;
  title: string;
  body: string;
  statement?: string;
};
type PricingCopy = {
  offer: {
    eyebrow: string;
    title: string;
    body: string;
    start: string;
    setupFee: string;
    pricingStatus: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    body: string;
  };
  sections: readonly PricingSection[];
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const pricingCopy: Record<Locale, PricingCopy> = {
  en: {
    offer: {
      eyebrow: 'Setup & pilot',
      title: '30 days of free software use.',
      body: 'Try Conference Manager with your own real meetings in your configured customer environment.',
      start: 'The 30 days start after setup is complete.',
      setupFee: 'A one-time setup fee applies.',
      pricingStatus:
        'The amounts for setup and ongoing use, and the ongoing pricing model, are still to be agreed.',
    },
    journey: {
      eyebrow: 'Getting started',
      title: 'From a shared demo to your own meetings.',
      body: 'First, we discuss your current process. Then we agree the setup scope and prepare your customer environment before the 30 days begin.',
    },
    sections: [
      {
        eyebrow: 'Demo',
        title: 'Explore your meeting process.',
        body: 'Show us how your office or conference team works today. Together, we look at your requests, existing room-booking system and services, and discuss which setup and supported connections fit your needs.',
      },
      {
        eyebrow: 'Setup',
        title: 'Prepare your customer environment.',
        body: 'After the demo, we agree the scope and prerequisites with you. We then set up your customer environment for the agreed process.',
        statement: 'A one-time setup fee applies.',
      },
      {
        eyebrow: '30 days of software use',
        title: 'Work with your own meetings.',
        body: 'Use Conference Manager free for 30 days with your own real meetings in the configured customer environment. This gives your team an opportunity to experience the agreed process in everyday use.',
        statement: 'The 30 days start after setup is complete.',
      },
    ],
    closing: {
      eyebrow: 'Start the conversation',
      title: 'Bring your meeting process to the demo.',
      body: 'Let us look at your current workflow and the scope of a suitable setup together. The demo is the first step towards trying Conference Manager with your team.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    offer: {
      eyebrow: 'Einrichtung & Pilot',
      title: '30 Tage kostenlose Softwarenutzung.',
      body: 'Erproben Sie Conference Manager mit Ihren eigenen realen Besprechungen in Ihrer eingerichteten Kundenumgebung.',
      start: 'Die 30 Tage beginnen nach abgeschlossener Einrichtung.',
      setupFee: 'Die Einrichtung ist einmalig kostenpflichtig.',
      pricingStatus:
        'Die Beträge für Einrichtung und anschließende Nutzung sowie das laufende Preismodell sind noch offen.',
    },
    journey: {
      eyebrow: 'Ihr Einstieg',
      title: 'Von der gemeinsamen Demo zu Ihren eigenen Besprechungen.',
      body: 'Zuerst besprechen wir Ihren heutigen Ablauf. Anschließend stimmen wir den Einrichtungsumfang ab und bereiten Ihre Kundenumgebung vor, bevor die 30 Tage beginnen.',
    },
    sections: [
      {
        eyebrow: 'Demo',
        title: 'Ihren Besprechungsablauf kennenlernen.',
        body: 'Zeigen Sie uns, wie Ihr Office- oder Konferenzteam heute arbeitet. Gemeinsam betrachten wir Ihre Anfragen, die vorhandene Raumbuchung und die benötigten Services. Wir besprechen, welche Einrichtung und unterstützten Anbindungen zu Ihrem Bedarf passen.',
      },
      {
        eyebrow: 'Einrichtung',
        title: 'Ihre Kundenumgebung vorbereiten.',
        body: 'Nach der Demo stimmen wir den Umfang und die Voraussetzungen mit Ihnen ab. Anschließend richten wir Ihre Kundenumgebung für den vereinbarten Ablauf ein.',
        statement: 'Die Einrichtung ist einmalig kostenpflichtig.',
      },
      {
        eyebrow: '30 Tage Softwarenutzung',
        title: 'Mit Ihren eigenen Besprechungen arbeiten.',
        body: 'Nutzen Sie Conference Manager 30 Tage kostenlos mit Ihren eigenen realen Besprechungen in der eingerichteten Kundenumgebung. So kann Ihr Team den vereinbarten Ablauf im Arbeitsalltag erproben.',
        statement: 'Die 30 Tage beginnen nach abgeschlossener Einrichtung.',
      },
    ],
    closing: {
      eyebrow: 'Gemeinsam starten',
      title: 'Bringen Sie Ihren Ablauf mit in die Demo.',
      body: 'Besprechen wir Ihre heutigen Abläufe und den Umfang einer passenden Einrichtung. Die Demo ist der erste Schritt, um Conference Manager mit Ihrem Team zu erproben.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getPricingCopy(locale: Locale): PricingCopy {
  return pricingCopy[locale];
}
