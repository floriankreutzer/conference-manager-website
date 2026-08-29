export type InsightPublicationEntry = {
  translationKey: string;
  locale: 'en' | 'de';
  status: 'draft' | 'reviewed' | 'published';
};

export function assertPublishedTranslationPairs(entries: InsightPublicationEntry[]): void {
  const published = entries.filter((entry) => entry.status === 'published');
  const localesByKey = new Map<string, Set<'en' | 'de'>>();

  for (const entry of published) {
    const locales = localesByKey.get(entry.translationKey) ?? new Set<'en' | 'de'>();

    if (locales.has(entry.locale)) {
      throw new Error(`Duplicate published ${entry.locale} insight for ${entry.translationKey}.`);
    }

    locales.add(entry.locale);
    localesByKey.set(entry.translationKey, locales);
  }

  for (const [translationKey, locales] of localesByKey) {
    if (!locales.has('en') || !locales.has('de')) {
      throw new Error(
        `Published insight ${translationKey} requires complete English and German entries.`,
      );
    }
  }
}
