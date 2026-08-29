import { getCollection } from 'astro:content';

import type { Locale } from '../../config/locales';
import { assertPublishedTranslationPairs } from '../../domain/insights/publication';

export async function getPublishedInsights() {
  const entries = await getCollection('insights');

  assertPublishedTranslationPairs(
    entries.map((entry) => ({
      translationKey: entry.data.translationKey,
      locale: entry.data.locale,
      status: entry.data.status,
    })),
  );

  return entries
    .filter((entry) => entry.data.status === 'published')
    .sort((left, right) => {
      const leftDate = left.data.publishedAt?.getTime() ?? 0;
      const rightDate = right.data.publishedAt?.getTime() ?? 0;
      return rightDate - leftDate;
    });
}

export async function getPublishedInsightsForLocale(locale: Locale) {
  const entries = await getPublishedInsights();
  return entries.filter((entry) => entry.data.locale === locale);
}
