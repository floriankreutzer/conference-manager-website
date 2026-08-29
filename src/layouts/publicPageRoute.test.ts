import { describe, expect, it } from 'vitest';
import { publicPageSlugs } from '../i18n/publicPages';
import { resolvePublicPageRoute } from './publicPageRoute';

const expectedVariants = {
  product: 'product-story',
  'how-it-works': 'product-story',
  integrations: 'integrations',
  'workplace-teams': 'workplace-teams',
  'security-trust': 'security-trust',
  pricing: 'pricing',
  insights: 'insights',
  'book-a-demo': 'demo-request',
} as const;

describe('public page route resolution', () => {
  it('resolves every current public slug to the same page variant in both locales', () => {
    for (const slug of publicPageSlugs) {
      const english = resolvePublicPageRoute('en', slug);
      const german = resolvePublicPageRoute('de', slug);

      expect(english.variant).toBe(expectedVariants[slug]);
      expect(german.variant).toBe(expectedVariants[slug]);
      expect(english.slug).toBe(slug);
      expect(german.slug).toBe(slug);
    }
  });

  it('preserves descriptive titles for detailed pages and eyebrow titles for utility destinations', () => {
    expect(resolvePublicPageRoute('en', 'product').title).toBe(
      'Conference management around the complete request. — Conference Manager',
    );
    expect(resolvePublicPageRoute('de', 'pricing').title).toBe(
      'Preise werden transparent, bevor sie öffentlich werden. — Conference Manager',
    );
    expect(resolvePublicPageRoute('en', 'insights').title).toBe('Insights — Conference Manager');
    expect(resolvePublicPageRoute('de', 'book-a-demo').title).toBe(
      'Demo buchen — Conference Manager',
    );
  });

  it('preserves localized descriptions', () => {
    expect(resolvePublicPageRoute('en', 'integrations').description).toContain(
      'existing workplace, identity and collaboration capabilities',
    );
    expect(resolvePublicPageRoute('de', 'integrations').description).toContain(
      'bestehende Workplace-, Identity- und Collaboration-Fähigkeiten',
    );
  });
});
