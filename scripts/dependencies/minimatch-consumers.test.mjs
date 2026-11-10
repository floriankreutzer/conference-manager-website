import { createRequire } from 'node:module';
import { expect, test } from 'vitest';

const loadFromTest = createRequire(import.meta.url);

test.each(['eslint', '@eslint/config-array', '@typescript-eslint/typescript-estree'])(
  'real %s resolution preserves used matcher APIs',
  (name) => {
    // Resolve an installed consumer entry before loading its own matcher dependency.
    const loadFromConsumer = createRequire(loadFromTest.resolve(name));
    const { Minimatch, minimatch } = loadFromConsumer('minimatch');
    const matcher = new Minimatch('src/**/*.{ts,astro}', { dot: true });

    expect(matcher.pattern).toBe('src/**/*.{ts,astro}');
    expect(matcher.match('src/config/application.ts')).toBe(true);
    expect(matcher.match('src/pages/en/index.astro')).toBe(true);
    expect(matcher.match('src/.hidden/example.ts')).toBe(true);
    expect(matcher.match('src/config')).toBe(false);
    expect(matcher.match('src/config', true)).toBe(true);
    expect(matcher.match('functions/demo-request/handler.js')).toBe(false);
    expect(matcher.match('src/config/application.txt')).toBe(false);

    const negated = new Minimatch('!dist/**', { dot: true });
    const flipped = new Minimatch('!dist/**', { dot: true, flipNegate: true });
    expect(negated.match('src/config/application.ts')).toBe(true);
    expect(negated.match('dist/index.js')).toBe(false);
    expect(flipped.match('dist/index.js')).toBe(true);
    expect(flipped.match('src/config/application.ts')).toBe(false);

    expect(minimatch('.config.ts', '*.ts', { dot: true })).toBe(true);
    expect(minimatch('.config.js', '*.ts', { dot: true })).toBe(false);
    expect(minimatch('.config.ts', '*.ts')).toBe(false);
  },
);
