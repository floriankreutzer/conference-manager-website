import { execFile } from 'node:child_process';
import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { digest, validateProvenance, verifyEvidence } from './provenance.mjs';

const exec = promisify(execFile);
const repository = process.argv[3];
const mode = process.argv[2];
const output = 'release-evidence';
const shaPattern = /^[a-f0-9]{40}$/;
const allowed = [
  'floriankreutzer/conference-manager',
  'floriankreutzer/conference-manager-api',
  'floriankreutzer/conference-manager-website',
];

async function command(binary, args, maxBuffer = 1024 * 1024) {
  const result = await exec(binary, args, { encoding: 'buffer', maxBuffer, timeout: 60_000 });
  return result.stdout;
}

async function gitText(args) {
  return (await command('git', args)).toString('utf8').trim();
}

async function evidenceFile(name, limit) {
  const file = `${output}/${name}`;
  const info = await lstat(file);
  if (!info.isFile() || info.size < 1 || info.size > limit)
    throw new Error('EVIDENCE_FILE_INVALID');
  return readFile(file);
}

async function counterparts(commit) {
  if (repository.endsWith('-website')) return [];
  const workflow = await gitText(['show', `${commit}:.github/workflows/ci.yml`]);
  if (repository.endsWith('-api')) {
    const render = await gitText(['show', `${commit}:render.yaml`]);
    const refs = [...render.matchAll(/key: DEMO_FRONTEND_REF\s+value: ([a-f0-9]{40})/g)].map(
      (m) => m[1],
    );
    const gitlink = await gitText(['ls-tree', commit, 'vendor/demo-frontend']);
    const match = /^160000 commit ([a-f0-9]{40})\tvendor\/demo-frontend$/.exec(gitlink);
    const acceptance = [...workflow.matchAll(/ACCEPTANCE_REF: ([a-f0-9]{40})/g)].map((m) => m[1]);
    if (
      refs.length !== 2 ||
      new Set(refs).size !== 1 ||
      !match ||
      match[1] !== refs[0] ||
      new Set(acceptance).size !== 1
    )
      throw new Error('COUNTERPART_INVALID');
    return [
      {
        repository: 'floriankreutzer/conference-manager',
        commit: refs[0],
        purpose: 'embedded-frontend',
      },
      {
        repository: 'floriankreutzer/conference-manager',
        commit: acceptance[0],
        purpose: 'acceptance-contract',
      },
    ];
  }
  const refs = [
    ...workflow.matchAll(
      /repository: floriankreutzer\/conference-manager-api\s+ref: ([a-f0-9]{40})/g,
    ),
  ].map((m) => m[1]);
  if (new Set(refs).size !== 1) throw new Error('COUNTERPART_INVALID');
  return [
    {
      repository: 'floriankreutzer/conference-manager-api',
      commit: refs[0],
      purpose: 'paired-api',
    },
  ];
}

async function run() {
  if (!allowed.includes(repository) || !['generate', 'verify'].includes(mode))
    throw new Error('ARGUMENT_INVALID');
  const commit = await gitText(['rev-parse', 'HEAD']);
  if (!shaPattern.test(commit)) throw new Error('SOURCE_INVALID');
  const expected = mode === 'verify' ? process.argv[4] : process.env.GITHUB_SHA || commit;
  if (!shaPattern.test(expected) || expected !== commit) throw new Error('SOURCE_MISMATCH');
  await command('git', ['diff', '--exit-code', 'HEAD', '--', 'package.json', 'package-lock.json']);
  const archive = await command('git', ['archive', '--format=tar', commit], 64 * 1024 * 1024);
  const lock = await command('git', ['show', `${commit}:package-lock.json`], 16 * 1024 * 1024);
  const refs = await counterparts(commit);
  if (mode === 'verify') {
    const provenance = JSON.parse(
      (await evidenceFile('provenance.json', 64 * 1024)).toString('utf8'),
    );
    const actualArchive = await evidenceFile('source.tar', 64 * 1024 * 1024);
    const sbom = await evidenceFile('sbom.cdx.json', 16 * 1024 * 1024);
    verifyEvidence({
      provenance,
      archive: actualArchive,
      sbom,
      expectedRepository: repository,
      expectedCommit: expected,
    });
    if (
      digest(archive) !== provenance.artifact.sha256 ||
      digest(lock) !== provenance.source.lockSha256 ||
      JSON.stringify(refs) !== JSON.stringify(provenance.counterparts)
    )
      throw new Error('SOURCE_CONTENT_MISMATCH');
    process.stdout.write('Verified source, lockfile, counterpart refs and evidence digests.\n');
    return;
  }
  const rawSbom = await command(
    'npm',
    [
      'sbom',
      '--package-lock-only',
      '--sbom-format=cyclonedx',
      '--sbom-type=application',
      '--include=dev',
      '--include=optional',
      '--include=peer',
      '--ignore-scripts',
    ],
    16 * 1024 * 1024,
  );
  const inventory = JSON.parse(rawSbom.toString('utf8'));
  const pkg = JSON.parse(await gitText(['show', `${commit}:package.json`]));
  if (
    pkg.name !== repository.split('/')[1] ||
    inventory.metadata?.component?.purl !== `pkg:npm/${pkg.name}@${pkg.version}`
  )
    throw new Error('SBOM_COMPONENT_MISMATCH');
  // npm can use the checkout directory as the root display name; retain source package identity.
  inventory.metadata.component.name = pkg.name;
  const sbom = Buffer.from(`${JSON.stringify(inventory, null, 2)}\n`);
  const inActions = process.env.GITHUB_ACTIONS === 'true';
  const provenance = validateProvenance({
    schemaVersion: 1,
    source: {
      repository,
      commit,
      tree: await gitText(['rev-parse', 'HEAD^{tree}']),
      lockSha256: digest(lock),
    },
    build: {
      environment: inActions ? 'github-actions' : 'local',
      workflowRef: inActions ? process.env.GITHUB_WORKFLOW_REF : null,
      workflowSha: inActions ? process.env.GITHUB_WORKFLOW_SHA : null,
      runId: inActions ? process.env.GITHUB_RUN_ID : null,
      runAttempt: inActions ? process.env.GITHUB_RUN_ATTEMPT : null,
      createdAt: new Date().toISOString(),
      nodeVersion: process.version,
      npmVersion: (await command('npm', ['--version'])).toString('utf8').trim(),
    },
    artifact: { name: 'source.tar', kind: 'git-source-archive', sha256: digest(archive) },
    sbom: {
      name: 'sbom.cdx.json',
      format: inventory.bomFormat,
      specVersion: inventory.specVersion,
      sha256: digest(sbom),
      componentCount: inventory.components?.length,
    },
    counterparts: refs,
  });
  verifyEvidence({
    provenance,
    archive,
    sbom,
    expectedRepository: repository,
    expectedCommit: expected,
  });
  await mkdir(output, { mode: 0o700 });
  for (const [name, bytes] of [
    ['source.tar', archive],
    ['sbom.cdx.json', sbom],
    ['provenance.json', `${JSON.stringify(provenance, null, 2)}\n`],
  ]) {
    await writeFile(`${output}/${name}`, bytes, { flag: 'wx', mode: 0o600 });
  }
  process.stdout.write(`Generated verified lockfile inventory for ${repository}@${commit}.\n`);
}

run().catch(() => {
  process.stderr.write('Release evidence generation/verification failed closed.\n');
  process.exitCode = 1;
});
