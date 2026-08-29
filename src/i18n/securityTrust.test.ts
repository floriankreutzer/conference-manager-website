import { describe, expect, it } from 'vitest';
import { getSecurityTrustCopy } from './securityTrust';

describe('Security and Trust copy', () => {
  it('keeps English and German section structure aligned', () => {
    const english = getSecurityTrustCopy('en');
    const german = getSecurityTrustCopy('de');

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

  it('keeps both locales on evidence-led trust language', () => {
    const english = getSecurityTrustCopy('en');
    const german = getSecurityTrustCopy('de');

    expect(english.sections.some((section) => section.body.includes('certifications'))).toBe(true);
    expect(german.sections.some((section) => section.body.includes('Zertifizierungen'))).toBe(true);
    expect(english.closing.primaryCta).toBe('Book a demo');
    expect(german.closing.primaryCta).toBe('Demo anfragen');
  });
});
