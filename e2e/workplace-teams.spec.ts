import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/workplace-teams/';
const germanPath = '/de/workplace-teams/';

test.describe('For your team', () => {
  test('renders the governed English buyer narrative and conversion paths', async ({ page }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Fewer follow-ups. Clearer responsibilities. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Fewer follow-ups. Clearer responsibilities.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Prepare the meeting from one shared request.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/Your existing room-booking system remains responsible for reservations/),
    ).toBeVisible();
    await expect(main.getByRole('heading', { level: 3, name: 'Review changes' })).toBeVisible();
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
      'https://preview.example.invalid/de/workplace-teams/',
    );
  });

  test('renders the complete German buyer narrative with reciprocal metadata', async ({ page }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Weniger Rückfragen. Klarere Zuständigkeiten. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Weniger Rückfragen. Klarere Zuständigkeiten.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Die Besprechung aus einer gemeinsamen Anfrage vorbereiten.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/Ihre bestehende Raumbuchung bleibt für Reservierungen zuständig/),
    ).toBeVisible();
    await expect(main.getByRole('heading', { level: 3, name: 'Änderungen prüfen' })).toBeVisible();
    await expect(main.getByRole('link', { name: 'Demo anfragen' }).first()).toHaveAttribute(
      'href',
      '/de/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/workplace-teams/',
    );
  });

  test('keeps the German buyer narrative within a 320px reflow viewport', async ({ page }) => {
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
        name: 'Auf den vorhandenen Systemen aufbauen.',
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
