import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const locale of ['en', 'de'] as const) {
  test(`${locale} footer exposes configured public information without activating another action`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/book-a-demo/`);
    const navigation = page.getByRole('navigation', {
      name:
        locale === 'de' ? 'Rechtliche Informationen und Kontakt' : 'Legal information and contact',
    });
    const destinations: readonly (readonly [string, string])[] =
      locale === 'de'
        ? [
            ['Impressum', 'impressum'],
            ['Datenschutz', 'datenschutz'],
            ['Kontakt', 'kontakt'],
          ]
        : [
            ['Legal notice', 'legal'],
            ['Privacy', 'privacy'],
            ['Contact', 'contact'],
          ];
    await expect(navigation.getByRole('link')).toHaveCount(3);
    for (const [label, path] of destinations) {
      const link = navigation.getByRole('link', { name: label, exact: true });
      await expect(link).toHaveAttribute(
        'href',
        `https://information.example.invalid/${locale}/${path}/`,
      );
      await link.focus();
      await expect(link).toBeFocused();
      const bounds = await link.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
    }
    await expect(page.locator('form')).toHaveAttribute(
      'action',
      'https://demo-request.example.invalid/submit',
    );
    await expect(page.locator('form .privacy-check a')).toHaveAttribute(
      'href',
      'https://privacy.example.invalid/demo-request',
    );
    const accessibility = await new AxeBuilder({ page })
      .include('.site-footer__information')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await navigation.screenshot({
      path: test.info().outputPath(`review-footer-${locale}.png`),
    });
  });
}
