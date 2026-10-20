import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/pricing/';
const germanPath = '/de/pricing/';

const forbiddenCurrency = /[$€£¥]|\b(?:EUR|USD|GBP|CHF)\b/i;

test.describe('Pricing', () => {
  test('renders the English setup and software-use offer with its conditions and conversion paths', async ({
    page,
  }) => {
    await page.goto(englishPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle('Try it with your own meetings. — Conference Manager');
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Try it with your own meetings.',
      }),
    ).toBeVisible();
    const offer = main.getByRole('region', { name: '30 days of free software use.' });
    await expect(offer).toBeVisible();
    await expect(offer.getByText('A one-time setup fee applies.')).toBeVisible();
    await expect(offer.getByText('The 30 days start after setup is complete.')).toBeVisible();
    await expect(offer).toContainText('your own real meetings');
    await expect(offer).toContainText('your configured customer environment');
    await expect(offer).toContainText('still to be agreed');
    const steps = main.locator('ol > li');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText('Explore your meeting process.');
    await expect(steps.nth(1)).toContainText('supported connections, approval steps and deadlines');
    await expect(steps.nth(2)).toContainText('uses real meetings to assess');
    await expect(main.getByText('A one-time setup fee applies.', { exact: true })).toHaveCount(1);
    await expect(
      main.getByText('The 30 days start after setup is complete.', { exact: true }),
    ).toHaveCount(1);
    await expect(main).not.toContainText(forbiddenCurrency);
    await expect(main.getByRole('link', { name: 'Book a demo' })).toHaveCount(1);
    await expect(main.getByRole('link', { name: 'Book a demo' })).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
    await expect(main.getByRole('link', { name: /Explore the product/ }).first()).toHaveAttribute(
      'href',
      '/en/product/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/pricing/',
    );
  });

  test('renders the German setup and software-use offer with reciprocal metadata', async ({
    page,
  }) => {
    await page.goto(germanPath);
    const main = page.locator('main');

    await expect(page).toHaveTitle('Mit eigenen Besprechungen erproben. — Conference Manager');
    await expect(
      main.getByRole('heading', {
        level: 1,
        name: 'Mit eigenen Besprechungen erproben.',
      }),
    ).toBeVisible();
    const offer = main.getByRole('region', { name: '30 Tage kostenlose Softwarenutzung.' });
    await expect(offer).toBeVisible();
    await expect(offer.getByText('Die Einrichtung ist einmalig kostenpflichtig.')).toBeVisible();
    await expect(
      offer.getByText('Die 30 Tage beginnen nach abgeschlossener Einrichtung.'),
    ).toBeVisible();
    await expect(offer).toContainText('Ihren eigenen realen Besprechungen');
    await expect(offer).toContainText('Ihrer eingerichteten Kundenumgebung');
    await expect(offer).toContainText('noch offen');
    const steps = main.locator('ol > li');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText('Ihren Besprechungsablauf kennenlernen.');
    await expect(steps.nth(1)).toContainText(
      'unterstützten Anbindungen, Freigabeschritte und Fristen',
    );
    await expect(steps.nth(2)).toContainText('prüft anhand realer Besprechungen');
    await expect(
      main.getByText('Die Einrichtung ist einmalig kostenpflichtig.', { exact: true }),
    ).toHaveCount(1);
    await expect(
      main.getByText('Die 30 Tage beginnen nach abgeschlossener Einrichtung.', { exact: true }),
    ).toHaveCount(1);
    await expect(main).not.toContainText(forbiddenCurrency);
    await expect(main.getByRole('link', { name: 'Demo anfragen' })).toHaveCount(1);
    await expect(main.getByRole('link', { name: 'Demo anfragen' })).toHaveAttribute(
      'href',
      '/de/book-a-demo/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/pricing/',
    );
  });

  test('keeps the German pricing narrative within a 320px reflow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(germanPath);

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    await expect(
      page.getByRole('heading', {
        level: 3,
        name: 'Mit Ihren eigenen Besprechungen arbeiten.',
      }),
    ).toBeVisible();
  });

  for (const locale of ['en', 'de'] as const) {
    test(`${locale} demo journey keeps a compact qualified offer and the disabled form contract`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/pricing/`);
      await page
        .locator('main')
        .getByRole('link', { name: locale === 'de' ? 'Demo anfragen' : 'Book a demo' })
        .first()
        .click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/book-a-demo/$`));

      const main = page.locator('main');
      await expect(
        main.getByRole('heading', {
          level: 1,
          name:
            locale === 'de'
              ? 'Lernen Sie Conference Manager kennen.'
              : 'See Conference Manager in action.',
        }),
      ).toBeVisible();
      const offer = main.getByRole('region', {
        name: locale === 'de' ? 'Nach der Demo' : 'After the demo',
      });
      await expect(offer).toBeVisible();
      await expect(offer).toContainText(
        locale === 'de'
          ? 'Nach abgeschlossener, einmalig kostenpflichtiger Einrichtung'
          : 'After the one-time paid setup is complete',
      );
      await expect(offer).toContainText(locale === 'de' ? '30 Tage kostenlos' : 'free for 30 days');
      await expect(offer).toContainText(
        locale === 'de' ? 'Ihren eigenen realen Besprechungen' : 'your own real meetings',
      );
      await expect(offer).toContainText(
        locale === 'de'
          ? 'Ihrer eingerichteten Kundenumgebung'
          : 'your configured customer environment',
      );
      await expect(offer.getByRole('link')).toHaveAttribute('href', `/${locale}/pricing/`);

      const form = main.locator('form');
      await expect(form).toHaveAttribute('method', 'post');
      await expect(form).toHaveAttribute('accept-charset', 'UTF-8');
      await expect(form).toHaveAttribute('aria-disabled', 'true');
      expect(await form.getAttribute('action')).toBeNull();
      await expect(form.locator('input[name="locale"]')).toHaveValue(locale);
      expect(
        await form
          .locator('input, select, textarea')
          .evaluateAll((fields) => fields.map((field) => field.getAttribute('name'))),
      ).toEqual([
        'locale',
        'firstName',
        'lastName',
        'email',
        'company',
        'companySize',
        'message',
        'website',
        'privacyAcknowledged',
      ]);
      for (const field of await form
        .locator('input:not([type="hidden"]), select, textarea, button')
        .all()) {
        await expect(field).toBeDisabled();
      }
      await expect(form.locator('[name="website"]')).toHaveAttribute('tabindex', '-1');
      await expect(form.locator('[name="privacyAcknowledged"]')).toHaveAttribute('required');
      await expect(form.locator('textarea')).toHaveAccessibleName(
        locale === 'de'
          ? 'Was möchten Sie besprechen? Optional'
          : 'What would you like to discuss? Optional',
      );
      await expect(form.locator('textarea')).toHaveAttribute(
        'aria-describedby',
        'demo-message-hint',
      );
    });
  }

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
