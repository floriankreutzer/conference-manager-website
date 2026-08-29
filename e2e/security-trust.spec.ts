import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/security-trust/';
const germanPath = '/de/security-trust/';

test.describe('Security & Trust', () => {
  test('renders the evidence-led English trust narrative', async ({ page }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Simple for users. Deliberate about control. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', { level: 1, name: 'Simple for users. Deliberate about control.' }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Marketing and application access remain separate by design.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/does not turn planned controls into certifications/),
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
      'https://preview.example.invalid/de/security-trust/',
    );
  });

  test('renders the complete German trust narrative', async ({ page }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Einfach für Nutzer. Kontrolliert im Fundament. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Einfach für Nutzer. Kontrolliert im Fundament.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Marketing und Anwendungszugriff bleiben bewusst getrennt.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/keine Zertifizierungen, pauschalen Compliance-Aussagen/),
    ).toBeVisible();
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
        name: 'Trust-Aussagen folgen verifizierten Kontrollen – nicht Marketingformulierungen.',
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
