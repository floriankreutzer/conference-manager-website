import { expect, test } from 'vitest';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applicationCounterparts, apiCounterparts } from './counterparts.mjs';

const app = 'floriankreutzer/conference-manager';
const api = 'floriankreutzer/conference-manager-api';
const ref = 'a'.repeat(40);
const acceptance = 'b'.repeat(40);
const checkout = 'actions/checkout@' + 'c'.repeat(40);

function applicationWorkflow(value = ref) {
  return `jobs:\n  shared:\n    steps:\n      - uses: ${checkout}\n        with:\n          repository: ${api}\n          ref: ${value}\n# repository: ${api} ref: ${ref}\n`;
}

function apiFixture() {
  return {
    workflow: `jobs:\n  shared:\n    steps:\n      - uses: ${checkout}\n        with:\n          repository: ${app}\n          path: frontend\n          ref: ${ref}\n      - uses: ${checkout}\n        with:\n          repository: ${app}\n          path: acceptance\n          ref: ${acceptance}\n`,
    render: `services:\n  - name: customer\n    envVars:\n      - key: DEMO_FRONTEND_REF\n        value: ${ref}\n  - name: operations\n    envVars:\n      - key: DEMO_FRONTEND_REF\n        value: ${ref}\n`,
    gitlink: `160000 commit ${ref}\tvendor/demo-frontend`,
  };
}

test('records actual fixed checkout refs and ignores a stale YAML comment', () => {
  expect(applicationCounterparts(applicationWorkflow())).toEqual([
    { repository: api, commit: ref, purpose: 'paired-api' },
  ]);
  expect(() => applicationCounterparts(applicationWorkflow('main'))).toThrow();
  expect(() => applicationCounterparts(applicationWorkflow('refs/heads/main'))).toThrow();
  expect(() => applicationCounterparts(applicationWorkflow(JSON.stringify(ref + '\n')))).toThrow();
});

test('rejects duplicate YAML keys, aliases and a second moving checkout', () => {
  expect(() =>
    applicationCounterparts(
      applicationWorkflow().replace(`ref: ${ref}`, `ref: ${ref}\n          ref: main`),
    ),
  ).toThrow();
  expect(() => applicationCounterparts('jobs: &jobs\n  shared: *jobs\n')).toThrow();
  const second = applicationWorkflow().replace(
    `# repository: ${api} ref: ${ref}`,
    `      - uses: ${checkout}\n        with:\n          repository: ${api}\n          ref: main`,
  );
  expect(() => applicationCounterparts(second)).toThrow();
});

test('binds both effective render values, Gitlink and the actual acceptance checkout', () => {
  expect(apiCounterparts(apiFixture())).toEqual([
    { repository: app, commit: ref, purpose: 'embedded-frontend' },
    { repository: app, commit: acceptance, purpose: 'acceptance-contract' },
  ]);
  const dynamic = apiFixture();
  dynamic.workflow = dynamic.workflow.replace(
    `ref: ${ref}`,
    'ref: ${{ steps.frontend_ref.outputs.ref }}',
  );
  dynamic.workflow +=
    '\n# frontend_ref may emit main or a foreign SHA; unresolved producers are never accepted.\n';
  expect(() => apiCounterparts(dynamic)).toThrow();
  const moving = apiFixture();
  moving.workflow = moving.workflow.replace(`ref: ${acceptance}`, 'ref: main');
  moving.workflow += `\n# ACCEPTANCE_REF: ${acceptance}\n`;
  expect(() => apiCounterparts(moving)).toThrow();
  const stale = apiFixture();
  stale.render = stale.render.replace(`value: ${ref}`, 'value: main');
  stale.render += `\n# key: DEMO_FRONTEND_REF value: ${ref}\n`;
  expect(() => apiCounterparts(stale)).toThrow();
  const link = apiFixture();
  link.gitlink = `160000 commit ${acceptance}\tvendor/demo-frontend`;
  expect(() => apiCounterparts(link)).toThrow();
});

test('actual CLI rejects a moving checkout hidden by a fixed-ref comment, then accepts the repaired source', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'cm-counterpart-evidence-'));
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
  const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe', timeout: 5000 });
  const save = (value) => {
    writeFileSync(path.join(root, '.github/workflows/ci.yml'), applicationWorkflow(value));
    git('add', 'package.json', 'package-lock.json', '.github/workflows/ci.yml');
    git(
      '-c',
      'user.name=Release test',
      '-c',
      'user.email=release-test@example.invalid',
      'commit',
      '-m',
      'Synthetic counterpart fixture',
    );
  };
  try {
    const pkg = { name: 'conference-manager', version: '1.0.0', private: true };
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
    mkdirSync(path.join(root, '.github/workflows'), { recursive: true });
    git('init');
    save(ref);
    const positive = cli('generate', app);
    expect(positive.status, positive.stderr).toBe(0);
    rmSync(path.join(root, 'release-evidence'), { recursive: true, force: true });
    save('main');
    expect(cli('generate', app).status).not.toBe(0);
    expect(existsSync(path.join(root, 'release-evidence'))).toBe(false);
    save(acceptance);
    const repaired = cli('generate', app);
    expect(repaired.status, repaired.stderr).toBe(0);
    expect(cli('verify', app, git('rev-parse', 'HEAD').toString().trim()).status).toBe(0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}, 60_000);
