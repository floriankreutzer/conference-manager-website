import { describe, expect, it } from 'vitest';

import { assertPublishedTranslationPairs } from './publication';

describe('assertPublishedTranslationPairs', () => {
  it('accepts complete English and German publication pairs with one reciprocal slug', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'governed-conferences',
          locale: 'en',
          slug: 'governed-conferences',
          status: 'published',
        },
        {
          translationKey: 'governed-conferences',
          locale: 'de',
          slug: 'governed-conferences',
          status: 'published',
        },
      ]),
    ).not.toThrow();
  });

  it('ignores draft and reviewed entries for the public pairing gate', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'draft-topic',
          locale: 'en',
          slug: 'draft-topic-en',
          status: 'draft',
        },
        {
          translationKey: 'review-topic',
          locale: 'de',
          slug: 'review-topic-de',
          status: 'reviewed',
        },
      ]),
    ).not.toThrow();
  });

  it('rejects a published insight without its translated counterpart', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'missing-translation',
          locale: 'en',
          slug: 'missing-translation',
          status: 'published',
        },
      ]),
    ).toThrow(
      'Published insight missing-translation requires complete English and German entries.',
    );
  });

  it('rejects duplicate published locale entries for one translation key', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'duplicate',
          locale: 'en',
          slug: 'duplicate',
          status: 'published',
        },
        {
          translationKey: 'duplicate',
          locale: 'en',
          slug: 'duplicate',
          status: 'published',
        },
        {
          translationKey: 'duplicate',
          locale: 'de',
          slug: 'duplicate',
          status: 'published',
        },
      ]),
    ).toThrow('Duplicate published en insight for duplicate.');
  });

  it('rejects published translations with different slugs because hreflang is reciprocal by path', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'route-mismatch',
          locale: 'en',
          slug: 'english-route',
          status: 'published',
        },
        {
          translationKey: 'route-mismatch',
          locale: 'de',
          slug: 'deutsche-route',
          status: 'published',
        },
      ]),
    ).toThrow(
      'Published insight route-mismatch requires one shared slug across English and German entries for reciprocal hreflang routes.',
    );
  });
});
