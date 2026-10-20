import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const storyPaths = ['/en/product/', '/de/product/', '/en/how-it-works/', '/de/how-it-works/'];

test.describe('Product and How it works narratives', () => {
  test('renders the English Product narrative with governed conversion links', async ({ page }) => {
    await page.goto('/en/product/');
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'One request. Everything for your meeting. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'One request. Everything for your meeting.',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Bring the details together before preparation starts.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/Your room-booking system stays responsible for reservations/),
    ).toBeVisible();
    await expect(main.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
    await expect(main.getByRole('link', { name: /See how it works/ }).first()).toHaveAttribute(
      'href',
      '/en/how-it-works/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/product/',
    );
  });

  test('renders the German Product narrative as a complete localized page', async ({ page }) => {
    await page.goto('/de/product/');
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Eine Anfrage. Alles für Ihre Besprechung. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Eine Anfrage. Alles für Ihre Besprechung.',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Die Angaben zusammenführen, bevor die Vorbereitung beginnt.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/Ihr Raumbuchungssystem bleibt für Reservierungen zuständig/),
    ).toBeVisible();
    await expect(main.getByRole('link', { name: 'Demo anfragen' }).first()).toHaveAttribute(
      'href',
      '/de/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/product/',
    );
  });

  test('explains the three stages and lets visitors explore a catering change', async ({
    page,
  }) => {
    await page.goto('/en/how-it-works/');
    const main = page.locator('main');

    await expect(page).toHaveTitle('One meeting. Three clear steps. — Conference Manager');
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'One meeting. Three clear steps.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(3);
    await expect(
      main.getByRole('heading', { level: 2, name: 'The employee describes the meeting.' }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'The conference team prepares the meeting.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/The existing room-booking system remains responsible for the reservation/),
    ).toBeVisible();
    const example = main.locator('meeting-example');
    await expect(example.getByRole('tab')).toHaveCount(3);
    await example.getByRole('tab', { name: 'Change', exact: true }).click();
    await expect(example.getByText('Coffee-break package for 18', { exact: true })).toBeVisible();
    await expect(example.getByText('Change awaiting review', { exact: true })).toBeVisible();
    await expect(main.getByRole('link', { name: /Explore the product/ }).first()).toHaveAttribute(
      'href',
      '/en/product/',
    );
  });

  test('keeps the long German narrative within a narrow reflow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/de/how-it-works/');

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Eine Änderung bleibt bei der Besprechung.',
      }),
    ).toBeVisible();
  });

  for (const path of storyPaths) {
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
