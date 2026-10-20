import { describe, expect, it } from 'vitest';
import { getHomepageCopy } from './homepage';
import { getNavigationCopy } from './navigation';

const informalGermanPronouns = /\b(dein|deine|deinen|deinem|deiner|dir|du)\b/i;

describe('customer-led marketing experience', () => {
  it('keeps the homepage outcome-led and room-booking-safe', () => {
    const english = getHomepageCopy('en');

    expect(english.hero.title).toBe('Organise meetings.');
    expect(english.hero.outcome).toBe('Reduce the follow-up.');
    expect(english.hero.body).toContain('guests, catering and equipment');
    expect(english.roomBooking.supporting).toContain(
      'existing room-booking system remains responsible for reservations',
    );
    expect(english.hero.pilot).toContain('after setup is complete');
    expect(english.hero.setup).toBe('A one-time setup fee applies.');
    expect(english.roomBooking.nodes[3]?.label).toBe('Optional · subject to assessment');
    expect(english.hero.primaryCta).toBe('Book a demo');
  });

  it('uses professional German B2B address on the homepage', () => {
    const german = getHomepageCopy('de');
    const serializedCopy = JSON.stringify(german);

    expect(serializedCopy).not.toMatch(informalGermanPronouns);
    expect(german.hero.primaryCta).toBe('Demo anfragen');
    expect(german.roomBooking.supporting).toContain('Ihre bestehende Raumbuchung');
    expect(german.hero.setup).toBe('Die Einrichtung ist einmalig kostenpflichtig.');
  });

  it('keeps primary navigation buyer-focused while preserving evaluation depth in the footer', () => {
    const english = getNavigationCopy('en');
    const primaryLabels = english.items.map((item) => item.label);
    const evaluationLabels = english.footer.resourceLinks.map((item) => item.label);

    expect(primaryLabels).toEqual([
      'How it works',
      'For your team',
      'Integrations',
      'Setup & pilot',
    ]);
    expect(primaryLabels).not.toContain('Pricing');
    expect(primaryLabels).not.toContain('Insights');
    expect(evaluationLabels).toContain('Setup & pilot');
    expect(evaluationLabels).toContain('Insights');
  });

  it('keeps Conference Manager as product and Pavurel as endorsement', () => {
    for (const locale of ['en', 'de'] as const) {
      const navigation = getNavigationCopy(locale);
      expect(navigation.footer.brandHeading).toBe('Conference Manager by Pavurel');
      expect(navigation.footer.brandBody).toContain('Conference Manager');
      expect(navigation.footer.brandBody).toContain('Pavurel');
      expect(navigation.footer.productLinks.some((item) => item.href.includes('/company/'))).toBe(
        true,
      );
    }
  });
});
