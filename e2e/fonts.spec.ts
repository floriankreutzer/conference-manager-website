import { expect, test } from '@playwright/test';

const germanGlyphProbe = 'ÄÖÜäöüß';

test.describe('governed self-hosted webfonts', () => {
  test('loads Inter and Manrope from same-origin assets with German glyph coverage', async ({
    page,
  }) => {
    const externalFontRequests: string[] = [];

    page.on('request', (request) => {
      if (request.resourceType() !== 'font') return;
      const requestUrl = new URL(request.url());
      if (requestUrl.origin !== 'http://127.0.0.1:4321') externalFontRequests.push(request.url());
    });

    await page.goto('/de/');
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    expect(externalFontRequests).toEqual([]);

    const fontState = await page.evaluate((probe) => {
      const body = getComputedStyle(document.body);
      const heading = getComputedStyle(document.querySelector('h1')!);

      return {
        bodyFamily: body.fontFamily,
        headingFamily: heading.fontFamily,
        interReady: document.fonts.check(`400 16px Inter`, `Conference Manager ${probe}`),
        manropeRegularReady: document.fonts.check(
          `400 32px Manrope`,
          `Conference Manager ${probe}`,
        ),
        manropeBoldReady: document.fonts.check(`700 32px Manrope`, `Conference Manager ${probe}`),
        manropeExtraBoldReady: document.fonts.check(
          `800 32px Manrope`,
          `Conference Manager ${probe}`,
        ),
      };
    }, germanGlyphProbe);

    expect(fontState.bodyFamily).toContain('Inter');
    expect(fontState.headingFamily).toContain('Manrope');
    expect(fontState.interReady).toBe(true);
    expect(fontState.manropeRegularReady).toBe(true);
    expect(fontState.manropeBoldReady).toBe(true);
    expect(fontState.manropeExtraBoldReady).toBe(true);
  });

  test('remains usable when every font request fails', async ({ page }) => {
    await page.route(/\.(woff2)(\?.*)?$/, (route) => route.abort());
    await page.goto('/en/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Make every workplace conference feel effortless.',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a demo' }).first()).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });
});
