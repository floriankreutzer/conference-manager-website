import { describe, expect, it } from 'vitest';
import { withoutBasePath, withBasePath } from './basePath';

describe('base-path routing', () => {
  it('preserves root hosting behavior', () => {
    expect(withBasePath('/en/product/', '/')).toBe('/en/product/');
    expect(withoutBasePath('/en/product/', '/')).toBe('/en/product/');
  });

  it('prefixes GitHub Pages project paths exactly once', () => {
    expect(withBasePath('/en/product/', '/conference-manager-website/')).toBe(
      '/conference-manager-website/en/product/',
    );
  });

  it('removes the configured project base before locale switching', () => {
    expect(
      withoutBasePath(
        '/conference-manager-website/de/security-trust/',
        '/conference-manager-website/',
      ),
    ).toBe('/de/security-trust/');
  });

  it('does not strip unrelated path prefixes', () => {
    expect(withoutBasePath('/other/en/', '/conference-manager-website/')).toBe('/other/en/');
  });
});
