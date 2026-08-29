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

  it('keeps both locales evidence-led and customer-oriented', () => {
    const english = getSecurityTrustCopy('en');
    const german = getSecurityTrustCopy('de');
    const englishText = JSON.stringify(english);
    const germanText = JSON.stringify(german);

    expect(englishText).toContain('customer environment');
    expect(germanText).toContain('Kundenumgebung');
    expect(englishText).toContain('certifications');
    expect(germanText).toContain('Zertifizierungen');
    expect(english.closing.primaryCta).toBe('Explore integrations');
    expect(german.closing.primaryCta).toBe('Integrationen ansehen');
    expect(english.closing.primaryCta).not.toBe('Book a demo');
    expect(german.closing.primaryCta).not.toBe('Demo anfragen');
  });
});
