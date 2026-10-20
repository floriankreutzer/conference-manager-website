import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/security-trust/';
const germanPath = '/de/security-trust/';

test.describe('Security & Trust', () => {
  test('renders the customer-facing English trust narrative', async ({ page }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle('Clear answers for your IT team. — Conference Manager');
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Clear answers for your IT team.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'How do employees access Conference Manager?',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Which systems need to be connected?',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/If your organisation requires particular certifications/),
    ).toBeVisible();
    await expect(main).not.toContainText('refresh tokens');
    await expect(main).not.toContainText('browser bundle');
    await expect(main.getByRole('link', { name: 'Explore integrations' }).first()).toHaveAttribute(
      'href',
      '/en/integrations/',
    );
    await expect(main.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/security-trust/',
    );
  });

  test('renders the customer-facing German trust narrative', async ({ page }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle('Klare Antworten für Ihre IT. — Conference Manager');
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Klare Antworten für Ihre IT.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Wie greifen Mitarbeitende auf Conference Manager zu?',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Welche Systeme sollen zusammenarbeiten?',
      }),
    ).toBeVisible();
    await expect(main.getByText(/Wenn Ihr Unternehmen bestimmte Zertifizierungen/)).toBeVisible();
    await expect(main).not.toContainText('Refresh-Tokens');
    await expect(main).not.toContainText('Trusted API');
    await expect(main.getByRole('link', { name: 'Integrationen ansehen' }).first()).toHaveAttribute(
      'href',
      '/de/integrations/',
    );
    await expect(main.getByRole('link', { name: 'Demo anfragen' }).first()).toHaveAttribute(
      'href',
      '/de/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/security-trust/',
    );
  });

  test('keeps the German trust narrative within a 320px reflow viewport', async ({ page }) => {
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
        name: 'Was muss Ihre IT für den Einsatz prüfen?',
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
