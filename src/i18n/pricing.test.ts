import { describe, expect, it } from 'vitest';
import { getPricingCopy } from './pricing';

const forbiddenCurrency = /[$€£¥]|\b(?:EUR|USD|GBP|CHF)\b/i;
const forbiddenMoneyAmount =
  /\b\d+(?:[.,]\d{1,2})?\s*(?:€|EUR|USD|GBP|CHF|dollars?|euros?|pounds?|francs?)\b/i;
const forbiddenTierName =
  /\b(?:free|starter|basic|professional|pro|business|enterprise|premium)\s+(?:plan|tier|package)\b/i;
const forbiddenFreeSetup =
  /\b(?:free|complimentary)\s+setup\b|\bkosten(?:lose|freie)[rns]?\s+Einrichtung\b/i;
const forbiddenUnqualifiedPilot = /\bfree\s+(?:pilot|trial)\b|\bkostenlose[rns]?\s+Pilot\b/i;
const forbiddenUnapprovedTerms =
  /\b(?:auto-renewal|automatically renews?|money-back|refundable|billed monthly|billed annually)\b|automatische Verlängerung|Geld-zurück|erstattungsfähig|monatliche Abrechnung|jährliche Abrechnung/i;

describe('Pricing copy', () => {
  it('keeps English and German section structure aligned', () => {
    const english = getPricingCopy('en');
    const german = getPricingCopy('de');

    expect(english.sections).toHaveLength(german.sections.length);
    expect(english.sections).toHaveLength(3);

    english.sections.forEach((_section, index) => {
      const translatedSection = german.sections[index];
      expect(translatedSection).toBeDefined();
      expect(translatedSection?.title.trim()).not.toBe('');
      expect(translatedSection?.body.trim()).not.toBe('');
    });
  });

  it('qualifies the free software period with completed setup, a setup fee and a customer environment', () => {
    const english = getPricingCopy('en').offer;
    const german = getPricingCopy('de').offer;

    expect(english.title).toBe('30 days of free software use.');
    expect(english.start).toBe('The 30 days start after setup is complete.');
    expect(english.setupFee).toBe('A one-time setup fee applies.');
    expect(english.body).toContain('your own real meetings');
    expect(english.body).toContain('your configured customer environment');
    expect(english.pricingStatus).toContain('still to be agreed');

    expect(german.title).toBe('30 Tage kostenlose Softwarenutzung.');
    expect(german.start).toBe('Die 30 Tage beginnen nach abgeschlossener Einrichtung.');
    expect(german.setupFee).toBe('Die Einrichtung ist einmalig kostenpflichtig.');
    expect(german.body).toContain('Ihren eigenen realen Besprechungen');
    expect(german.body).toContain('Ihrer eingerichteten Kundenumgebung');
    expect(german.pricingStatus).toContain('noch offen');
  });

  it('starts with a demo and places paid setup before the free software period', () => {
    for (const locale of ['en', 'de'] as const) {
      const copy = getPricingCopy(locale);

      expect(copy.sections[0]?.eyebrow).toBe('Demo');
      expect(copy.sections[1]?.eyebrow).toBe(locale === 'de' ? 'Einrichtung' : 'Setup');
      expect(copy.sections[2]?.eyebrow).toBe('Pilot');
      expect(copy.closing.primaryCta).toBe(locale === 'de' ? 'Demo anfragen' : 'Book a demo');
    }
  });

  it('keeps amounts, billing tiers and unapproved commercial terms unpublished', () => {
    for (const locale of ['en', 'de'] as const) {
      const serialized = JSON.stringify(getPricingCopy(locale));

      expect(serialized).not.toMatch(forbiddenCurrency);
      expect(serialized).not.toMatch(forbiddenMoneyAmount);
      expect(serialized).not.toMatch(forbiddenTierName);
      expect(serialized).not.toMatch(forbiddenFreeSetup);
      expect(serialized).not.toMatch(forbiddenUnqualifiedPilot);
      expect(serialized).not.toMatch(forbiddenUnapprovedTerms);
    }
  });
});
