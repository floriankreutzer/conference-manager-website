import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';

const requiredLanguages = new Set(['en', 'de']);
const requiredAssetFields = [
  'family',
  'filename',
  'style',
  'weight',
  'upstreamSource',
  'version',
  'sourceCommit',
  'acquisitionDate',
  'sha256',
  'license',
  'licenseFile',
  'languageCoverage',
  'modificationState',
  'reviewer',
];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateAssetMetadata(asset, approvedFamilies) {
  for (const field of requiredAssetFields) {
    requireCondition(asset[field] !== undefined, `Font manifest asset is missing ${field}`);
  }

  requireCondition(approvedFamilies.has(asset.family), `Unapproved font family: ${asset.family}`);
  requireCondition(
    isNonEmptyString(asset.filename) && basename(asset.filename) === asset.filename,
    'Font filename must be a simple repository filename',
  );
  requireCondition(asset.filename.toLowerCase().endsWith('.woff2'), 'Font assets must use WOFF2');
  requireCondition(isNonEmptyString(asset.style), `Missing style for ${asset.filename}`);
  requireCondition(isNonEmptyString(asset.weight), `Missing weight for ${asset.filename}`);

  const source = new URL(asset.upstreamSource);
  requireCondition(
    source.protocol === 'https:',
    `Upstream source must use HTTPS for ${asset.filename}`,
  );
  requireCondition(isNonEmptyString(asset.version), `Missing version for ${asset.filename}`);
  requireCondition(
    /^[0-9a-f]{40}$/i.test(asset.sourceCommit),
    `Source commit must be a full Git SHA for ${asset.filename}`,
  );
  requireCondition(
    /^\d{4}-\d{2}-\d{2}$/.test(asset.acquisitionDate),
    `Acquisition date must use YYYY-MM-DD for ${asset.filename}`,
  );
  requireCondition(
    /^[0-9a-f]{64}$/i.test(asset.sha256),
    `SHA-256 must contain 64 hexadecimal characters for ${asset.filename}`,
  );
  requireCondition(asset.license === 'OFL-1.1', `License must be OFL-1.1 for ${asset.filename}`);
  requireCondition(
    isNonEmptyString(asset.licenseFile) && basename(asset.licenseFile) === asset.licenseFile,
    `License file must be a simple repository filename for ${asset.filename}`,
  );
  requireCondition(
    Array.isArray(asset.languageCoverage) &&
      [...requiredLanguages].every((language) => asset.languageCoverage.includes(language)),
    `English and German language coverage is required for ${asset.filename}`,
  );
  requireCondition(
    isNonEmptyString(asset.modificationState),
    `Missing modification state for ${asset.filename}`,
  );
  requireCondition(isNonEmptyString(asset.reviewer), `Missing reviewer for ${asset.filename}`);
}

async function sha256(path) {
  const bytes = await readFile(path);
  return createHash('sha256').update(bytes).digest('hex');
}

export async function verifyFontAssets({ fontDirectory = 'src/assets/fonts' } = {}) {
  const manifestPath = join(fontDirectory, 'manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const entries = await readdir(fontDirectory, { withFileTypes: true });
  const woff2Files = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.woff2'))
    .map((entry) => entry.name)
    .sort();

  requireCondition(manifest.schemaVersion === 1, 'Unsupported font manifest schema version');
  requireCondition(
    manifest.status === 'pending' || manifest.status === 'accepted',
    'Font manifest status must be pending or accepted',
  );
  requireCondition(
    Array.isArray(manifest.approvedFamilies) && manifest.approvedFamilies.length > 0,
    'Font manifest must define approved families',
  );
  requireCondition(Array.isArray(manifest.assets), 'Font manifest assets must be an array');

  if (manifest.status === 'pending') {
    requireCondition(manifest.assets.length === 0, 'Pending font manifest must not declare assets');
    requireCondition(
      woff2Files.length === 0,
      'WOFF2 files are prohibited while font status is pending',
    );
    return { status: 'pending', files: [] };
  }

  requireCondition(manifest.assets.length > 0, 'Accepted font manifest must declare assets');
  const approvedFamilies = new Set(manifest.approvedFamilies);
  const declaredFiles = [];

  for (const asset of manifest.assets) {
    validateAssetMetadata(asset, approvedFamilies);
    requireCondition(
      !declaredFiles.includes(asset.filename),
      `Duplicate font asset: ${asset.filename}`,
    );
    declaredFiles.push(asset.filename);

    const filePath = join(fontDirectory, asset.filename);
    const licensePath = join(fontDirectory, asset.licenseFile);
    requireCondition(
      entries.some((entry) => entry.isFile() && entry.name === asset.filename),
      `Declared font file is missing: ${asset.filename}`,
    );
    requireCondition(
      entries.some((entry) => entry.isFile() && entry.name === asset.licenseFile),
      `Declared license file is missing: ${asset.licenseFile}`,
    );
    await readFile(licensePath, 'utf8');
    requireCondition(
      (await sha256(filePath)) === asset.sha256.toLowerCase(),
      `SHA-256 mismatch for ${asset.filename}`,
    );
  }

  declaredFiles.sort();
  requireCondition(
    JSON.stringify(declaredFiles) === JSON.stringify(woff2Files),
    'Every WOFF2 file must be declared exactly once in the accepted manifest',
  );

  for (const family of approvedFamilies) {
    requireCondition(
      manifest.assets.some((asset) => asset.family === family),
      `Accepted manifest is missing approved family: ${family}`,
    );
  }

  return { status: 'accepted', files: declaredFiles };
}
