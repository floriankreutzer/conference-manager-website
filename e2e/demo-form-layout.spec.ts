import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

for (const width of [320, 640, 844, 960, 1024, 1100, 1280]) {
  test(`demo form controls stay inside their panel at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 844 ? 390 : 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    for (const locale of ['en', 'de']) {
      await page.goto(`/${locale}/book-a-demo/`);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.locator('.demo-request__panel').evaluate((panel) => {
        const grid = panel.querySelector('.form-grid')!;
        const gridBounds = grid.getBoundingClientRect();
        return {
          pageWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          panelWidth: panel.clientWidth,
          panelContentWidth: panel.scrollWidth,
          gridLeft: gridBounds.left,
          gridRight: gridBounds.right,
          columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
          controls: [...grid.querySelectorAll('input, select, textarea')].map((control) => {
            const bounds = control.getBoundingClientRect();
            const label = control.closest('label')!.getBoundingClientRect();
            return {
              name: control.getAttribute('name'),
              left: bounds.left,
              right: bounds.right,
              height: bounds.height,
              labelLeft: label.left,
              labelRight: label.right,
            };
          }),
        };
      });

      expect(layout.controls).toHaveLength(6);
      expect(layout.pageWidth, locale).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.panelContentWidth, locale).toBeLessThanOrEqual(layout.panelWidth + 1);
      expect(layout.columns, locale).toBeLessThanOrEqual(2);
      if (width === 844) expect(layout.columns, locale).toBe(2);
      for (const control of layout.controls) {
        const description = `${locale}: ${control.name}`;
        expect(control.left, description).toBeGreaterThanOrEqual(layout.gridLeft - 1);
        expect(control.right, description).toBeLessThanOrEqual(layout.gridRight + 1);
        expect(control.left, description).toBeGreaterThanOrEqual(control.labelLeft - 1);
        expect(control.right, description).toBeLessThanOrEqual(control.labelRight + 1);
        expect(control.height, description).toBeGreaterThanOrEqual(48);
      }
      if (width === 844 || width === 960) {
        await page.screenshot({
          path: test.info().outputPath(`review-form-${locale}-${width}.png`),
          fullPage: true,
        });
      }
    }
  });
}
