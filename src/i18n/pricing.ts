import type { Locale } from '@config/locales';

type PricingSection = {
  eyebrow: string;
  title: string;
  body: string;
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
      body: 'Use these steps to prepare the introduction with your team.',
    },
    sections: [
      {
        eyebrow: 'Demo',
        title: 'Explore your meeting process.',
        body: 'Bring a typical request and the questions your office or conference team handles today. We look at the existing room-booking system and the services you need.',
      },
      {
        eyebrow: 'Setup',
        title: 'Prepare your customer environment.',
        body: 'Agree the teams involved, supported connections, approval steps and deadlines. Pavurel prepares the customer environment for this scope.',
      },
      {
        eyebrow: 'Pilot',
        title: 'Work with your own meetings.',
        body: 'Your team uses real meetings to assess whether the agreed preparation, coordination and handling of changes fit its working day.',
      },
    ],
    closing: {
      eyebrow: 'Start the conversation',
      title: 'Your questions about getting started.',
      body: 'Discuss what your team needs for a suitable introduction.',
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
      body: 'So bereiten Sie den Einstieg mit Ihrem Team vor.',
    },
    sections: [
      {
        eyebrow: 'Demo',
        title: 'Ihren Besprechungsablauf kennenlernen.',
        body: 'Bringen Sie eine typische Anfrage und die Fragen Ihres Office- oder Konferenzteams mit. Gemeinsam betrachten wir die vorhandene Raumbuchung und die benötigten Leistungen.',
      },
      {
        eyebrow: 'Einrichtung',
        title: 'Ihre Kundenumgebung vorbereiten.',
        body: 'Stimmen Sie die beteiligten Teams, unterstützten Anbindungen, Freigabeschritte und Fristen ab. Pavurel bereitet die Kundenumgebung für diesen Umfang vor.',
      },
      {
        eyebrow: 'Pilot',
        title: 'Mit Ihren eigenen Besprechungen arbeiten.',
        body: 'Ihr Team prüft anhand realer Besprechungen, ob die vereinbarte Vorbereitung, Abstimmung und Bearbeitung von Änderungen zu seinem Alltag passt.',
      },
    ],
    closing: {
      eyebrow: 'Gemeinsam starten',
      title: 'Ihre Fragen zur Einführung.',
      body: 'Besprechen Sie mit uns, was Ihr Team für einen passenden Einstieg benötigt.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getPricingCopy(locale: Locale): PricingCopy {
  return pricingCopy[locale];
}
