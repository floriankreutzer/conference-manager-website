import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/en/demo/', '/de/demo/'];
const customerOrigin = 'https://conference-manager-demo.onrender.com';
const platformOrigin = 'https://conference-manager-ops-demo.onrender.com';

test.describe('public Demo launch', () => {
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

  test('uses fixed HTTPS Demo handoffs and preserves locale', async ({ page }) => {
    await page.goto('/en/demo/');
    const heading = page.getByRole('heading', {
      level: 1,
      name: 'Choose the Demo experience',
    });
    await expect(heading).toBeVisible();

    const customer = page.getByRole('link', { name: 'Launch Customer Demo' });
    const platform = page.getByRole('link', { name: 'Launch Platform Demo' });
    await expect(customer).toHaveAttribute('href', customerOrigin);
    await expect(platform).toHaveAttribute('href', platformOrigin);

    const german = page.getByRole('link', { name: /Language: DE/ });
    await expect(german).toHaveAttribute('href', '/de/demo/');

    await page.goto('/de/demo/');
    const germanHeading = page.getByRole('heading', {
      level: 1,
      name: 'Demo-Umgebung auswählen',
    });
    await expect(germanHeading).toBeVisible();

    const germanCustomer = page.getByRole('link', {
      name: 'Customer Demo starten',
    });
    await expect(germanCustomer).toHaveAttribute('href', customerOrigin);
  });
});
