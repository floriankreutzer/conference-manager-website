import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const storyPaths = ['/en/product/', '/de/product/', '/en/how-it-works/', '/de/how-it-works/'];

test.describe('Product and How it works narratives', () => {
  test('renders the English Product narrative with governed conversion links', async ({ page }) => {
    await page.goto('/en/product/');
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'Conference management around the complete request. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Conference management around the complete request.',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Keep the decisions that belong together in one place.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText('Keep your room booking. Replace the coordination around it.'),
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
      'Konferenzmanagement rund um die vollständige Anfrage. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Konferenzmanagement rund um die vollständige Anfrage.',
      }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Halten Sie zusammen, was für dieselbe Konferenz entschieden wird.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText('Behalten Sie Ihre Raumbuchung. Strukturieren Sie die Koordination darum herum.'),
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

  test('explains the English How it works flow as five ordered stages', async ({ page }) => {
    await page.goto('/en/how-it-works/');
    const main = page.locator('main');

    await expect(page).toHaveTitle(
      'From conference request to prepared experience. — Conference Manager',
    );
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'From conference request to prepared experience.',
      }),
    ).toBeVisible();
    await expect(main.locator('article > ol > li')).toHaveCount(5);
    await expect(
      main.getByRole('heading', { level: 2, name: 'Start with the conference itself.' }),
    ).toBeVisible();
    await expect(
      main.getByRole('heading', {
        level: 2,
        name: 'Keep room booking connected, not duplicated.',
      }),
    ).toBeVisible();
    await expect(
      main.getByText("We don't replace your room booking system. We connect it."),
    ).toBeVisible();
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
        name: 'Binden Sie die Raumbuchung ein, statt sie zu duplizieren.',
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
