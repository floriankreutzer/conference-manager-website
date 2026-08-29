import type { Locale } from '@config/locales';
import { isProductStorySlug, type ProductStorySlug } from '@i18n/productStory';
import { getPublicPageCopy, type PublicPageSlug } from '@i18n/publicPages';

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

const detailedVariants: ReadonlySet<PublicPageVariant> = new Set([
  'product-story',
  'integrations',
  'workplace-teams',
  'security-trust',
  'pricing',
]);

function resolveVariant(slug: PublicPageSlug): PublicPageVariant {
  if (isProductStorySlug(slug)) {
    return 'product-story';
  }

  switch (slug) {
    case 'book-a-demo':
      return 'demo-request';
    case 'insights':
      return 'insights';
    case 'integrations':
      return 'integrations';
    case 'workplace-teams':
      return 'workplace-teams';
    case 'security-trust':
      return 'security-trust';
    case 'pricing':
      return 'pricing';
    default:
      return 'info';
  }
}

export function resolvePublicPageRoute(locale: Locale, slug: PublicPageSlug): PublicPageRoute {
  const copy = getPublicPageCopy(locale, slug);
  const variant = resolveVariant(slug);
  const titleSource = detailedVariants.has(variant) ? copy.title : copy.eyebrow;
  const base = {
    title: `${titleSource} — Conference Manager`,
    description: copy.description,
  };

  if (variant === 'product-story' && isProductStorySlug(slug)) {
    return { ...base, variant, slug };
  }

  return { ...base, variant, slug };
}
