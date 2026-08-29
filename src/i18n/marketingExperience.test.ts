import { describe, expect, it } from 'vitest';
import { getHomepageCopy } from './homepage';
import { getNavigationCopy } from './navigation';

const informalGermanPronouns = /\b(dein|deine|deinen|deinem|deiner|dir|du)\b/i;

describe('customer-led marketing experience', () => {
  it('keeps the homepage outcome-led and room-booking-safe', () => {
    const english = getHomepageCopy('en');

    expect(english.hero.title).toBe('Make every workplace conference feel effortless.');
    expect(english.hero.body).toContain('guests, catering, services');
    expect(english.roomBooking.body).toContain('not another room-booking product');
    expect(english.brand.title).toContain('Operational precision');
    expect(english.closing.primaryCta).toBe('Book a demo');
  });

  it('uses professional German B2B address on the homepage', () => {
    const german = getHomepageCopy('de');
    const serializedCopy = JSON.stringify(german);

    expect(serializedCopy).not.toMatch(informalGermanPronouns);
    expect(german.hero.primaryCta).toBe('Demo anfragen');
    expect(german.roomBooking.supporting).toContain('Ihre Raumbuchung');
  });

  it('keeps primary navigation compact while preserving evaluation depth in the footer', () => {
    const english = getNavigationCopy('en');
    const primaryLabels = english.items.map((item) => item.label);
    const evaluationLabels = english.footer.resourceLinks.map((item) => item.label);

    expect(primaryLabels).toEqual([
      'Product',
      'How it works',
      'For Workplace Teams',
      'Integrations',
      'Security & Trust',
    ]);
    expect(primaryLabels).not.toContain('Pricing');
    expect(primaryLabels).not.toContain('Insights');
    expect(evaluationLabels).toContain('Pricing approach');
    expect(evaluationLabels).toContain('Insights');
  });

  it('keeps Conference Manager as product and Pavurel as endorsement', () => {
    for (const locale of ['en', 'de'] as const) {
      const navigation = getNavigationCopy(locale);
      expect(navigation.footer.brandHeading).toBe('Conference Manager by Pavurel');
      expect(navigation.footer.brandBody).toContain('Conference Manager');
      expect(navigation.footer.brandBody).toContain('Pavurel');
    }
  });
});
