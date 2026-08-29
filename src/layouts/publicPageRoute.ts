import type { Locale } from '../config/locales';
import { isProductStorySlug, type ProductStorySlug } from '../i18n/productStory';
import { getPublicPageCopy, type PublicPageSlug } from '../i18n/publicPages';

export type PublicPageVariant =
  | 'demo-request'
  | 'insights'
  | 'product-story'
  | 'integrations'
  | 'workplace-teams'
  | 'security-trust'
  | 'pricing'
  | 'info';

type PublicPageRouteBase = {
  title: string;
  description: string;
};

export type PublicPageRoute =
  | (PublicPageRouteBase & {
      variant: 'product-story';
      slug: ProductStorySlug;
    })
  | (PublicPageRouteBase & {
      variant: Exclude<PublicPageVariant, 'product-story'>;
      slug: PublicPageSlug;
    });

function getRouteBase(
  locale: Locale,
  slug: PublicPageSlug,
  detailed: boolean,
): PublicPageRouteBase {
  const copy = getPublicPageCopy(locale, slug);
  const titleSource = detailed ? copy.title : copy.eyebrow;

  return {
    title: `${titleSource} — Conference Manager`,
    description: copy.description,
  };
}

export function resolvePublicPageRoute(locale: Locale, slug: PublicPageSlug): PublicPageRoute {
  if (isProductStorySlug(slug)) {
    return {
      ...getRouteBase(locale, slug, true),
      variant: 'product-story',
      slug,
    };
  }

  switch (slug) {
    case 'book-a-demo':
      return { ...getRouteBase(locale, slug, false), variant: 'demo-request', slug };
    case 'insights':
      return { ...getRouteBase(locale, slug, false), variant: 'insights', slug };
    case 'integrations':
      return { ...getRouteBase(locale, slug, true), variant: 'integrations', slug };
    case 'workplace-teams':
      return { ...getRouteBase(locale, slug, true), variant: 'workplace-teams', slug };
    case 'security-trust':
      return { ...getRouteBase(locale, slug, true), variant: 'security-trust', slug };
    case 'pricing':
      return { ...getRouteBase(locale, slug, true), variant: 'pricing', slug };
    default:
      return { ...getRouteBase(locale, slug, false), variant: 'info', slug };
  }
}
