import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/en/demo/', '/de/demo/'];

test.describe('public Demo launch', () => {
  for (const route of routes) {
    test(`${route} resolves and meets automated WCAG A/AA`, async ({
      page,
      request,
    }) => {
      const response = await request.get(route);
      expect(response.ok()).toBe(true);

      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow',
      );
    });
  }

  test('uses fixed HTTPS Demo handoffs and preserves locale', async ({ page }) => {
    await page.goto('/en/demo/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Choose the Demo experience',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Launch Customer Demo' }),
    ).toHaveAttribute(
      'href',
      'https://conference-manager-demo.onrender.com',
    );
    await expect(
      page.getByRole('link', { name: 'Launch Platform Demo' }),
    ).toHaveAttribute(
      'href',
      'https://conference-manager-ops-demo.onrender.com',
    );
    await expect(
      page.getByRole('link', { name: /Language: DE/ }),
    ).toHaveAttribute('href', '/de/demo/');

    await page.goto('/de/demo/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Demo-Umgebung auswählen',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Customer Demo starten' }),
    ).toHaveAttribute(
      'href',
      'https://conference-manager-demo.onrender.com',
    );
  });
});
