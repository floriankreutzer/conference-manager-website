import { describe, expect, it } from 'vitest';

import { assertPublishedTranslationPairs } from './publication';

describe('assertPublishedTranslationPairs', () => {
  it('accepts complete English and German publication pairs', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        { translationKey: 'governed-conferences', locale: 'en', status: 'published' },
        { translationKey: 'governed-conferences', locale: 'de', status: 'published' },
      ]),
    ).not.toThrow();
  });

  it('ignores draft and reviewed entries for the public pairing gate', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        { translationKey: 'draft-topic', locale: 'en', status: 'draft' },
        { translationKey: 'review-topic', locale: 'de', status: 'reviewed' },
      ]),
    ).not.toThrow();
  });

  it('rejects a published insight without its translated counterpart', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        { translationKey: 'missing-translation', locale: 'en', status: 'published' },
      ]),
    ).toThrow(
      'Published insight missing-translation requires complete English and German entries.',
    );
  });

  it('rejects duplicate published locale entries for one translation key', () => {
    expect(() =>
      assertPublishedTranslationPairs([
        { translationKey: 'duplicate', locale: 'en', status: 'published' },
        { translationKey: 'duplicate', locale: 'en', status: 'published' },
        { translationKey: 'duplicate', locale: 'de', status: 'published' },
      ]),
    ).toThrow('Duplicate published en insight for duplicate.');
  });
});
