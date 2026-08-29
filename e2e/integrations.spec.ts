import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/integrations/';
const germanPath = '/de/integrations/';

test.describe('Integrations', () => {
  test('renders qualified English integration content', async ({ page }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Keep the systems that already solve a problem well. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Keep the systems that already solve a problem well.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Microsoft integration is implemented, with real-environment acceptance still required.',
      }),
    ).toBeVisible();
    await expect(main.getByText(/does not mean that Google, Okta/)).toBeVisible();
    await expect(main.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/integrations/',
    );
  });

  test('renders qualified German integration content', async ({ page }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Behalte Systeme, die ein Problem bereits gut lösen. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Behalte Systeme, die ein Problem bereits gut lösen.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Die Microsoft-Integration ist implementiert, benötigt aber reale Umgebungsabnahme.',
      }),
    ).toBeVisible();
    await expect(main.getByText(/Das bedeutet nicht, dass Google, Okta/)).toBeVisible();
    await expect(main.getByRole('link', { name: 'Demo buchen' }).first()).toHaveAttribute(
      'href',
      '/de/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/integrations/',
    );
  });

  test('keeps the German Integrations page within a 320px reflow viewport', async ({ page }) => {
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
        name: 'Künftige Provider können in das Modell passen, ohne heutige Produktclaims zu werden.',
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
