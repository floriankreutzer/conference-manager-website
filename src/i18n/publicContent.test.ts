import { describe, expect, it } from 'vitest';
import { getHomepageCopy } from './homepage';
import { getPublicPageCopy, publicPageSlugs } from './publicPages';

const locales = ['en', 'de'] as const;

describe('public bilingual content contract', () => {
  it('keeps homepage structures aligned across launch locales', () => {
    const en = getHomepageCopy('en');
    const de = getHomepageCopy('de');

    expect(de.value.cards).toHaveLength(en.value.cards.length);
    expect(de.howItWorks.steps).toHaveLength(en.howItWorks.steps.length);
    expect(de.readiness.themes).toHaveLength(en.readiness.themes.length);
    expect(de.why.cards).toHaveLength(en.why.cards.length);
  });

  it.each(publicPageSlugs)('provides %s in both launch locales', (slug) => {
    for (const locale of locales) {
      const page = getPublicPageCopy(locale, slug);
      expect(page.title.trim()).not.toBe('');
      expect(page.description.trim()).not.toBe('');
      expect(page.body.trim()).not.toBe('');
    }
  });

  it('does not publish monetary pricing before approval', () => {
    const monetaryAmount = /(?:€|\$|£)\s*\d|\d\s*(?:EUR|USD|GBP)/i;

    for (const locale of locales) {
      const pricing = getPublicPageCopy(locale, 'pricing');
      const publishedText = [pricing.title, pricing.description, pricing.body, pricing.note ?? ''].join(' ');
      expect(publishedText).not.toMatch(monetaryAmount);
    }
  });

  it('preserves the room-booking-not-replacement position in both locales', () => {
    expect(getHomepageCopy('en').roomBooking.supporting).toContain('don’t replace');
    expect(getHomepageCopy('de').roomBooking.supporting).toContain('ersetzen');
  });
});
