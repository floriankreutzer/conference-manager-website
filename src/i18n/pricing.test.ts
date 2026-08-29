import { describe, expect, it } from 'vitest';
import { getPricingCopy } from './pricing';

const forbiddenCurrency = /[$€£¥]|\b(?:EUR|USD|GBP|CHF)\b/i;
const forbiddenMoneyAmount = /\b\d+(?:[.,]\d{1,2})?\s*(?:€|EUR|USD|GBP|CHF|dollars?|euros?|pounds?|francs?)\b/i;
const forbiddenTierName = /\b(?:free|starter|basic|professional|pro|business|enterprise|premium)\s+(?:plan|tier|package)\b/i;

describe('Pricing copy', () => {
  it('keeps English and German section structure aligned', () => {
    const english = getPricingCopy('en');
    const german = getPricingCopy('de');

    expect(english.sections).toHaveLength(german.sections.length);
    expect(english.sections).toHaveLength(4);

    english.sections.forEach((section, index) => {
      const translatedSection = german.sections[index];
      expect(translatedSection).toBeDefined();
      expect(Boolean(section.points)).toBe(Boolean(translatedSection?.points));
      expect(section.points?.length ?? 0).toBe(translatedSection?.points?.length ?? 0);
      expect(Boolean(section.statement)).toBe(Boolean(translatedSection?.statement));
    });
  });

  it('keeps the unapproved commercial state explicit', () => {
    const english = JSON.stringify(getPricingCopy('en'));
    const german = JSON.stringify(getPricingCopy('de'));

    expect(english).toContain('does not yet have a final approved public pricing model');
    expect(german).toContain('noch kein final freigegebenes öffentliches Preismodell');
  });

  it('fails closed on fabricated monetary pricing and package tiers', () => {
    for (const locale of ['en', 'de'] as const) {
      const serialized = JSON.stringify(getPricingCopy(locale));

      expect(serialized).not.toMatch(forbiddenCurrency);
      expect(serialized).not.toMatch(forbiddenMoneyAmount);
      expect(serialized).not.toMatch(forbiddenTierName);
    }
  });
});
