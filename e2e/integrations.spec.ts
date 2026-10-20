import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const englishPath = '/en/integrations/';
const germanPath = '/de/integrations/';

const locales = [
  {
    locale: 'en',
    path: englishPath,
    title: 'Your systems. One meeting workflow.',
    overview: 'Connections that fit your working day.',
    roomHeading: 'Start here. Keep your room booking.',
    identityHeading: 'Use your company account.',
    calendarApproval: /Microsoft and Exchange permissions your organisation approves/,
    supplierAvailability: /assessed and confirmed as available/,
    visitorAssessment: /separate feasibility check; they are not automatically included/,
    paidSetup: /one-time paid setup/,
    pilotStart: /free 30-day pilot begins after setup is complete/,
    demoCta: 'Book a demo',
    pilotCta: 'Pilot & setup',
    alternate: 'de',
    internalCopy: 'Trusted server-side integration',
  },
  {
    locale: 'de',
    path: germanPath,
    title: 'Ihre Systeme. Ein gemeinsamer Ablauf.',
    overview: 'Passende Anbindungen für Ihren Alltag.',
    roomHeading: 'Hier anfragen. Ihre Raumbuchung behalten.',
    identityHeading: 'Mit Ihrem Unternehmenskonto anmelden.',
    calendarApproval: /Microsoft- und Exchange-Freigaben Ihres Unternehmens/,
    supplierAvailability: /Anbindung geprüft und verfügbar/,
    visitorAssessment: /gesonderte Machbarkeitsprüfung und sind nicht automatisch im Pilot/,
    paidSetup: /einmalige kostenpflichtige Einrichtung/,
    pilotStart: /kostenloser 30-Tage-Pilot beginnt nach abgeschlossener Einrichtung/,
    demoCta: 'Demo anfragen',
    pilotCta: 'Pilot & Einrichtung',
    alternate: 'en',
    internalCopy: 'Integrationsautorität',
  },
] as const;

test.describe('Integrations', () => {
  for (const copy of locales) {
    test(`renders ${copy.locale} connections with customer approvals and confirmed scope`, async ({
      page,
    }) => {
      await page.goto(copy.path);
      const main = page.locator('main');
      const overview = main.getByRole('region', { name: copy.overview, exact: true });

      await expect(page).toHaveTitle(`${copy.title} — Conference Manager`);
      await expect(main.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(main.getByRole('heading', { level: 1, name: copy.title })).toBeVisible();
      await expect(overview.locator('[data-integration]')).toHaveCount(4);
      await expect(
        overview.getByRole('heading', { level: 3, name: copy.roomHeading }),
      ).toBeVisible();
      await expect(
        overview.getByRole('heading', { level: 3, name: copy.identityHeading }),
      ).toBeVisible();
      await expect(overview.getByText(copy.calendarApproval)).toBeVisible();
      await expect(overview.getByText(copy.supplierAvailability)).toBeVisible();
      await expect(overview.getByText(copy.visitorAssessment)).toBeVisible();
      await expect(main.getByText(copy.paidSetup)).toBeVisible();
      await expect(main.getByText(copy.pilotStart)).toBeVisible();
      await expect(main).not.toContainText(copy.internalCopy);
      await expect(main.getByRole('link', { name: copy.demoCta }).first()).toHaveAttribute(
        'href',
        `/${copy.locale}/book-a-demo/`,
      );
      await expect(main.getByRole('link', { name: copy.pilotCta })).toHaveAttribute(
        'href',
        `/${copy.locale}/pricing/`,
      );
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${copy.alternate}"]`),
      ).toHaveAttribute('href', `https://preview.example.invalid/${copy.alternate}/integrations/`);
    });
  }

  test('supports keyboard navigation to the connections overview', async ({ page }) => {
    await page.goto(englishPath);
    const overviewLink = page.getByRole('link', { name: 'Explore the connections' });

    await overviewLink.focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/en\/integrations\/#integrations-overview$/);
    await expect(page.locator('#integrations-overview')).toBeFocused();
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
      page.getByRole('heading', { level: 3, name: 'Ihre Gästeabläufe besprechen.' }),
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
