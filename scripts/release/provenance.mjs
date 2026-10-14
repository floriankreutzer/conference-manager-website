import { createHash } from 'node:crypto';

const SHA = /^[a-f0-9]{40}$/;
const DIGEST = /^[a-f0-9]{64}$/;
export function isCommit(value) {
  return typeof value === 'string' && value.length === 40 && SHA.test(value);
}
const REPOSITORIES = new Set([
  'floriankreutzer/conference-manager',
  'floriankreutzer/conference-manager-api',
  'floriankreutzer/conference-manager-website',
]);

export function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function requireCondition(condition) {
  if (!condition) throw new Error('RELEASE_EVIDENCE_INVALID');
}

function keys(value, expected) {
  requireCondition(value && typeof value === 'object' && !Array.isArray(value));
  requireCondition(Object.keys(value).sort().join(',') === [...expected].sort().join(','));
}

export function validateProvenance(value) {
  keys(value, ['schemaVersion', 'source', 'build', 'artifact', 'sbom', 'counterparts']);
  requireCondition(value.schemaVersion === 1);
  keys(value.source, ['repository', 'commit', 'tree', 'lockSha256']);
  requireCondition(REPOSITORIES.has(value.source.repository));
  requireCondition(isCommit(value.source.commit) && isCommit(value.source.tree));
  requireCondition(DIGEST.test(value.source.lockSha256));
  keys(value.build, [
    'environment',
    'workflowRef',
    'workflowSha',
    'runId',
    'runAttempt',
    'createdAt',
    'nodeVersion',
    'npmVersion',
  ]);
  const build = value.build;
  requireCondition(['local', 'github-actions'].includes(build.environment));
  requireCondition(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(build.createdAt));
  requireCondition(Number.isFinite(Date.parse(build.createdAt)));
  requireCondition(/^v\d+\.\d+\.\d+$/.test(build.nodeVersion));
  requireCondition(/^\d+\.\d+\.\d+$/.test(build.npmVersion));
  if (build.environment === 'github-actions') {
    requireCondition(
      typeof build.workflowRef === 'string' &&
        build.workflowRef.startsWith(`${value.source.repository}/.github/workflows/`),
    );
    requireCondition(/^[a-zA-Z0-9_./@-]{1,300}$/.test(build.workflowRef));
    requireCondition(isCommit(build.workflowSha));
    requireCondition(
      /^[1-9]\d{0,19}$/.test(build.runId) && /^[1-9]\d{0,5}$/.test(build.runAttempt),
    );
  } else {
    requireCondition(
      [build.workflowRef, build.workflowSha, build.runId, build.runAttempt].every(
        (v) => v === null,
      ),
    );
  }
  keys(value.artifact, ['name', 'kind', 'sha256']);
  requireCondition(
    value.artifact.name === 'source.tar' &&
      value.artifact.kind === 'git-source-archive' &&
      DIGEST.test(value.artifact.sha256),
  );
  keys(value.sbom, ['name', 'format', 'specVersion', 'sha256', 'componentCount']);
  requireCondition(
    value.sbom.name === 'sbom.cdx.json' &&
      value.sbom.format === 'CycloneDX' &&
      value.sbom.specVersion === '1.5',
  );
  requireCondition(
    DIGEST.test(value.sbom.sha256) &&
      Number.isSafeInteger(value.sbom.componentCount) &&
      value.sbom.componentCount >= 0 &&
      value.sbom.componentCount <= 5000,
  );
  requireCondition(Array.isArray(value.counterparts) && value.counterparts.length <= 4);
  const purposes = value.counterparts
    .map((ref) => ref.purpose)
    .sort()
    .join(',');
  const requiredPurposes = value.source.repository.endsWith('-api')
    ? 'acceptance-contract,embedded-frontend'
    : value.source.repository.endsWith('-website')
      ? ''
      : 'paired-api';
  requireCondition(purposes === requiredPurposes);
  for (const ref of value.counterparts) {
    keys(ref, ['repository', 'commit', 'purpose']);
    requireCondition(REPOSITORIES.has(ref.repository) && isCommit(ref.commit));
    requireCondition(
      ['embedded-frontend', 'acceptance-contract', 'paired-api'].includes(ref.purpose),
    );
  }
  return value;
}

export function verifyEvidence({ provenance, sbom, archive, expectedRepository, expectedCommit }) {
  validateProvenance(provenance);
  requireCondition(REPOSITORIES.has(expectedRepository) && isCommit(expectedCommit));
  requireCondition(
    provenance.source.repository === expectedRepository &&
      provenance.source.commit === expectedCommit,
  );
  requireCondition(
    Buffer.isBuffer(archive) && archive.length > 0 && archive.length <= 64 * 1024 * 1024,
  );
  requireCondition(Buffer.isBuffer(sbom) && sbom.length > 0 && sbom.length <= 16 * 1024 * 1024);
  requireCondition(
    digest(archive) === provenance.artifact.sha256 && digest(sbom) === provenance.sbom.sha256,
  );
  const inventory = JSON.parse(sbom.toString('utf8'));
  requireCondition(
    inventory.bomFormat === 'CycloneDX' &&
      inventory.specVersion === '1.5' &&
      inventory.version === 1,
  );
  requireCondition(
    Array.isArray(inventory.components) &&
      inventory.components.length === provenance.sbom.componentCount,
  );
  requireCondition(inventory.metadata?.component?.name && inventory.metadata?.component?.version);
  requireCondition(inventory.metadata.component.name === expectedRepository.split('/')[1]);
  requireCondition(
    inventory.metadata.component.purl ===
      `pkg:npm/${inventory.metadata.component.name}@${inventory.metadata.component.version}`,
  );
  requireCondition(Array.isArray(inventory.dependencies));
  return true;
}
