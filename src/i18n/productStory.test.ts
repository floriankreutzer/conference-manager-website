import { describe, expect, it } from 'vitest';

import { getProductStoryCopy, isProductStorySlug, productStorySlugs } from './productStory';

describe('product story localization', () => {
  it('keeps English and German product narratives structurally complete', () => {
    for (const slug of productStorySlugs) {
      const english = getProductStoryCopy('en', slug);
      const german = getProductStoryCopy('de', slug);

      expect(english.sections.length).toBeGreaterThan(2);
      expect(german.sections).toHaveLength(english.sections.length);

      english.sections.forEach((section, index) => {
        const translated = german.sections[index];

        expect(translated).toBeDefined();
        if (!translated) {
          throw new Error(`Missing German product-story section ${index + 1} for ${slug}.`);
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
    }
  });

  it('narrows only the two dedicated product-story public routes', () => {
    expect(isProductStorySlug('product')).toBe(true);
    expect(isProductStorySlug('how-it-works')).toBe(true);
    expect(isProductStorySlug('integrations')).toBe(false);
    expect(isProductStorySlug('pricing')).toBe(false);
  });
});
