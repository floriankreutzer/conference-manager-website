import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/security-trust/';
const germanPath = '/de/security-trust/';

test.describe('Security & Trust', () => {
  test('renders the customer-facing English trust narrative', async ({ page }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Enterprise trust without making the employee experience complicated. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Enterprise trust without making the employee experience complicated.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'A simple employee journey without giving up organisational control.',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Connect to your environment without handing control away.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/does not turn planned controls into certifications/),
    ).toBeVisible();
    await expect(main).not.toContainText('refresh tokens');
    await expect(main).not.toContainText('browser bundle');
    await expect(main.getByRole('link', { name: 'Explore integrations' })).toHaveAttribute(
      'href',
      '/en/integrations/',
    );
    await expect(main.getByRole('link', { name: 'Explore the product' })).toHaveAttribute(
      'href',
      '/en/product/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/security-trust/',
    );
  });

  test('renders the customer-facing German trust narrative', async ({ page }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Enterprise-Sicherheit, ohne den Anfrageprozess kompliziert zu machen. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Enterprise-Sicherheit, ohne den Anfrageprozess kompliziert zu machen.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Ein einfacher Anfrageprozess, ohne die Kontrolle des Unternehmens aufzugeben.',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'An Ihre Umgebung anbinden, ohne die Kontrolle abzugeben.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/keine Zertifizierungen oder pauschalen Compliance-Garantien/),
    ).toBeVisible();
    await expect(main).not.toContainText('Refresh-Tokens');
    await expect(main).not.toContainText('Trusted API');
    await expect(main.getByRole('link', { name: 'Integrationen ansehen' })).toHaveAttribute(
      'href',
      '/de/integrations/',
    );
    await expect(main.getByRole('link', { name: 'Produkt ansehen' })).toHaveAttribute(
      'href',
      '/de/product/',
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
        name: 'Vertrauen entsteht durch überprüfbare Antworten, nicht durch unbelegte Badges.',
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
