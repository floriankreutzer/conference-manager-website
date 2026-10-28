import { expect, test } from '@playwright/test';

test.describe('canonical static icons without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const locale of ['de', 'en']) {
    test(`${locale}: retains decorative originals and static delivery across page widths`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      const icons = page.locator('img[src*="/assets/pavurel-icons/v0.1/"]');
      expect(await icons.count()).toBeGreaterThanOrEqual(6);
      for (const icon of await icons.all()) {
        await expect(icon).toHaveAttribute('alt', '');
        await expect(icon).toHaveAttribute('aria-hidden', 'true');
        await expect(icon).toHaveAttribute('width', '24');
        await expect(icon).toHaveAttribute('height', '24');
        await expect
          .poll(() => icon.evaluate((element) => (element as HTMLImageElement).naturalWidth))
          .toBe(24);
        const src = await icon.getAttribute('src');
        expect(src).toMatch(/\/assets\/pavurel-icons\/v0\.1\/light\/[a-z-]+\.svg$/);
        const response = await page.request.get(src!);
        expect(response.ok()).toBe(true);
        expect(response.headers()['content-type']).toContain('image/svg+xml');
        expect(await response.text()).toContain('viewBox="0 0 24 24"');
      }
      for (const width of [320, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await expect(page.locator('h1')).toBeVisible();
        const dimensions = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          client: document.documentElement.clientWidth,
        }));
        expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
      }
    });
  }
});
