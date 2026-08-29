import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/pricing/';
const germanPath = '/de/pricing/';

const forbiddenCurrency = /[$€£¥]|\b(?:EUR|USD|GBP|CHF)\b/i;

test.describe('Pricing', () => {
  test('renders the buyer-led English pre-pricing journey and conversion paths', async ({
    page,
  }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Evaluate product fit now. Public pricing follows approval. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Evaluate product fit now. Public pricing follows approval.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Understand the product before choosing a commercial model.',
      }),
    ).toBeVisible();
    await expect(main).not.toContainText(forbiddenCurrency);
    await expect(
      main.getByText(/Use a demo to decide whether the product is relevant/),
    ).toBeVisible();
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

  test('renders the buyer-led German pre-pricing journey with reciprocal metadata', async ({
    page,
  }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Produktfit jetzt bewerten. Öffentliche Preise folgen nach Freigabe. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Produktfit jetzt bewerten. Öffentliche Preise folgen nach Freigabe.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Verstehen Sie zuerst das Produkt – danach das kommerzielle Modell.',
      }),
    ).toBeVisible();
    await expect(main).not.toContainText(forbiddenCurrency);
    await expect(main.getByText(/Nutzen Sie eine Demo, um die Relevanz/)).toBeVisible();
    await expect(main.getByRole('link', { name: 'Demo anfragen' }).first()).toHaveAttribute(
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
        name: 'Nutzen Sie eine Demo, um die Relevanz für Ihr Unternehmen zu bewerten.',
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
