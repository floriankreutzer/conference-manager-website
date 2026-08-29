import type { Locale } from '@config/locales';

type InsightsJourneyCopy = {
  indexClosing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  articleClosing: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

const copy: Record<Locale, InsightsJourneyCopy> = {
  en: {
    indexClosing: {
      eyebrow: 'From insight to your workplace',
      title: 'Apply the thinking to a real conference journey.',
      body: 'If the coordination problem feels familiar, a demo can map the steps your employees and Workplace Team handle today and show where Conference Manager could fit.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
    articleClosing: {
      eyebrow: 'Continue the conversation',
      title: 'See what this could mean for your Workplace Team.',
      body: 'Bring one real conference journey and compare the room-booking step with the coordination that follows. Conference Manager is designed for that wider operational context.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore the product',
    },
  },
  de: {
    indexClosing: {
      eyebrow: 'Vom Insight zu Ihrer Arbeitswelt',
      title: 'Übertragen Sie die Perspektive auf einen realen Konferenzablauf.',
      body: 'Wenn Ihnen das Koordinationsproblem bekannt vorkommt, kann eine Demo die heutigen Schritte von Mitarbeitenden und Workplace Team sichtbar machen und zeigen, wo Conference Manager sinnvoll ansetzen kann.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
    articleClosing: {
      eyebrow: 'Gespräch fortsetzen',
      title: 'Sehen Sie, was das für Ihr Workplace Team bedeuten könnte.',
      body: 'Bringen Sie einen realen Konferenzablauf mit und vergleichen Sie den Raumbuchungsschritt mit der Koordination, die danach folgt. Conference Manager ist für diesen weitergehenden operativen Kontext ausgelegt.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Produkt ansehen',
    },
  },
};

export function getInsightsJourneyCopy(locale: Locale): InsightsJourneyCopy {
  return copy[locale];
}
