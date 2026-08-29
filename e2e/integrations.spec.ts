import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/integrations/';
const germanPath = '/de/integrations/';

test.describe('Integrations', () => {
  test('renders customer-led English integration content with honest qualifications', async ({
    page,
  }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Fit Conference Manager into the workplace you already run. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Fit Conference Manager into the workplace you already run.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Use Conference Manager with your existing Microsoft environment.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/Other providers are described as available only after/),
    ).toBeVisible();
    await expect(main).not.toContainText('Trusted server-side integration');
    await expect(main.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/integrations/',
    );
  });

  test('renders customer-led German integration content with honest qualifications', async ({
    page,
  }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Conference Manager passt in die Arbeitswelt, die Sie bereits betreiben. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Conference Manager passt in die Arbeitswelt, die Sie bereits betreiben.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(4);
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Nutzen Sie Conference Manager mit Ihrer bestehenden Microsoft-Umgebung.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText(/Weitere Anbieter werden erst dann als verfügbar beschrieben/),
    ).toBeVisible();
    await expect(main).not.toContainText('Integrationsautorität');
    await expect(main.getByRole('link', { name: 'Demo anfragen' }).first()).toHaveAttribute(
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
        name: 'Ergänzen Sie weitere angebundene Systeme, ohne die Konferenzstory neu zu bauen.',
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
