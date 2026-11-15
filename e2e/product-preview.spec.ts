import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

for (const locale of ['en', 'de'] as const) {
  test(`${locale} product page shows the genuine localized sample view without cropping`, async ({
    page,
    request,
  }) => {
    await page.goto(`/${locale}/product/`);
    const preview = page.locator('.product-preview');
    const image = preview.getByRole('img');
    const imagePath = `/assets/product/welcome-${locale}.png`;
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', imagePath);
    await expect(image).toHaveAttribute('loading', 'lazy');
    await expect(image).toHaveAttribute('width', '1280');
    await expect(image).toHaveAttribute('height', '1242');
    await expect(preview.locator('figcaption')).toContainText(
      locale === 'de'
        ? 'Conference Manager: Startansicht mit Beispieldaten.'
        : 'Conference Manager: welcome view with sample data.',
    );
    await expect(preview.getByRole('link')).toHaveAttribute('href', imagePath);
    await expect
      .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBe(1280);
    const bounds = await image.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.width / bounds!.height).toBeCloseTo(1280 / 1242, 2);
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);

    const response = await request.get(imagePath);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/png');
    await preview.getByRole('link').focus();
    await expect(preview.getByRole('link')).toBeFocused();
    await preview.screenshot({ path: test.info().outputPath(`review-product-${locale}.png`) });

    await page.goto(`/${locale}/how-it-works/`);
    await expect(page.locator('.product-preview')).toHaveCount(0);
  });
}

test.describe('automated accessibility of the product preview', () => {
  // Axe needs JavaScript timers; the rendering, focus and image checks above stay no-script.
  test.use({ javaScriptEnabled: true });

  for (const locale of ['en', 'de'] as const) {
    test(`${locale} product preview has no automated WCAG A/AA violations`, async ({ page }) => {
      await page.goto(`/${locale}/product/`);
      const preview = page.locator('.product-preview');
      await preview.scrollIntoViewIfNeeded();
      await expect(preview).toBeVisible();
      const accessibility = await new AxeBuilder({ page })
        .include('.product-preview')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(accessibility.violations).toEqual([]);
    });
  }
});
