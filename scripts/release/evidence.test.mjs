import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import { digest, validateProvenance, verifyEvidence } from './provenance.mjs';

const repository = 'floriankreutzer/conference-manager-website';
const commit = 'a'.repeat(40);
const archive = Buffer.from('bounded-source-fixture');
const sbom = Buffer.from(
  JSON.stringify({
    bomFormat: 'CycloneDX',
    specVersion: '1.5',
    version: 1,
    metadata: {
      component: {
        name: 'conference-manager-website',
        version: '0.1.0',
        purl: 'pkg:npm/conference-manager-website@0.1.0',
      },
    },
    components: [],
    dependencies: [],
  }),
);

function fixture() {
  return {
    schemaVersion: 1,
    source: { repository, commit, tree: 'b'.repeat(40), lockSha256: 'c'.repeat(64) },
    build: {
      environment: 'local',
      workflowRef: null,
      workflowSha: null,
      runId: null,
      runAttempt: null,
      createdAt: '2026-10-14T12:00:00.000Z',
      nodeVersion: 'v22.22.3',
      npmVersion: '10.9.4',
    },
    artifact: { name: 'source.tar', kind: 'git-source-archive', sha256: digest(archive) },
    sbom: {
      name: 'sbom.cdx.json',
      format: 'CycloneDX',
      specVersion: '1.5',
      sha256: digest(sbom),
      componentCount: 0,
    },
    counterparts: [],
  };
}

function verify(provenance, extra = {}) {
  return verifyEvidence({
    provenance,
    sbom,
    archive,
    expectedRepository: repository,
    expectedCommit: commit,
    ...extra,
  });
}

test('verifies byte-bound inventory and the independently supplied repository/commit', () => {
  expect(verify(fixture())).toBe(true);
  expect(() => verify(fixture(), { expectedCommit: 'd'.repeat(40) })).toThrow();
  expect(() =>
    verify(fixture(), { expectedRepository: 'floriankreutzer/conference-manager-api' }),
  ).toThrow();
});

test('rejects tampered source and SBOM bytes and changed recorded digests', () => {
  expect(() => verify(fixture(), { archive: Buffer.from('changed') })).toThrow();
  expect(() => verify(fixture(), { sbom: Buffer.from('{}') })).toThrow();
  const p = fixture();
  p.sbom.sha256 = '0'.repeat(64);
  expect(() => verify(p)).toThrow();
});

test('rejects metadata expansion, missing or moving counterpart refs and malformed workflow identity', () => {
  const p = fixture();
  p.build.token = 'synthetic-forbidden-field';
  expect(() => validateProvenance(p)).toThrow();
  const api = fixture();
  api.source.repository = 'floriankreutzer/conference-manager-api';
  expect(() => validateProvenance(api)).toThrow();
  api.counterparts = ['embedded-frontend', 'acceptance-contract'].map((purpose) => ({
    repository: 'floriankreutzer/conference-manager',
    commit: 'main',
    purpose,
  }));
  expect(() => validateProvenance(api)).toThrow();
  const workflow = fixture();
  workflow.build.environment = 'github-actions';
  expect(() => validateProvenance(workflow)).toThrow();
});

test('rejects wrong-component inventory even if its bytes and digest agree', () => {
  const inventory = JSON.parse(sbom.toString());
  inventory.metadata.component.name = 'foreign-component';
  const other = Buffer.from(JSON.stringify(inventory));
  const p = fixture();
  p.sbom.sha256 = digest(other);
  expect(() => verify(p, { sbom: other })).toThrow();
});

test('actual CLI generates and verifies a committed lockfile, then rejects wrong-ref and artifact tampering', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'cm-release-evidence-'));
  const script = fileURLToPath(new URL('./generate.mjs', import.meta.url));
  const env = { ...process.env, GITHUB_ACTIONS: '', GITHUB_SHA: '' };
  const cli = (...args) =>
    spawnSync(process.execPath, [script, ...args], {
      cwd: root,
      env,
      encoding: 'utf8',
      timeout: 20_000,
      maxBuffer: 64 * 1024,
    });
  try {
    const pkg = { name: 'conference-manager-website', version: '0.1.0', private: true };
    writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg));
    writeFileSync(
      path.join(root, 'package-lock.json'),
      JSON.stringify({
        name: pkg.name,
        version: pkg.version,
        lockfileVersion: 3,
        requires: true,
        packages: { '': pkg },
      }),
    );
    const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe', timeout: 5000 });
    git('init');
    git('add', 'package.json', 'package-lock.json');
    git(
      '-c',
      'user.name=Release test',
      '-c',
      'user.email=release-test@example.invalid',
      'commit',
      '-m',
      'Synthetic inventory fixture',
    );
    const sha = git('rev-parse', 'HEAD').toString().trim();
    const generated = cli('generate', repository);
    expect(generated.status, generated.stderr).toBe(0);
    expect(cli('verify', repository, sha).status).toBe(0);
    expect(cli('verify', repository, 'f'.repeat(40)).status).not.toBe(0);
    const sbomFile = path.join(root, 'release-evidence/sbom.cdx.json');
    const provenanceFile = path.join(root, 'release-evidence/provenance.json');
    const originalInventory = readFileSync(sbomFile);
    const originalProvenance = readFileSync(provenanceFile);
    for (const mutation of ['version', 'graph']) {
      const inventory = JSON.parse(originalInventory);
      if (mutation === 'version') {
        inventory.metadata.component.version = '999.0.0';
        inventory.metadata.component.purl = 'pkg:npm/conference-manager-website@999.0.0';
      } else {
        inventory.components.push({
          type: 'library',
          name: 'synthetic-extra',
          version: '1.0.0',
          'bom-ref': 'synthetic-extra@1.0.0',
        });
        inventory.dependencies[0].dependsOn.push('synthetic-extra@1.0.0');
      }
      const forged = Buffer.from(JSON.stringify(inventory));
      const binding = JSON.parse(originalProvenance);
      binding.sbom.sha256 = digest(forged);
      binding.sbom.componentCount = inventory.components.length;
      writeFileSync(sbomFile, forged);
      writeFileSync(provenanceFile, JSON.stringify(binding));
      expect(cli('verify', repository, sha).status).not.toBe(0);
    }
    writeFileSync(sbomFile, originalInventory);
    writeFileSync(provenanceFile, originalProvenance);
    const sourceFile = path.join(root, 'release-evidence/source.tar');
    const original = readFileSync(sourceFile);
    const changed = Buffer.from(original);
    changed[0] ^= 1;
    writeFileSync(sourceFile, changed);
    expect(cli('verify', repository, sha).status).not.toBe(0);
    writeFileSync(sourceFile, original);
    const p = JSON.parse(readFileSync(provenanceFile));
    const originalTree = p.source.tree;
    p.source.tree = '0'.repeat(40);
    writeFileSync(provenanceFile, JSON.stringify(p));
    expect(cli('verify', repository, sha).status).not.toBe(0);
    p.source.tree = originalTree;
    p.source.lockSha256 = '0'.repeat(64);
    writeFileSync(provenanceFile, JSON.stringify(p));
    expect(cli('verify', repository, sha).status).not.toBe(0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}, 60_000);
