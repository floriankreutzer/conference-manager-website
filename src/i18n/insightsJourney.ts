import type { Locale } from '@config/locales';

type InsightsJourneyCopy = {
  emptyText: string;
  featuredLabel: string;
  readArticle: string;
  backLabel: string;
  articleEyebrow: string;
  publishedLabel: string;
  updatedLabel: string;
  contentsLabel: string;
  articleSummaries: Partial<Record<string, { title: string; items: readonly string[] }>>;
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
    emptyText: 'Our first articles on organising meetings will appear here soon.',
    featuredLabel: 'Meeting organisation',
    readArticle: 'Read the article',
    backLabel: 'Back to Insights',
    articleEyebrow: 'Insights',
    publishedLabel: 'Published',
    updatedLabel: 'Updated',
    contentsLabel: 'In this article',
    articleSummaries: {
      'room-booking-and-conference-management': {
        title: 'At a glance',
        items: [
          'Your room-booking system stays responsible for reservations.',
          'Participants, catering and equipment belong in one meeting request.',
          'Teams need clear responsibilities and a shared view of changes.',
        ],
      },
    },
    indexClosing: {
      eyebrow: 'Your next meeting',
      title: 'Bring your everyday process to the demo.',
      body: 'Show us how your office or conference team organises a meeting today. We discuss missing information, handovers and the systems you already use.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore setup & pilot',
    },
    articleClosing: {
      eyebrow: 'From reading to trying',
      title: 'How would this work for your team?',
      body: 'In a personal demo, we look at one of your typical meetings and discuss which supported connections and setup would fit your organisation.',
      primaryCta: 'Book a demo',
      secondaryCta: 'Explore integrations',
    },
  },
  de: {
    emptyText: 'Hier erscheinen in Kürze unsere ersten Beiträge zur Besprechungsorganisation.',
    featuredLabel: 'Besprechungen organisieren',
    readArticle: 'Artikel lesen',
    backLabel: 'Zurück zu Insights',
    articleEyebrow: 'Insights',
    publishedLabel: 'Veröffentlicht',
    updatedLabel: 'Aktualisiert',
    contentsLabel: 'In diesem Artikel',
    articleSummaries: {
      'room-booking-and-conference-management': {
        title: 'Auf einen Blick',
        items: [
          'Ihr Raumbuchungssystem bleibt für Reservierungen zuständig.',
          'Teilnehmer, Catering und Technik gehören in eine Besprechungsanfrage.',
          'Teams brauchen klare Zuständigkeiten und einen gemeinsamen Stand bei Änderungen.',
        ],
      },
    },
    indexClosing: {
      eyebrow: 'Ihre nächste Besprechung',
      title: 'Bringen Sie Ihren Alltag mit in die Demo.',
      body: 'Zeigen Sie uns, wie Ihr Office- oder Konferenzteam heute eine Besprechung organisiert. Wir besprechen fehlende Angaben, Übergaben und Ihre vorhandenen Systeme.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Einführung & Pilot ansehen',
    },
    articleClosing: {
      eyebrow: 'Vom Lesen zum Ausprobieren',
      title: 'Wie würde das für Ihr Team aussehen?',
      body: 'In einer persönlichen Demo betrachten wir eine Ihrer typischen Besprechungen und klären, welche unterstützten Anbindungen und welche Einrichtung zu Ihrem Unternehmen passen.',
      primaryCta: 'Demo anfragen',
      secondaryCta: 'Integrationen ansehen',
    },
  },
};

export function getInsightsJourneyCopy(locale: Locale): InsightsJourneyCopy {
  return copy[locale];
}
