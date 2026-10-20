import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/en/demo/', '/de/demo/'];
const customerOrigin = 'https://conference-manager-demo.onrender.com';
const platformOrigin = 'https://conference-manager-ops-demo.onrender.com';

test.describe('public demo launch', () => {
  for (const route of routes) {
    test(`${route} resolves and meets automated WCAG A/AA`, async ({ page, request }) => {
      const response = await request.get(route);
      expect(response.ok()).toBe(true);

      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
      const robots = page.locator('meta[name="robots"]');
      await expect(robots).toHaveAttribute('content', 'noindex, nofollow');
    });
  }

  test('keeps fixed demo handoffs and reveals platform access by keyboard', async ({ page }) => {
    await page.goto('/en/demo/');
    const main = page.locator('main');
    await expect(
      main.getByRole('heading', { level: 1, name: 'Your product demo starts here.' }),
    ).toBeVisible();
    await expect(main.getByRole('link', { name: 'Open product demo' })).toHaveAttribute(
      'href',
      customerOrigin,
    );
    await expect(main.locator('a[href="/en/book-a-demo/"]')).toHaveCount(0);
    await expect(
      main.getByText(
        /A pilot with your own real meetings uses a separately configured customer environment/,
      ),
    ).toBeVisible();
    await expect(main.getByRole('link', { name: 'Explore setup & pilot' })).toHaveAttribute(
      'href',
      '/en/pricing/',
    );

    const disclosure = main.locator('details');
    const summary = disclosure.locator('summary');
    const platform = disclosure.locator('a');
    await expect(disclosure).not.toHaveAttribute('open');
    await expect(platform).toHaveAttribute('href', platformOrigin);
    await expect(platform).toBeHidden();

    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(disclosure).toHaveAttribute('open');
    await expect(platform).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(platform).toBeFocused();

    const expandedResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(expandedResults.violations).toEqual([]);

    await summary.focus();
    await page.keyboard.press('Space');
    await expect(disclosure).not.toHaveAttribute('open');
    await expect(platform).toBeHidden();

    const german = page.getByRole('link', { name: /Language: DE/ });
    await expect(german).toHaveAttribute('href', '/de/demo/');
    await german.click();
    await expect(page).toHaveURL(/\/de\/demo\/$/);
    await expect(
      main.getByRole('heading', { level: 1, name: 'Ihre Produktdemo beginnt hier.' }),
    ).toBeVisible();
    await expect(main.getByRole('link', { name: 'Produktdemo öffnen' })).toHaveAttribute(
      'href',
      customerOrigin,
    );
    await expect(main.locator('a[href="/de/book-a-demo/"]')).toHaveCount(0);
    await expect(
      main.getByText(
        /Ein Pilot mit Ihren eigenen realen Besprechungen findet in einer separat eingerichteten Kundenumgebung statt/,
      ),
    ).toBeVisible();
  });

  test('keeps both demo choices within a 320px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/de/demo/');
    const disclosure = page.locator('main details');
    await disclosure.locator('summary').click();
    await expect(disclosure.getByRole('link', { name: 'Plattformdemo öffnen' })).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });
});
