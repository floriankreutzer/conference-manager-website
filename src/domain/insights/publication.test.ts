import { describe, expect, it } from 'vitest';

import { assertPublishedTranslationPairs } from './publication';

describe('assertPublishedTranslationPairs', () => {
  it('accepts complete English and German publication pairs with one reciprocal route slug', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'governed-conferences',
          locale: 'en',
          routeSlug: 'governed-conferences',
          status: 'published',
        },
        {
          translationKey: 'governed-conferences',
          locale: 'de',
          routeSlug: 'governed-conferences',
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
          routeSlug: 'draft-topic-en',
          status: 'draft',
        },
        {
          translationKey: 'review-topic',
          locale: 'de',
          routeSlug: 'review-topic-de',
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
          routeSlug: 'missing-translation',
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
          routeSlug: 'duplicate',
          status: 'published',
        },
        {
          translationKey: 'duplicate',
          locale: 'en',
          routeSlug: 'duplicate',
          status: 'published',
        },
        {
          translationKey: 'duplicate',
          locale: 'de',
          routeSlug: 'duplicate',
          status: 'published',
        },
      ]),
    ).toThrow('Duplicate published en insight for duplicate.');
  });

  it('rejects published translations with different route slugs because hreflang is reciprocal by path', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        {
          translationKey: 'route-mismatch',
          locale: 'en',
          routeSlug: 'english-route',
          status: 'published',
        },
        {
          translationKey: 'route-mismatch',
          locale: 'de',
          routeSlug: 'deutsche-route',
          status: 'published',
        },
      ]),
    ).toThrow(
      'Published insight route-mismatch requires one shared route slug across English and German entries for reciprocal hreflang routes.',
    );
  });
});
