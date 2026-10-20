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
    articleClosing: {
      eyebrow: 'Explore the workflow',
      title: 'See how preparation works in Conference Manager.',
      body: 'Follow the request through preparation and review how your existing systems can fit into the process.',
      primaryCta: 'See how it works',
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
    articleClosing: {
      eyebrow: 'Den Ablauf kennenlernen',
      title: 'Besprechungen mit Conference Manager vorbereiten.',
      body: 'Verfolgen Sie die Anfrage bis zur Vorbereitung und prüfen Sie, wie Ihre vorhandenen Systeme in den Ablauf passen.',
      primaryCta: 'So funktioniert es',
      secondaryCta: 'Integrationen ansehen',
    },
  },
};

export function getInsightsJourneyCopy(locale: Locale): InsightsJourneyCopy {
  return copy[locale];
}
