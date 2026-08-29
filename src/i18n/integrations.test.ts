import { describe, expect, it } from 'vitest';
import { getIntegrationsCopy } from './integrations';

describe('Integrations copy', () => {
  it('keeps English and German section structure aligned', () => {
    const english = getIntegrationsCopy('en');
    const german = getIntegrationsCopy('de');

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

  it('keeps pilot and future-provider qualifications explicit', () => {
    const english = getIntegrationsCopy('en');
    const german = getIntegrationsCopy('de');

    expect(
      english.sections.some((section) => section.body.includes('external Pilot acceptance gate')),
    ).toBe(true);
    expect(german.sections.some((section) => section.body.includes('externen Pilot-Abnahme'))).toBe(
      true,
    );
    expect(
      english.sections.some((section) => section.body.includes('does not mean that Google')),
    ).toBe(true);
    expect(
      german.sections.some((section) => section.body.includes('Das bedeutet nicht, dass Google')),
    ).toBe(true);
  });
});
