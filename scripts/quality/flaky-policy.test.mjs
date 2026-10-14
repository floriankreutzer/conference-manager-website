import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';

test('the real website runner rejects fail-then-pass and accepts stable tests', () => {
  const directory = mkdtempSync(join(tmpdir(), 'cm-flaky-policy-'));
  const configPath = join(directory, 'playwright.config.mjs');
  const reportPath = join(directory, 'report.json');
  const fixturePath = join(directory, 'controlled.spec.mjs');
  const root = fileURLToPath(new URL('../..', import.meta.url));
  const packageUrl = import.meta.resolve('@playwright/test');
  const websiteConfigUrl = new URL('../../playwright.config.ts', import.meta.url).href;
  try {
    // Reuse the actual policy, but never start the website or launch a browser.
    writeFileSync(
      configPath,
      `
      import { defineConfig } from ${JSON.stringify(packageUrl)};
      import website from ${JSON.stringify(websiteConfigUrl)};
      export default defineConfig({
        ...website, testDir: ${JSON.stringify(directory)},
        testMatch: '**/controlled.spec.mjs', projects: [{ name: 'policy-contract' }],
        webServer: undefined, workers: 1, fullyParallel: false,
        reporter: [['json', { outputFile: ${JSON.stringify(reportPath)} }]],
        outputDir: ${JSON.stringify(join(directory, 'output'))}
      });
    `,
    );
    for (const flaky of [false, true]) {
      writeFileSync(
        fixturePath,
        `
        import { test, expect } from ${JSON.stringify(packageUrl)};
        test('controlled policy fixture', async ({}, info) => {
          expect(${flaky ? 'info.retry' : '1'}).toBe(1);
        });
      `,
      );
      const result = spawnSync(
        process.execPath,
        [
          fileURLToPath(import.meta.resolve('@playwright/test/cli')),
          'test',
          '--config',
          configPath,
        ],
        { cwd: root, timeout: 30_000, maxBuffer: 65_536, encoding: 'utf8' },
      );
      expect(result.error).toBeUndefined();
      expect(result.signal).toBeNull();
      expect(result.status).toBe(flaky ? 1 : 0);
      const bytes = readFileSync(reportPath);
      expect(bytes.length).toBeLessThanOrEqual(65_536);
      const report = JSON.parse(bytes.toString('utf8'));
      expect(report.errors).toEqual([]);
      expect(report.stats.unexpected).toBe(0);
      expect(report.stats.flaky).toBe(flaky ? 1 : 0);
      expect(report.stats.expected).toBe(flaky ? 0 : 1);
      const tests = report.suites.flatMap((suite) => suite.specs).flatMap((spec) => spec.tests);
      expect(tests).toHaveLength(1);
      expect(tests[0].results.map((entry) => entry.status)).toEqual(
        flaky ? ['failed', 'passed'] : ['passed'],
      );
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}, 65_000);
