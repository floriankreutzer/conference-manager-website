import { expect, test } from '@playwright/test';
import { getIndexablePublicPaths } from '../src/domain/seo/publicRoutes';

const paths = [
  ...getIndexablePublicPaths(),
  ...(['en', 'de'] as const).flatMap((locale) => [
    `/${locale}/demo/`,
    `/${locale}/insights/room-booking-is-only-part-of-conference-management/`,
  ]),
];

for (const path of paths) {
  test(`${path} shares the hero hierarchy, alignment and image height`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('.page-hero')).toHaveCount(1);
    await expect(page.locator('.page-intro__lead')).toBeVisible();

    const geometry = await page.locator('.page-hero').evaluate((hero) => {
      const intro = hero.querySelector('.page-intro')!;
      const title = intro.querySelector('h1')!;
      const lead = intro.querySelector('.page-intro__lead')!;
      const eyebrow = intro.querySelector('.eyebrow')!;
      const image = hero.querySelector('.page-hero__media img');
      const styles = getComputedStyle(hero);
      const titleStyles = getComputedStyle(title);
      const titleRect = title.getBoundingClientRect();
      const introRect = intro.getBoundingClientRect();
      const imageRect = image?.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      const headerRect = document.querySelector('.site-header')!.getBoundingClientRect();
      return {
        titleFont: titleStyles.fontFamily,
        titleSize: titleStyles.fontSize,
        titleWeight: titleStyles.fontWeight,
        titleLeading: titleStyles.lineHeight,
        titleTracking: titleStyles.letterSpacing,
        leadSize: getComputedStyle(lead).fontSize,
        introTop: introRect.top,
        eyebrowTop: eyebrow.getBoundingClientRect().top,
        titleLeft: titleRect.left,
        leadLeft: lead.getBoundingClientRect().left,
        heroLeft: heroRect.left,
        headerBottom: headerRect.bottom,
        topSpace: parseFloat(styles.paddingBlockStart),
        heroBottom: heroRect.bottom,
        titleBottom: titleRect.bottom,
        leadTop: lead.getBoundingClientRect().top,
        imageTop: imageRect?.top,
        imageHeight: imageRect?.height,
        imageBottom: imageRect?.bottom,
        nextTop: hero.nextElementSibling?.getBoundingClientRect().top,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });
    // Compare every route with the same-width homepage: tokens alone would not
    // catch a template overriding the values or vertically centring its intro.
    await page.goto(path.startsWith('/de/') ? '/de/' : '/en/');
    const reference = await page.locator('.page-hero').evaluate((hero) => {
      const title = getComputedStyle(hero.querySelector('h1')!);
      return {
        titleSize: title.fontSize,
        titleLeading: title.lineHeight,
        titleTracking: title.letterSpacing,
        leadSize: getComputedStyle(hero.querySelector('.page-intro__lead')!).fontSize,
        imageHeight: hero.querySelector('img')!.getBoundingClientRect().height,
      };
    });
    expect(geometry.titleFont).toContain('Manrope');
    expect(geometry.titleWeight).toBe('700');
    expect(geometry.titleSize).toBe(reference.titleSize);
    expect(geometry.titleLeading).toBe(reference.titleLeading);
    expect(geometry.titleTracking).toBe(reference.titleTracking);
    expect(geometry.leadSize).toBe(reference.leadSize);
    expect(geometry.introTop - geometry.headerBottom).toBeCloseTo(geometry.topSpace, 0);
    expect(geometry.eyebrowTop).toBeCloseTo(geometry.introTop, 0);
    expect(geometry.titleLeft).toBeCloseTo(geometry.heroLeft, 0);
    expect(geometry.leadLeft).toBeCloseTo(geometry.titleLeft, 0);
    expect(geometry.titleBottom).toBeLessThanOrEqual(geometry.leadTop);
    expect(geometry.overflow).toBe(false);
    if (geometry.imageHeight !== undefined) {
      expect(geometry.imageHeight).toBeCloseTo(reference.imageHeight, 0);
      expect(geometry.imageBottom!).toBeLessThanOrEqual(geometry.heroBottom);
      if (test.info().project.name === 'chromium-desktop') {
        expect(geometry.imageTop).toBeCloseTo(geometry.introTop, 0);
      }
    }
    if (geometry.nextTop !== undefined) {
      expect(geometry.nextTop).toBeGreaterThanOrEqual(geometry.heroBottom - 1);
    }
  });
}

for (const width of [320, 640, 844]) {
  test(`all localized heroes reflow at ${width}px with reduced motion and no JavaScript`, async ({
    browser,
  }) => {
    // 640 CSS pixels also cover the existing 1280px / 200% zoom-equivalent contract.
    const context = await browser.newContext({
      viewport: { width, height: width === 844 ? 390 : 900 },
      javaScriptEnabled: false,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    for (const path of paths) {
      await page.goto(`http://127.0.0.1:4321${path}`);
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator('.page-intro__lead')).toBeVisible();
      const reflow = await page.locator('.page-intro').evaluate((intro) => ({
        width: intro.clientWidth,
        contentWidth: intro.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth,
      }));
      expect(reflow.contentWidth, path).toBeLessThanOrEqual(reflow.width + 1);
      expect(reflow.pageWidth, path).toBeLessThanOrEqual(reflow.viewportWidth + 1);
    }
    await context.close();
  });
}
