export type InsightPublicationEntry = {
  translationKey: string;
  locale: 'en' | 'de';
  routeSlug: string;
  status: 'draft' | 'reviewed' | 'published';
};

type PublishedTranslationPair = {
  locales: Set<'en' | 'de'>;
  routeSlug: string;
};

export function assertPublishedTranslationPairs(entries: InsightPublicationEntry[]): void {
  const published = entries.filter((entry) => entry.status === 'published');
  const translationsByKey = new Map<string, PublishedTranslationPair>();

  for (const entry of published) {
    const translation = translationsByKey.get(entry.translationKey) ?? {
      locales: new Set<'en' | 'de'>(),
      routeSlug: entry.routeSlug,
    };

    if (translation.locales.has(entry.locale)) {
      throw new Error(`Duplicate published ${entry.locale} insight for ${entry.translationKey}.`);
    }

    if (translation.routeSlug !== entry.routeSlug) {
      throw new Error(
        `Published insight ${entry.translationKey} requires one shared route slug across English and German entries for reciprocal hreflang routes.`,
      );
    }

    translation.locales.add(entry.locale);
    translationsByKey.set(entry.translationKey, translation);
  }

  for (const [translationKey, translation] of translationsByKey) {
    if (!translation.locales.has('en') || !translation.locales.has('de')) {
      throw new Error(
        `Published insight ${translationKey} requires complete English and German entries.`,
      );
    }
  }
}
