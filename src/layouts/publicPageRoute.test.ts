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
  company: 'company',
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
      'One request. Everything for your meeting. — Conference Manager',
    );
    expect(resolvePublicPageRoute('de', 'pricing').title).toBe(
      'Mit eigenen Besprechungen erproben. — Conference Manager',
    );
    expect(resolvePublicPageRoute('en', 'company').title).toBe(
      'From first conversation to everyday meetings. — Conference Manager',
    );
    expect(resolvePublicPageRoute('en', 'insights').title).toBe('Insights — Conference Manager');
    expect(resolvePublicPageRoute('de', 'book-a-demo').title).toBe(
      'Demo anfragen — Conference Manager',
    );
  });

  it('preserves localized customer-led descriptions', () => {
    expect(resolvePublicPageRoute('en', 'integrations').description).toContain(
      'Room reservations, Microsoft sign-in and catering coordination',
    );
    expect(resolvePublicPageRoute('de', 'integrations').description).toContain(
      'Raumreservierung, Microsoft-Anmeldung und Cateringkoordination',
    );
    expect(resolvePublicPageRoute('en', 'company').description).toContain(
      'helps you agree the setup of Conference Manager',
    );
  });
});
