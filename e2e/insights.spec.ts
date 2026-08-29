import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishArticlePath = '/en/insights/room-booking-is-only-part-of-conference-management/';
const germanArticlePath =
  '/de/insights/raumbuchung-ist-nur-ein-teil-des-konferenzmanagements/';

test.describe('published Insights', () => {
  test('publishes the governed bilingual pair and keeps article navigation intact', async ({
    page,
  }) => {
    await page.goto('/en/insights/');
    const englishArticle = page.getByRole('link', {
      name: 'Why room booking is only part of conference management',
    });
    await expect(englishArticle).toHaveAttribute('href', englishArticlePath);
    await englishArticle.click();
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Why room booking is only part of conference management',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Insights' })).toHaveAttribute(
      'href',
      '/en/insights/',
    );

    await page.goto('/de/insights/');
    const germanArticle = page.getByRole('link', {
      name: 'Warum Raumbuchung nur ein Teil des Konferenzmanagements ist',
    });
    await expect(germanArticle).toHaveAttribute('href', germanArticlePath);
    await germanArticle.click();
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Warum Raumbuchung nur ein Teil des Konferenzmanagements ist',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Zurück zu Insights' })).toHaveAttribute(
      'href',
      '/de/insights/',
    );
  });

  for (const path of [englishArticlePath, germanArticlePath]) {
    test(`${path} resolves and has no automated WCAG A/AA violations`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBe(true);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
