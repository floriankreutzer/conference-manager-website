import { expect, test } from '@playwright/test';

for (const locale of ['en', 'de']) {
  test(`${locale} has a full-width photo hero with contained readable text`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const width of [320, 390, 640, 844, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`http://127.0.0.1:4321/${locale}/`);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('.hero .button')).toBeVisible();
      const layout = await page.locator('.home-hero').evaluate((hero) => {
        const rect = hero.getBoundingClientRect();
        const image = hero.querySelector('img')!.getBoundingClientRect();
        const copy = hero.querySelector('.page-intro')!.getBoundingClientRect();
        const title = hero.querySelector('h1')!;
        return {
          left: rect.left,
          width: rect.width,
          viewport: document.documentElement.clientWidth,
          imageHeight: image.height,
          heroHeight: rect.height,
          textTop: copy.top,
          top: rect.top,
          textBottom: copy.bottom,
          bottom: rect.bottom,
          color: getComputedStyle(title).color,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          nextTop: hero.nextElementSibling!.getBoundingClientRect().top,
        };
      });
      expect(layout.left).toBeCloseTo(0, 0);
      expect(layout.width).toBeCloseTo(layout.viewport, 0);
      expect(layout.imageHeight).toBeCloseTo(layout.heroHeight, 0);
      expect(layout.textTop).toBeGreaterThanOrEqual(layout.top);
      expect(layout.textBottom).toBeLessThanOrEqual(layout.bottom);
      expect(layout.nextTop).toBeGreaterThanOrEqual(layout.bottom);
      expect(layout.color).toBe('rgb(255, 255, 255)');
      expect(layout.overflow).toBe(false);
    }
    await context.close();
  });
}
