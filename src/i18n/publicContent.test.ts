import { describe, expect, it } from 'vitest';
import { getHomepageCopy } from './homepage';
import { getPublicPageCopy, publicPageSlugs } from './publicPages';

const locales = ['en', 'de'] as const;

describe('public bilingual content contract', () => {
  it('keeps homepage structures aligned across launch locales', () => {
    const en = getHomepageCopy('en');
    const de = getHomepageCopy('de');

    expect(de.problem.cards).toHaveLength(en.problem.cards.length);
    expect(de.audiences.cards).toHaveLength(en.audiences.cards.length);
    expect(de.roomBooking.nodes).toHaveLength(en.roomBooking.nodes.length);
    expect(de.overview.items).toHaveLength(en.overview.items.length);
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
      const publishedText = [
        pricing.title,
        pricing.description,
        pricing.body,
        pricing.note ?? '',
      ].join(' ');
      expect(publishedText).not.toMatch(monetaryAmount);
    }
  });

  it('preserves the room-booking-not-replacement position in both locales', () => {
    expect(getHomepageCopy('en').roomBooking.nodes[0]?.body).toContain(
      'existing room-booking system remains responsible for reservations',
    );
    expect(getHomepageCopy('de').roomBooking.nodes[0]?.body).toContain(
      'bestehende Raumbuchung bleibt für die Reservierung zuständig',
    );
  });
});
