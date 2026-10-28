import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  PAVUREL_ICON_NAMES,
  PAVUREL_ICON_VARIANTS,
  pavurelIconAsset,
} from '../../src/components/marketing/conferenceIconAssets.ts';

const manifest = JSON.parse(readFileSync('public/assets/pavurel-icons/v0.1/manifest.json', 'utf8'));

describe('canonical local functional icon bytes', () => {
  it('retains all names and all96 immutable variant hashes without active SVG content', () => {
    expect([...PAVUREL_ICON_NAMES].sort()).toEqual(manifest.icons.map((icon) => icon.name).sort());
    let count = 0;
    for (const icon of manifest.icons) {
      for (const variant of PAVUREL_ICON_VARIANTS) {
        const file = icon.files[variant];
        const path = pavurelIconAsset(icon.name, variant);
        expect(path).toBe('/assets/pavurel-icons/v0.1/' + file.path);
        const svg = readFileSync('public' + path, 'utf8');
        expect(createHash('sha256').update(svg).digest('hex')).toBe(file.sha256);
        expect(svg).toContain('viewBox="0 0 24 24"');
        expect(svg).not.toMatch(
          /<(?:script|foreignObject|style)\b|\bon[a-z]+\s*=|\b(?:href|src)\s*=|url\s*\(/i,
        );
        count += 1;
      }
    }
    expect(count).toBe(96);
  });

  it('keeps the six original Website geometries unchanged', () => {
    for (const name of [
      'request',
      'participants',
      'room-equipment',
      'catering',
      'changes',
      'coordination',
    ]) {
      expect(readFileSync('public' + pavurelIconAsset(name))).toEqual(
        readFileSync('public/assets/icons/' + name + '.svg'),
      );
    }
  });
});
