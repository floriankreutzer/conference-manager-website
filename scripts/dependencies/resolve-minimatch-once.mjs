import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

export const BASE_SHA = '482cb3dec0bc31587f2bd0631c7b1d525befbe01';
export const BASE_TREE = '8db5d0c3fb51b817c9d416cb64e238af7425e695';
export const PARENTS = {
  eslint: '10.9.1',
  '@eslint/config-array': '0.23.5',
  '@typescript-eslint/typescript-estree': '8.68.0',
};
export const ADDED_PATHS = [
  '.github/workflows/minimatch-resolution.yml',
  'docs/DEPENDENCY-REVIEW-20261110.md',
  'scripts/dependencies/resolve-minimatch-once.mjs',
  'scripts/dependencies/resolve-minimatch-once.test.mjs',
];
const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const PACKAGE_LIMIT = 16_384;
const LOCK_LIMIT = 524_288;
const MINIMATCH = 'node_modules/minimatch';
const MATCHER = 'node_modules/@isaacs/nonrecursive-glob-match';
const SOURCE_PATTERN = /^[a-f0-9]{40}$/u;
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const parse = (bytes) => JSON.parse(bytes.toString('utf8'));
const sorted = (values) => [...values].sort();
const run = (command, args) =>
  execFileSync(command, args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 2_097_152 });
const git = (...args) => run('git', args);
const read = (path, maximum) => {
  const bytes = readFileSync(path);
  assert.ok(bytes.length > 0 && bytes.length <= maximum, 'FILE_SIZE');
  return bytes;
};
const evidenceDirectory = () => {
  assert.ok(isAbsolute(process.env.RUNNER_TEMP || ''), 'RUNNER_TEMP_REQUIRED');
  const directory = join(process.env.RUNNER_TEMP, 'cm-minimatch-review');
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  return directory;
};
const saveJson = (name, value) =>
  writeFileSync(join(evidenceDirectory(), name), JSON.stringify(value, null, 2) + '\n');

export function candidateManifest(original) {
  assert.equal(original.name, 'conference-manager-website', 'PACKAGE_IDENTITY');
  assert.equal(original.devDependencies.eslint, PARENTS.eslint, 'ESLINT_VERSION');
  assert.equal(original.devDependencies['typescript-eslint'], '8.68.0', 'TS_VERSION');
  assert.deepEqual(original.overrides, { devalue: '5.9.4' }, 'EXISTING_OVERRIDE');
  const candidate = JSON.parse(JSON.stringify(original));
  for (const [parent, version] of Object.entries(PARENTS)) {
    candidate.overrides[parent + '@' + version] = { minimatch: '11.0.5' };
  }
  return candidate;
}

function registryRecord(entry, name, version, license) {
  const filename = name.split('/').at(-1) + '-' + version + '.tgz';
  assert.equal(entry.version, version, 'RESOLVED_VERSION');
  assert.equal(entry.resolved, 'https://registry.npmjs.org/' + name + '/-/' + filename);
  assert.equal(entry.dev, true, 'DEV_ONLY');
  assert.equal(entry.license, license, 'REVIEWED_LICENSE');
  assert.ok(!entry.hasInstallScript, 'NO_INSTALL_SCRIPT');
  assert.match(entry.integrity, /^sha512-[A-Za-z0-9+/]+={0,2}$/u, 'REGISTRY_INTEGRITY');
  const integrity = Buffer.from(entry.integrity.slice(7), 'base64');
  assert.equal(integrity.length, 64, 'REGISTRY_SHA512');
  assert.equal('sha512-' + integrity.toString('base64'), entry.integrity);
}

export function validateResolution(original, before, candidate, after) {
  assert.deepEqual(candidate, candidateManifest(original), 'MANIFEST_SCOPE');
  assert.equal(before.lockfileVersion, 3, 'BASE_LOCK_VERSION');
  assert.equal(before.packages[MINIMATCH].version, '10.2.6', 'BASE_MINIMATCH');
  for (const [name, version] of Object.entries(PARENTS)) {
    assert.equal(before.packages['node_modules/' + name].version, version, 'PARENT_VERSION');
  }
  assert.equal(before.packages[MATCHER], undefined, 'NEW_MATCHER_ONLY');
  const beforeMetadata = { ...before };
  const afterMetadata = { ...after };
  delete beforeMetadata.packages;
  delete afterMetadata.packages;
  assert.deepEqual(afterMetadata, beforeMetadata, 'LOCK_METADATA_SCOPE');
  const keys = sorted(new Set([...Object.keys(before.packages), ...Object.keys(after.packages)]));
  const changed = keys.filter(
    (key) => !isDeepStrictEqual(before.packages[key], after.packages[key]),
  );
  assert.deepEqual(changed, sorted([MINIMATCH, MATCHER]), 'LOCK_PACKAGE_SCOPE');
  registryRecord(after.packages[MINIMATCH], 'minimatch', '11.0.5', 'BlueOak-1.0.0');
  registryRecord(
    after.packages[MATCHER],
    '@isaacs/nonrecursive-glob-match',
    '1.1.0',
    'BlueOak-1.0.0',
  );
  assert.deepEqual(after.packages[MINIMATCH].dependencies, {
    '@isaacs/nonrecursive-glob-match': '^1.1.0',
    'brace-expansion': '^5.0.12',
  });
  assert.deepEqual(after.packages[MINIMATCH].engines, { node: '20 || >=22' });
  assert.deepEqual(after.packages[MATCHER].dependencies || {}, {}, 'MATCHER_NO_DEPENDENCIES');
  return changed;
}

export function validateAudit(report) {
  assert.equal(report.auditReportVersion, 2, 'AUDIT_SCHEMA');
  assert.equal(report.error, undefined, 'AUDIT_ERROR');
  assert.deepEqual(report.vulnerabilities, {}, 'NO_VULNERABILITY_IGNORES');
  assert.deepEqual(report.metadata.vulnerabilities, {
    info: 0,
    low: 0,
    moderate: 0,
    high: 0,
    critical: 0,
    total: 0,
  });
}

export function consumerContracts(module) {
  const { Minimatch, minimatch } = module;
  const matcher = new Minimatch('src/**/*.{ts,astro}', { dot: true });
  assert.equal(matcher.pattern, 'src/**/*.{ts,astro}');
  assert.equal(matcher.match('src/config/application.ts'), true);
  assert.equal(matcher.match('src/pages/en/index.astro'), true);
  assert.equal(matcher.match('src/.hidden/example.ts'), true);
  assert.equal(matcher.match('src/config'), false);
  assert.equal(matcher.match('src/config', true), true);
  assert.equal(matcher.match('functions/demo-request/handler.js'), false);
  assert.equal(matcher.match('src/config/application.txt'), false);
  const negated = new Minimatch('!dist/**', { dot: true });
  const flipped = new Minimatch('!dist/**', { dot: true, flipNegate: true });
  assert.equal(negated.match('src/config/application.ts'), true);
  assert.equal(negated.match('dist/index.js'), false);
  assert.equal(flipped.match('dist/index.js'), true);
  assert.equal(flipped.match('src/config/application.ts'), false);
  assert.equal(minimatch('.config.ts', '*.ts', { dot: true }), true);
  assert.equal(minimatch('.config.js', '*.ts', { dot: true }), false);
}

function sourceIdentity() {
  assert.equal(process.env.GITHUB_REPOSITORY, 'floriankreutzer/conference-manager-website');
  assert.equal(process.env.GITHUB_EVENT_NAME, 'push');
  assert.equal(process.env.GITHUB_REF, 'refs/heads/CO-320-minimatch-resolution');
  assert.equal(process.env.RUNNER_ENVIRONMENT, 'github-hosted');
  assert.equal(process.env.RUNNER_OS, 'Linux');
  for (const name of ['GITHUB_TOKEN', 'GH_TOKEN', 'NODE_AUTH_TOKEN', 'NPM_TOKEN']) {
    assert.equal(name in process.env, false, 'NO_PACKAGE_PROCESS_TOKEN');
  }
  assert.equal(process.version, 'v22.22.3');
  const head = git('rev-parse', 'HEAD').trim();
  assert.match(head, SOURCE_PATTERN);
  assert.equal(head, process.env.GITHUB_SHA);
  const lineage = git('rev-list', '--parents', '-n', '1', head).trim().split(' ');
  assert.deepEqual(lineage, [head, BASE_SHA]);
  assert.equal(git('rev-parse', BASE_SHA + '^{tree}').trim(), BASE_TREE);
  const paths = git('diff', '--name-only', '-z', BASE_SHA, head).split('\0').filter(Boolean);
  assert.deepEqual(sorted(paths), sorted(ADDED_PATHS), 'SOURCE_ALLOWLIST');
  for (const path of ADDED_PATHS) {
    const row = git('ls-tree', head, '--', path);
    assert.match(row, /^100644 blob [a-f0-9]{40}\t/u, 'SOURCE_REGULAR_FILE');
    assert.equal(git('ls-tree', BASE_SHA, '--', path), '', 'SOURCE_NEW_PATH');
  }
  return { sourceSha: head, baseSha: BASE_SHA, baseTree: BASE_TREE };
}

function files() {
  return {
    original: JSON.parse(git('show', BASE_SHA + ':package.json')),
    before: JSON.parse(git('show', BASE_SHA + ':package-lock.json')),
    packageBytes: read(join(ROOT, 'package.json'), PACKAGE_LIMIT),
    lockBytes: read(join(ROOT, 'package-lock.json'), LOCK_LIMIT),
  };
}

async function lintInventory() {
  const { ESLint } = await import('eslint');
  const eslint = new ESLint();
  const results = await eslint.lintFiles(['.']);
  assert.ok(results.length > 0, 'REAL_LINT_INVENTORY');
  assert.ok(results.every((result) => result.errorCount === 0), 'LINT_ERRORS');
  const paths = sorted(results.map((result) => relative(ROOT, result.filePath)));
  assert.ok(paths.every((path) => !path.startsWith('..') && !isAbsolute(path)), 'LINT_PATHS');
  for (const path of [
    'src/config/application.ts',
    'src/pages/en/index.astro',
    'eslint.config.js',
    'scripts/dependencies/resolve-minimatch-once.mjs',
  ]) {
    assert.ok(paths.includes(path), 'LINT_REPRESENTATIVE_FILE');
  }
  for (const path of ['dist/ignored.js', 'node_modules/ignored.js', '.astro/ignored.ts']) {
    assert.equal(await eslint.isPathIgnored(path), true, 'LINT_IGNORED_OUTPUT');
  }
  return paths;
}

async function command(mode) {
  const source = sourceIdentity();
  if (mode === 'source') {
    assert.equal(git('status', '--porcelain', '--untracked-files=no'), '', 'CLEAN_SOURCE');
    console.log(JSON.stringify({ scope: 'resolution-source', ...source }));
    return;
  }
  if (mode === 'baseline') {
    const { original, packageBytes } = files();
    assert.deepEqual(parse(packageBytes), original);
    saveJson('lint-before.json', await lintInventory());
    return;
  }
  if (mode === 'resolve') {
    const { original, before, packageBytes, lockBytes } = files();
    assert.deepEqual(parse(packageBytes), original);
    assert.deepEqual(parse(lockBytes), before);
    writeFileSync(
      join(ROOT, 'package.json'),
      JSON.stringify(candidateManifest(original), null, 2) + '\n',
    );
    execFileSync(
      'npm',
      ['install', '--package-lock-only', '--ignore-scripts', '--no-audit', '--no-fund'],
      { cwd: ROOT, stdio: 'inherit', timeout: 180_000 },
    );
    const updated = files();
    const changed = validateResolution(
      original,
      before,
      parse(updated.packageBytes),
      parse(updated.lockBytes),
    );
    console.log(JSON.stringify({ scope: 'npm-generated-lock', ...source, changed }));
    return;
  }
  if (mode === 'installed') {
    const { original, before, packageBytes, lockBytes } = files();
    validateResolution(original, before, parse(packageBytes), parse(lockBytes));
    for (const name of Object.keys(PARENTS)) {
      const loadDependency = createRequire(join(ROOT, 'node_modules', name, 'package.json'));
      const manifest = parse(read(loadDependency.resolve('minimatch/package.json'), PACKAGE_LIMIT));
      assert.equal(manifest.version, '11.0.5', 'EACH_PARENT_RESOLVES_REVIEWED_MINIMATCH');
      consumerContracts(loadDependency('minimatch'));
    }
    const beforePaths = parse(read(join(evidenceDirectory(), 'lint-before.json'), LOCK_LIMIT));
    assert.deepEqual(await lintInventory(), beforePaths, 'IDENTICAL_LINT_COVERAGE');
    console.log(
      JSON.stringify({
        scope: 'installed-consumers',
        parents: PARENTS,
        lintFiles: beforePaths.length,
      }),
    );
    return;
  }
  if (mode === 'audit') {
    validateAudit(parse(read(join(evidenceDirectory(), 'audit.json'), LOCK_LIMIT)));
    return;
  }
  if (mode === 'emit') {
    const { original, before, packageBytes, lockBytes } = files();
    const changed = validateResolution(original, before, parse(packageBytes), parse(lockBytes));
    validateAudit(parse(read(join(evidenceDirectory(), 'audit.json'), LOCK_LIMIT)));
    const modified = git('diff', '--name-only', '-z').split('\0').filter(Boolean);
    const expected = ['package-lock.json', 'package.json'];
    assert.deepEqual(sorted(modified), expected, 'FINAL_TRACKED_SCOPE');
    const output = [
      { name: 'package.json', bytes: packageBytes },
      { name: 'package-lock.json', bytes: lockBytes },
    ];
    const receipt = {
      schemaVersion: 1,
      scope: 'npm-generated-minimatch-review-candidate',
      ...source,
      node: process.version,
      npm: run('npm', ['--version']).trim(),
      advisory: 'GHSA-g3hv-75wg-m249',
      parents: PARENTS,
      changedPackages: changed,
      files: output.map(({ name, bytes }) => ({
        name,
        bytes: bytes.length,
        sha256: digest(bytes),
      })),
      limits: [
        'No repository ref, settings or provider mutation.',
        'Required PR checks and review remain separate.',
      ],
    };
    assert.match(receipt.npm, /^[0-9]+\.[0-9]+\.[0-9]+$/u);
    const total = output.reduce((sum, entry) => sum + entry.bytes.length, 0);
    assert.ok(total <= PACKAGE_LIMIT + LOCK_LIMIT, 'OUTPUT_LIMIT');
    saveJson('resolution.json', receipt);
    for (const { name, bytes } of output) writeFileSync(join(evidenceDirectory(), name), bytes);
    console.log('CM_DEPENDENCY_MANIFEST ' + JSON.stringify(receipt));
    for (const [index, { name, bytes }] of output.entries()) {
      const encoded = bytes.toString('base64');
      console.log(
        'CM_DEPENDENCY_FILE_BEGIN ' +
          JSON.stringify({ index, name, bytes: bytes.length, sha256: digest(bytes) }),
      );
      for (let offset = 0; offset < encoded.length; offset += 3000) {
        console.log(
          'CM_DEPENDENCY_FILE_DATA ' +
            index +
            ' ' +
            offset +
            ' ' +
            encoded.slice(offset, offset + 3000),
        );
      }
      console.log('CM_DEPENDENCY_FILE_END ' + index + ' ' + encoded.length);
    }
    console.log('CM_DEPENDENCY_COMPLETE ' + JSON.stringify({ files: output.length, bytes: total }));
    return;
  }
  throw new Error('UNKNOWN_RESOLUTION_COMMAND');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await command(process.argv[2]);
}
