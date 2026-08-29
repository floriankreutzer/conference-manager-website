import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/pricing/';
const germanPath = '/de/pricing/';

const forbiddenCurrency = /[$€£¥]|\b(?:EUR|USD|GBP|CHF)\b/i;

test.describe('Pricing', () => {
  test('renders the governed English pre-pricing narrative and conversion paths', async ({
    page,
  }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Pricing that will be clear before it is public. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Pricing that will be clear before it is public.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'No public price before the model is approved.',
      }),
    ).toBeVisible();
    await expect(main).not.toContainText(forbiddenCurrency);
    await expect(main.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
    await expect(main.getByRole('link', { name: /Explore the product/ }).first()).toHaveAttribute(
      'href',
      '/en/product/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/pricing/',
    );
  });

  test('renders the governed German pre-pricing narrative with reciprocal metadata', async ({
    page,
  }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Preise werden transparent, bevor sie öffentlich werden. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Preise werden transparent, bevor sie öffentlich werden.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Kein öffentlicher Preis vor der Freigabe des Modells.',
      }),
    ).toBeVisible();
    await expect(main).not.toContainText(forbiddenCurrency);
    await expect(main.getByRole('link', { name: 'Demo buchen' }).first()).toHaveAttribute(
      'href',
      '/de/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/pricing/',
    );
  });

  test('keeps the German pricing narrative within a 320px reflow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(germanPath);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Validiere das kommerzielle Modell, bevor du es veröffentlichst.',
      }),
    ).toBeVisible();
  });

  for (const path of [englishPath, germanPath]) {
    test(`${path} has no automated WCAG A/AA violations`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBe(true);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
