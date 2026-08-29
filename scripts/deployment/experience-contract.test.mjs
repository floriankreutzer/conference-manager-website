import { describe, expect, it } from 'vitest';
import { assertDeliveredExperience, median } from './experience-contract.mjs';

describe('delivered experience contract', () => {
  it('computes a median without mutating the samples', () => {
    const samples = [2400, 1200, 1800];
    expect(median(samples)).toBe(1800);
    expect(samples).toEqual([2400, 1200, 1800]);
  });

  it('accepts good lab metrics, same-origin fonts and 200% reflow', () => {
    expect(
      assertDeliveredExperience({
        lcpSamples: [1900, 2100, 2200],
        clsByRoute: { '/en/': 0.02, '/de/': 0.03 },
        externalFontRequests: [],
        reflow: {
          primaryHeadingVisible: true,
          primaryActionVisible: true,
          scrollWidth: 640,
          clientWidth: 640,
        },
      }),
    ).toMatchObject({ medianLcp: 2100 });
  });

  it('fails closed on slow LCP, excessive CLS, external fonts or broken reflow', () => {
    const baseline = {
      lcpSamples: [1900, 2100, 2200],
      clsByRoute: { '/en/': 0.02, '/de/': 0.03 },
      externalFontRequests: [],
      reflow: {
        primaryHeadingVisible: true,
        primaryActionVisible: true,
        scrollWidth: 640,
        clientWidth: 640,
      },
    };

    expect(() =>
      assertDeliveredExperience({ ...baseline, lcpSamples: [2600, 2700, 2800] }),
    ).toThrow(/LCP/);
    expect(() =>
      assertDeliveredExperience({ ...baseline, clsByRoute: { '/en/': 0.11 } }),
    ).toThrow(/CLS/);
    expect(() =>
      assertDeliveredExperience({
        ...baseline,
        externalFontRequests: ['https://fonts.example.test/font.woff2'],
      }),
    ).toThrow(/external fonts/);
    expect(() =>
      assertDeliveredExperience({
        ...baseline,
        reflow: { ...baseline.reflow, scrollWidth: 700 },
      }),
    ).toThrow(/horizontal overflow/);
  });
});
