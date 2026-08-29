import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const accessibilityPaths = ['/en/', '/de/', '/en/book-a-demo/', '/de/book-a-demo/'];

test.describe('public website contracts', () => {
  test('renders the approved Pavurel homepage narrative and primary actions', async ({ page }) => {
    await page.goto('/en/');

    await expect(page.getByRole('heading', { level: 1, name: 'Make every workplace conference feel effortless.' })).toBeVisible();
    await expect(page.getByText('Keep your room booking. Replace the coordination around it.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute('href', '/en/book-a-demo/');
  });

  test('switches locales without creating a parallel page architecture', async ({ page }) => {
    await page.goto('/en/');
    const germanLink = page.getByRole('link', { name: /Language: DE/ });
    await expect(germanLink).toHaveAttribute('href', '/de/');

    await germanLink.click();
    await expect(page).toHaveURL(/\/de\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Damit sich jede Workplace-Konferenz mühelos anfühlt.' })).toBeVisible();
  });

  test('keeps Login as a fixed HTTPS handoff to the application', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.getByRole('link', { name: 'Login' })).toHaveAttribute('href', 'https://app.example.invalid/login');
  });

  test('keeps demo submission fail-closed without accepted deployment configuration', async ({ page }) => {
    await page.goto('/en/book-a-demo/');

    await expect(page.getByRole('status')).toContainText('Demo requests are not active in this environment yet.');
    await expect(page.getByRole('button', { name: 'Request a demo' })).toBeDisabled();
    await expect(page.getByLabel(/Business email/)).toBeDisabled();
  });

  test('does not introduce page-level horizontal overflow on the responsive shell', async ({ page }) => {
    await page.goto('/en/');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });
});

test.describe('automated accessibility baseline', () => {
  for (const path of accessibilityPaths) {
    test(`${path} has no automated WCAG A/AA violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
