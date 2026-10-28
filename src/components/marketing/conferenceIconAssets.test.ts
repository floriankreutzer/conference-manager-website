import { describe, expect, it } from 'vitest';
import {
  PAVUREL_ICON_NAMES,
  PAVUREL_ICON_VARIANTS,
  pavurelIconAsset,
} from './conferenceIconAssets';
import { withBasePath } from '../../domain/routing/basePath';

describe('closed Website icon paths', () => {
  it('covers all32 names and three variants using local paths', () => {
    expect(PAVUREL_ICON_NAMES).toHaveLength(32);
    expect(PAVUREL_ICON_VARIANTS).toHaveLength(3);
    for (const name of PAVUREL_ICON_NAMES) {
      for (const variant of PAVUREL_ICON_VARIANTS) {
        expect(pavurelIconAsset(name, variant)).toBe(
          `/assets/pavurel-icons/v0.1/${variant}/${name}.svg`,
        );
      }
    }
  });

  it('rejects unknown names, traversal, external paths and variants', () => {
    for (const name of ['../request', 'https://example.test/icon', '', null, {}]) {
      expect(() => pavurelIconAsset(name)).toThrow('PAVUREL_ICON_INVALID');
    }
    for (const variant of ['../light', 'currentColor', null, {}]) {
      expect(() => pavurelIconAsset('request', variant)).toThrow('PAVUREL_ICON_INVALID');
    }
  });

  it('retains the central deployment base path', () => {
    expect(withBasePath(pavurelIconAsset('request'), '/preview/')).toBe(
      '/preview/assets/pavurel-icons/v0.1/light/request.svg',
    );
  });
});
