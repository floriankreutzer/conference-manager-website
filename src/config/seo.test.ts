import { describe, expect, it } from 'vitest';

import { getSeoConfig } from './seo';

describe('getSeoConfig', () => {
  it('keeps preview builds non-indexable without requiring a production origin', () => {
    expect(getSeoConfig({ preview: true, development: false })).toEqual({
      indexable: false,
      siteOrigin: undefined,
    });
  });

  it('keeps development non-indexable', () => {
    expect(getSeoConfig({ preview: false, development: true })).toEqual({
      indexable: false,
      siteOrigin: undefined,
    });
  });

  it('requires an explicit origin for indexable builds', () => {
    expect(() => getSeoConfig({ preview: false, development: false })).toThrow(
      'PUBLIC_SITE_ORIGIN is required for an indexable build.',
    );
  });

  it('accepts a clean HTTPS origin for indexable builds', () => {
    const config = getSeoConfig({
      preview: false,
      development: false,
      siteOrigin: 'https://example.com',
    });

    expect(config.indexable).toBe(true);
    expect(config.siteOrigin?.toString()).toBe('https://example.com/');
  });

  it.each([
    'http://example.com',
    'javascript:alert(1)',
    'https://user:pass@example.com',
    'https://example.com/path',
    'https://example.com/?campaign=test',
    'https://example.com/#section',
  ])('rejects unsafe or non-origin site configuration: %s', (siteOrigin) => {
    expect(() =>
      getSeoConfig({ preview: false, development: false, siteOrigin }),
    ).toThrow('PUBLIC_SITE_ORIGIN must be a clean HTTPS origin.');
  });
});
