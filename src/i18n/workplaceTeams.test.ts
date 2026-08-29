import { describe, expect, it } from 'vitest';

import { getWorkplaceTeamsCopy } from './workplaceTeams';

describe('Workplace Teams localization', () => {
  it('keeps English and German buyer narratives structurally complete', () => {
    const english = getWorkplaceTeamsCopy('en');
    const german = getWorkplaceTeamsCopy('de');

    expect(english.sections.length).toBeGreaterThan(2);
    expect(german.sections).toHaveLength(english.sections.length);

    english.sections.forEach((section, index) => {
      const translated = german.sections[index];

      expect(translated).toBeDefined();
      if (!translated) {
        throw new Error(`Missing German Workplace Teams section ${index + 1}.`);
      }

      expect(section.eyebrow.trim()).not.toBe('');
      expect(section.title.trim()).not.toBe('');
      expect(section.body.trim()).not.toBe('');
      expect(translated.eyebrow.trim()).not.toBe('');
      expect(translated.title.trim()).not.toBe('');
      expect(translated.body.trim()).not.toBe('');
      expect(translated.points?.length ?? 0).toBe(section.points?.length ?? 0);
      expect(Boolean(translated.statement)).toBe(Boolean(section.statement));
    });

    expect(english.closing.primaryCta.trim()).not.toBe('');
    expect(english.closing.secondaryCta.trim()).not.toBe('');
    expect(german.closing.primaryCta.trim()).not.toBe('');
    expect(german.closing.secondaryCta.trim()).not.toBe('');
  });
});
