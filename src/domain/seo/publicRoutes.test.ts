import { describe, expect, it } from 'vitest';

import { getIndexablePublicPaths } from './publicRoutes';

describe('getIndexablePublicPaths', () => {
  it('contains the complete localized public route set exactly once', () => {
    const paths = getIndexablePublicPaths();

    expect(paths).toHaveLength(20);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain('/en/');
    expect(paths).toContain('/de/');
    expect(paths).toContain('/en/company/');
    expect(paths).toContain('/de/company/');
    expect(paths).toContain('/en/book-a-demo/');
    expect(paths).toContain('/de/book-a-demo/');
    expect(paths).not.toContain('/');
    expect(paths.every((path) => path.endsWith('/'))).toBe(true);
  });
});
