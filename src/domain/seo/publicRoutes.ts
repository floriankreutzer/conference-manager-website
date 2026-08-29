import { locales } from '@config/locales';
import { publicPageSlugs } from '@i18n/publicPages';

export function getIndexablePublicPaths(): string[] {
  return locales.flatMap((locale) => [
    `/${locale}/`,
    ...publicPageSlugs.map((slug) => `/${locale}/${slug}/`),
  ]);
}
