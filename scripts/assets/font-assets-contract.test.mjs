import { createHash } from 'node:crypto';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { verifyFontAssets } from './font-assets-contract.mjs';

async function tempFontDirectory() {
  return mkdtemp(join(tmpdir(), 'conference-manager-fonts-'));
}

async function writeManifest(directory, manifest) {
  await writeFile(join(directory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

function acceptedAsset(filename, sha256, overrides = {}) {
  return {
    family: 'Inter',
    filename,
    style: 'normal',
    weight: '100 900',
    upstreamSource: 'https://github.com/rsms/inter',
    version: 'test-version',
    sourceCommit: '0123456789abcdef0123456789abcdef01234567',
    acquisitionDate: '2026-08-29',
    sha256,
    license: 'OFL-1.1',
    licenseFile: 'LICENSE-INTER.txt',
    languageCoverage: ['en', 'de'],
    modificationState: 'unmodified',
    reviewer: 'test-reviewer',
    ...overrides,
  };
}

describe('font asset governance', () => {
  it('accepts pending status only when no WOFF2 file exists', async () => {
    const directory = await tempFontDirectory();
    await writeManifest(directory, {
      schemaVersion: 1,
      status: 'pending',
      approvedFamilies: ['Manrope', 'Inter'],
      assets: [],
    });

    await expect(verifyFontAssets({ fontDirectory: directory })).resolves.toEqual({
      status: 'pending',
      files: [],
    });
  });

  it('rejects an undeclared WOFF2 file while governance is pending', async () => {
    const directory = await tempFontDirectory();
    await writeManifest(directory, {
      schemaVersion: 1,
      status: 'pending',
      approvedFamilies: ['Manrope', 'Inter'],
      assets: [],
    });
    await writeFile(join(directory, 'unapproved.woff2'), 'not-a-real-font');

    await expect(verifyFontAssets({ fontDirectory: directory })).rejects.toThrow(/prohibited/);
  });

  it('verifies accepted files, provenance fields, licenses and hashes', async () => {
    const directory = await tempFontDirectory();
    const interBytes = Buffer.from('synthetic-inter-font');
    const manropeBytes = Buffer.from('synthetic-manrope-font');
    const interHash = createHash('sha256').update(interBytes).digest('hex');
    const manropeHash = createHash('sha256').update(manropeBytes).digest('hex');

    await writeFile(join(directory, 'inter.woff2'), interBytes);
    await writeFile(join(directory, 'manrope.woff2'), manropeBytes);
    await writeFile(join(directory, 'LICENSE-INTER.txt'), 'OFL test license');
    await writeFile(join(directory, 'LICENSE-MANROPE.txt'), 'OFL test license');
    await writeManifest(directory, {
      schemaVersion: 1,
      status: 'accepted',
      approvedFamilies: ['Manrope', 'Inter'],
      assets: [
        acceptedAsset('inter.woff2', interHash),
        acceptedAsset('manrope.woff2', manropeHash, {
          family: 'Manrope',
          upstreamSource: 'https://github.com/aaronbell/manrope',
          licenseFile: 'LICENSE-MANROPE.txt',
        }),
      ],
    });

    await expect(verifyFontAssets({ fontDirectory: directory })).resolves.toEqual({
      status: 'accepted',
      files: ['inter.woff2', 'manrope.woff2'],
    });
  });

  it('rejects a hash mismatch', async () => {
    const directory = await tempFontDirectory();
    await writeFile(join(directory, 'inter.woff2'), 'unexpected bytes');
    await writeFile(join(directory, 'LICENSE-INTER.txt'), 'OFL test license');
    await writeManifest(directory, {
      schemaVersion: 1,
      status: 'accepted',
      approvedFamilies: ['Inter'],
      assets: [acceptedAsset('inter.woff2', '0'.repeat(64))],
    });

    await expect(verifyFontAssets({ fontDirectory: directory })).rejects.toThrow(/SHA-256 mismatch/);
  });

  it('rejects accepted metadata without English and German coverage', async () => {
    const directory = await tempFontDirectory();
    const bytes = Buffer.from('synthetic-inter-font');
    const hash = createHash('sha256').update(bytes).digest('hex');
    await writeFile(join(directory, 'inter.woff2'), bytes);
    await writeFile(join(directory, 'LICENSE-INTER.txt'), 'OFL test license');
    await writeManifest(directory, {
      schemaVersion: 1,
      status: 'accepted',
      approvedFamilies: ['Inter'],
      assets: [acceptedAsset('inter.woff2', hash, { languageCoverage: ['en'] })],
    });

    await expect(verifyFontAssets({ fontDirectory: directory })).rejects.toThrow(
      /English and German/,
    );
  });
});
