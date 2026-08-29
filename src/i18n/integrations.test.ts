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

  it('keeps real-tenant and future-provider qualifications explicit', () => {
    const english = getIntegrationsCopy('en');
    const german = getIntegrationsCopy('de');

    expect(
      english.sections.some((section) => section.body.includes('operational acceptance')),
    ).toBe(true);
    expect(german.sections.some((section) => section.body.includes('operative Abnahme'))).toBe(true);
    expect(
      english.sections.some((section) =>
        section.body.includes('other providers are not presented as available'),
      ),
    ).toBe(true);
    expect(
      german.sections.some((section) =>
        section.body.includes('andere Provider werden erst dann als verfügbar dargestellt'),
      ),
    ).toBe(true);
  });
});
