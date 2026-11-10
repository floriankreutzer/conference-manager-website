import { createRequire } from 'node:module';
import { expect, test } from 'vitest';
import {
  PARENTS,
  candidateManifest,
  consumerContracts,
  validateAudit,
  validateResolution,
} from './resolve-minimatch-once.mjs';

const MINIMATCH = 'node_modules/minimatch';
const MATCHER = 'node_modules/@isaacs/nonrecursive-glob-match';
const copy = (value) => JSON.parse(JSON.stringify(value));
// Synthetic SRI fixtures; only npm generates the actual candidate lock integrity.
const record = (name, version, extra = {}) => ({
  version,
  resolved:
    'https://registry.npmjs.org/' + name + '/-/' + name.split('/').at(-1) + '-' + version + '.tgz',
  integrity: 'sha512-' + Buffer.alloc(64, 7).toString('base64'),
  dev: true,
  license: 'BlueOak-1.0.0',
  ...extra,
});

function fixture() {
  const original = {
    name: 'conference-manager-website',
    dependencies: { astro: '7.3.3' },
    devDependencies: { eslint: '10.9.1', 'typescript-eslint': '8.68.0' },
    overrides: { devalue: '5.9.4' },
  };
  const before = {
    lockfileVersion: 3,
    requires: true,
    packages: {
      '': { name: original.name, dependencies: original.dependencies },
      [MINIMATCH]: record('minimatch', '10.2.6'),
      'node_modules/retained': { version: '1.0.0', dev: true },
      ...Object.fromEntries(
        Object.entries(PARENTS).map(([name, version]) => ['node_modules/' + name, { version }]),
      ),
    },
  };
  const after = copy(before);
  after.packages[MINIMATCH] = record('minimatch', '11.0.5', {
    dependencies: {
      '@isaacs/nonrecursive-glob-match': '^1.1.0',
      'brace-expansion': '^5.0.12',
    },
    engines: { node: '20 || >=22' },
  });
  after.packages[MATCHER] = record('@isaacs/nonrecursive-glob-match', '1.1.0');
  return { original, before, candidate: candidateManifest(original), after };
}

function check(value) {
  return validateResolution(value.original, value.before, value.candidate, value.after);
}

test('three exact-parent overrides preserve existing overrides', () => {
  const value = fixture();
  expect(value.candidate.overrides).toEqual({
    devalue: '5.9.4',
    'eslint@10.9.1': { minimatch: '11.0.5' },
    '@eslint/config-array@0.23.5': { minimatch: '11.0.5' },
    '@typescript-eslint/typescript-estree@8.68.0': { minimatch: '11.0.5' },
  });
  expect(value.original.overrides).toEqual({ devalue: '5.9.4' });
  expect(check(value)).toEqual([MATCHER, MINIMATCH]);
});

test.each(['eslint', 'typescript-eslint'])('a changed direct parent %s requires review', (name) => {
  const value = fixture();
  value.original.devDependencies[name] = '99.0.0';
  expect(() => candidateManifest(value.original)).toThrow();
});

test('unreviewed existing overrides cannot be overwritten or broadened', () => {
  const value = fixture();
  value.original.overrides.another = '1.0.0';
  expect(() => candidateManifest(value.original)).toThrow();
});

test.each(Object.keys(PARENTS))('a changed resolved parent %s requires review', (name) => {
  const value = fixture();
  value.before.packages['node_modules/' + name].version = '99.0.0';
  expect(() => check(value)).toThrow();
});

test.each(['edit', 'remove', 'add'])('rejects an unrelated package %s', (operation) => {
  const value = fixture();
  if (operation === 'edit') value.after.packages['node_modules/retained'].version = '1.0.1';
  if (operation === 'remove') delete value.after.packages['node_modules/retained'];
  if (operation === 'add') value.after.packages['node_modules/unreviewed'] = { version: '1.0.0' };
  expect(() => check(value)).toThrow();
});

test('manifest, top-level lock metadata and runtime dependency drift fail closed', () => {
  const modifications = [
    (value) => {
      value.candidate.dependencies.astro = '99.0.0';
    },
    (value) => {
      value.candidate.overrides.minimatch = '11.0.5';
    },
    (value) => {
      value.after.lockfileVersion = 2;
    },
    (value) => {
      value.after.packages[MATCHER].dev = false;
    },
  ];
  for (const modify of modifications) {
    const value = fixture();
    modify(value);
    expect(() => check(value)).toThrow();
  }
});

test('requires reviewed versions, registry, integrity, license and lifecycle', () => {
  for (const path of [MINIMATCH, MATCHER]) {
    for (const [key, bad] of [
      ['version', '11.0.0'],
      ['resolved', 'https://unreviewed.example.invalid/package.tgz'],
      ['integrity', 'sha512-Zg=='],
      ['license', 'UNLICENSED'],
      ['hasInstallScript', true],
    ]) {
      const value = fixture();
      value.after.packages[path][key] = bad;
      expect(() => check(value)).toThrow();
    }
  }
});

test('new matcher dependencies and changed engine or expansion dependencies require review', () => {
  for (const modify of [
    (value) => {
      value.after.packages[MATCHER].dependencies = { unreviewed: '*' };
    },
    (value) => {
      value.after.packages[MINIMATCH].dependencies['brace-expansion'] = '*';
    },
    (value) => {
      value.after.packages[MINIMATCH].engines.node = '>=99';
    },
  ]) {
    const value = fixture();
    modify(value);
    expect(() => check(value)).toThrow();
  }
});

test('all vulnerability severities must be zero without advisory suppression', () => {
  const report = {
    auditReportVersion: 2,
    vulnerabilities: {},
    metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0 } },
  };
  expect(() => validateAudit(report)).not.toThrow();
  for (const severity of Object.keys(report.metadata.vulnerabilities)) {
    const invalid = copy(report);
    invalid.metadata.vulnerabilities[severity] = 1;
    expect(() => validateAudit(invalid)).toThrow();
  }
  const invalid = copy(report);
  invalid.vulnerabilities.minimatch = { severity: 'moderate' };
  expect(() => validateAudit(invalid)).toThrow();
  const failed = copy(report);
  failed.error = { code: 'AUDIT_UNAVAILABLE' };
  expect(() => validateAudit(failed)).toThrow();
});

test.each(Object.keys(PARENTS))('real %s resolution preserves used matcher APIs', (name) => {
  const root = new URL('../../node_modules/' + name + '/package.json', import.meta.url);
  const loadDependency = createRequire(root);
  expect(() => consumerContracts(loadDependency('minimatch'))).not.toThrow();
});

test('negative consumer contracts reject an overmatching implementation', () => {
  const module = {
    Minimatch: class {
      constructor(pattern) {
        this.pattern = pattern;
      }
      match() {
        return true;
      }
    },
    minimatch: () => true,
  };
  expect(() => consumerContracts(module)).toThrow();
});
