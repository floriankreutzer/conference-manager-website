import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/security-trust/';
const germanPath = '/de/security-trust/';

test.describe('Security & Trust', () => {
  test('renders the buyer-readable English trust narrative', async ({ page }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'A simple experience with deliberate enterprise boundaries. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'A simple experience with deliberate enterprise boundaries.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'The public website does not become a second place to sign in.',
      }),
    ).toBeVisible();
    await expect(main.getByText(/does not turn planned controls into certifications/)).toBeVisible();
    await expect(main).not.toContainText('refresh tokens');
    await expect(main).not.toContainText('browser bundle');
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
      'https://preview.example.invalid/de/security-trust/',
    );
  });

  test('renders the buyer-readable German trust narrative', async ({ page }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Eine einfache Erfahrung mit klaren Enterprise-Grenzen. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Eine einfache Erfahrung mit klaren Enterprise-Grenzen.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Die öffentliche Website wird nicht zu einem zweiten Anmeldeort.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/keine Zertifizierungen, pauschalen Compliance-Aussagen/),
    ).toBeVisible();
    await expect(main).not.toContainText('Refresh-Tokens');
    await expect(main).not.toContainText('Trusted API');
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
        name: 'Kommunizieren Sie nur, was die umgesetzten Kontrollen tatsächlich tragen.',
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
