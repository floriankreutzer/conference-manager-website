import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const accessibilityPaths = [
  '/en/',
  '/de/',
  '/en/book-a-demo/',
  '/de/book-a-demo/',
  '/en/company/',
  '/de/company/',
  '/en/security-trust/',
  '/de/security-trust/',
];
const routeDiscoveryPaths = ['/en/', '/de/'];
const demoPlacementSlugs = [
  '',
  'product',
  'how-it-works',
  'workplace-teams',
  'integrations',
  'pricing',
  'company',
  'security-trust',
  'insights',
  'insights/room-booking-is-only-part-of-conference-management',
  'demo',
  'book-a-demo',
] as const;

async function expectBrandVisualToLoad(page: Page, variant?: string) {
  const selector = variant
    ? `[data-brand-visual-variant="${variant}"] img`
    : '[data-brand-visual="approved-pavurel-conference"] img';
  const image = page.locator(selector).first();
  await expect(image).toBeVisible();
  await expect
    .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
    .toBeGreaterThan(0);
}

test.describe('public website contracts', () => {
  test('renders the approved customer-led Pavurel homepage narrative and restrained primary actions', async ({
    page,
  }) => {
    await page.goto('/en/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Organise meetings. Reduce the follow-up.',
      }),
    ).toBeVisible();
    await expect(page.locator('.hero__copy')).toHaveText(
      'Software for meeting preparation: bring guests, catering and equipment together in one request. Your existing room-booking system continues to handle reservations.',
    );
    await expect(page.getByText('Your systems. One meeting workflow.')).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Try it with your own meetings.',
      }),
    ).toBeVisible();
    await expect(
      page
        .locator('.primary-nav')
        .getByRole('link', { name: 'Setup & pilot', exact: true, includeHidden: true }),
    ).toHaveAttribute('href', '/en/pricing/');
    await expect(page.getByRole('link', { name: 'Book a demo' })).toHaveCount(2);
    await expect(page.locator('footer').getByRole('link', { name: 'Book a demo' })).toHaveCount(0);
    await expectBrandVisualToLoad(page, 'meeting');
    await expect(page.locator('[data-brand-visual-variant="meeting"] img')).toHaveAttribute(
      'src',
      '/assets/brand/meeting-room-960.webp',
    );
  });

  test('adds an illustrative hero preparation preview without changing the CTA contract', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en/');

    const preview = page.getByRole('complementary', {
      name: 'Illustrative preparation overview',
    });
    await expect(preview).toBeVisible();
    await expect(preview).toContainText('Customer workshop');
    await expect(preview).toContainText('18 attendees');
    await expect(preview).toContainText('Coffee-break package');
    await expect(preview).toContainText('Display & video conference');
    await expect(page.getByRole('link', { name: 'Book a demo' })).toHaveCount(2);

    const motion = await preview.evaluate((element) => ({
      animationName: getComputedStyle(element).animationName,
      opacity: getComputedStyle(element).opacity,
    }));
    expect(motion.animationName).toBe('hero-preview-in');
    expect(motion.opacity).toBe('1');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reducedMotion = await preview.evaluate(
      (element) => getComputedStyle(element).animationName,
    );
    expect(reducedMotion).toBe('none');

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(preview).toBeHidden();
    const mobileLayout = await page.locator('.hero').evaluate((hero) => {
      const visual = hero.querySelector('[data-brand-visual-variant="meeting"]');
      const image = visual?.querySelector('img');
      const overview = hero.nextElementSibling;
      const overviewItems = overview?.querySelector('.request-overview__items');
      const imageRect = image?.getBoundingClientRect();
      let imageRatio = 0;
      if (imageRect && imageRect.height > 0) {
        imageRatio = imageRect.width / imageRect.height;
      }
      let overviewColumns = 0;
      if (overviewItems) {
        const columns = getComputedStyle(overviewItems).gridTemplateColumns;
        overviewColumns = columns.split(' ').filter(Boolean).length;
      }
      return {
        heroBottom: hero.getBoundingClientRect().bottom,
        imageBottom: visual?.getBoundingClientRect().bottom ?? 0,
        imageRatio,
        overviewTop: overview?.getBoundingClientRect().top ?? 0,
        overviewColumns,
        pageOverflow:
          document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      };
    });
    expect(mobileLayout.imageBottom).toBeLessThanOrEqual(mobileLayout.heroBottom + 1);
    expect(mobileLayout.heroBottom).toBeLessThanOrEqual(mobileLayout.overviewTop + 1);
    expect(mobileLayout.imageRatio).toBeGreaterThan(1.74);
    expect(mobileLayout.imageRatio).toBeLessThan(1.81);
    expect(mobileLayout.overviewColumns).toBe(2);
    expect(mobileLayout.pageOverflow).toBe(true);

    await page.setViewportSize({ width: 320, height: 800 });
    await expect(preview).toBeHidden();
    const narrowLayout = await page.locator('.hero').evaluate((hero) => {
      const overview = hero.nextElementSibling;
      const overviewItems = overview?.querySelector('.request-overview__items');
      let overviewColumns = 0;
      if (overviewItems) {
        const columns = getComputedStyle(overviewItems).gridTemplateColumns;
        overviewColumns = columns.split(' ').filter(Boolean).length;
      }
      return {
        heroBottom: hero.getBoundingClientRect().bottom,
        overviewTop: overview?.getBoundingClientRect().top ?? 0,
        overviewColumns,
        pageOverflow:
          document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      };
    });
    expect(narrowLayout.heroBottom).toBeLessThanOrEqual(narrowLayout.overviewTop + 1);
    expect(narrowLayout.overviewColumns).toBe(2);
    expect(narrowLayout.pageOverflow).toBe(true);
  });

  test('presents the problem story as an editorial two-column sequence', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/de/');

    const grid = page.locator('.problem-grid');
    const cards = grid.locator('.problem-card');
    await expect(cards).toHaveCount(4);
    await expect(grid.locator('.problem-card__index')).toHaveText(['01', '02', '03', '04']);

    const desktop = await grid.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(desktop.columns).toBe(2);
    expect(desktop.overflow).toBe(true);

    const firstCard = await cards.first().evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      borderTopStyle: getComputedStyle(element).borderTopStyle,
    }));
    expect(firstCard.columns).toBe(2);
    expect(firstCard.borderTopStyle).toBe('solid');

    await page.setViewportSize({ width: 390, height: 844 });
    const mobile = await grid.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(mobile.columns).toBe(1);
    expect(mobile.overflow).toBe(true);
  });

  test('presents audience roles as an editorial sequence instead of a card grid', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en/');

    const audience = page.locator('.audience-grid');
    const roles = audience.locator('article');
    await expect(roles).toHaveCount(3);
    await expect(audience.locator('.audience-label')).toHaveText(['01', '02', '03']);

    const desktop = await audience.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(desktop.columns).toBe(1);
    expect(desktop.overflow).toBe(true);

    const firstRole = await roles.first().evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      borderTopStyle: getComputedStyle(element).borderTopStyle,
    }));
    expect(firstRole.columns).toBe(3);
    expect(firstRole.borderTopStyle).toBe('solid');

    await page.setViewportSize({ width: 800, height: 900 });
    const tabletGap = await audience.evaluate((element) => getComputedStyle(element).rowGap);
    expect(tabletGap).toBe('0px');

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileRole = await roles.first().evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(mobileRole.columns).toBe(2);
    expect(mobileRole.overflow).toBe(true);
  });

  test('uses a calm readiness and closing conversion rhythm across breakpoints', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en/');

    const readiness = page.locator('.readiness-strip');
    const closingContent = page.locator('.closing__content');
    const closingButton = closingContent.getByRole('link', { name: 'Book a demo' });

    const desktopReadiness = await readiness.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      borderTopStyle: getComputedStyle(element).borderTopStyle,
      borderBottomStyle: getComputedStyle(element).borderBottomStyle,
    }));
    expect(desktopReadiness.columns).toBe(2);
    expect(desktopReadiness.borderTopStyle).toBe('solid');
    expect(desktopReadiness.borderBottomStyle).toBe('solid');

    const desktopClosing = await closingContent.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(desktopClosing.columns).toBe(2);
    expect(desktopClosing.overflow).toBe(true);
    await expect(closingButton).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileReadiness = await readiness.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    const mobileClosing = await closingContent.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(mobileReadiness.columns).toBe(1);
    expect(mobileReadiness.overflow).toBe(true);
    expect(mobileClosing.columns).toBe(1);
    expect(mobileClosing.overflow).toBe(true);
    await expect(closingButton).toBeVisible();
  });

  test('uses a readable four-way system map and disables decorative motion when requested', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/de/');

    const systemMap = page.locator('.integration-map__nodes');
    const nodes = systemMap.locator('.integration-node');
    await expect(nodes).toHaveCount(4);

    const desktopLayout = await systemMap.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    expect(desktopLayout.columns).toBe(4);
    expect(desktopLayout.overflow).toBe(true);

    const reducedMotionAnimation = await nodes
      .first()
      .evaluate((element) => getComputedStyle(element, '::after').animationName);
    expect(reducedMotionAnimation).toBe('none');

    const headingAndBody = await nodes.first().evaluate((element) => {
      const heading = element.querySelector('h3');
      const body = element.querySelector('h3 + p');
      if (!(heading instanceof HTMLElement) || !(body instanceof HTMLElement)) return null;
      return {
        headingColor: getComputedStyle(heading).color,
        bodyColor: getComputedStyle(body).color,
        headingSize: Number.parseFloat(getComputedStyle(heading).fontSize),
        bodySize: Number.parseFloat(getComputedStyle(body).fontSize),
      };
    });
    expect(headingAndBody).not.toBeNull();
    expect(headingAndBody!.headingColor).not.toBe(headingAndBody!.bodyColor);
    expect(headingAndBody!.headingSize).toBeGreaterThan(headingAndBody!.bodySize);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileLayout = await systemMap.evaluate((element) => ({
      columns: getComputedStyle(element).gridTemplateColumns.split(' ').filter(Boolean).length,
      connectorDisplay: getComputedStyle(element, '::before').display,
      overflow: element.scrollWidth <= element.clientWidth + 1,
    }));
    const mobileNode = await nodes.first().evaluate((element) => ({
      connectorDisplay: getComputedStyle(element, '::before').display,
      pulseDisplay: getComputedStyle(element, '::after').display,
    }));
    expect(mobileLayout.columns).toBe(1);
    expect(mobileLayout.connectorDisplay).toBe('block');
    expect(mobileNode.connectorDisplay).toBe('block');
    expect(mobileNode.pulseDisplay).toBe('none');
    expect(mobileLayout.overflow).toBe(true);
  });

  test('uses governed Pavurel identity and restrained application-family control geometry', async ({
    page,
  }) => {
    await page.goto('/en/');

    const signet = page.locator('header .brand-lockup__signet');
    await expect(signet).toBeVisible();
    await expect(signet).toHaveAttribute('src', /pavurel-signet.*\.svg/);
    await expect(page.locator('.primary-nav a')).toHaveCount(4);
    await expect(page.locator('.primary-nav')).toContainText('Setup & pilot');
    await expect(page.locator('.primary-nav')).not.toContainText('Company');
    await expect(page.locator('.primary-nav')).not.toContainText('Pricing');
    await expect(page.locator('footer')).toContainText('Conference Manager');
    await expect(page.locator('footer')).toContainText('Pavurel');
    const tagline = page.locator('footer .brand-lockup__tagline');
    await expect(tagline).toHaveText('Workplace hospitality, thoughtfully managed.');
    await expect(tagline).toHaveAttribute('lang', 'en');

    const radius = await page
      .getByRole('link', { name: 'Book a demo' })
      .first()
      .evaluate((element) => getComputedStyle(element).borderRadius);
    expect(radius).toBe('4px');
  });

  test('explains the responsibilities of Pavurel and the customer during introduction', async ({
    page,
  }) => {
    await page.goto('/en/company/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Pavurel supports your setup.',
      }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What Pavurel handles.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What your team contributes.' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Discuss adjustments with Pavurel.' }),
    ).toBeVisible();
    await expect(
      page.getByText(/formal company-name, domain and trademark clearance/i),
    ).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Book a demo' })).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Explore setup & pilot' }).first()).toHaveAttribute(
      'href',
      '/en/pricing/',
    );
    await expectBrandVisualToLoad(page, 'preparation');
    await expect(page.locator('[data-brand-visual-variant="preparation"] img')).toHaveAttribute(
      'src',
      '/assets/brand/meeting-preparation-960.webp',
    );
  });

  test('presents Security and Trust as customer value rather than website architecture', async ({
    page,
  }) => {
    await page.goto('/en/security-trust/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Clear answers for your IT team.',
      }),
    ).toBeVisible();
    await expect(page.getByText('How do employees access Conference Manager?')).toBeVisible();
    await expect(page.getByText('What information will be exchanged?')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a demo' })).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Explore integrations' }).first()).toHaveAttribute(
      'href',
      '/en/integrations/',
    );
    await expectBrandVisualToLoad(page);
  });

  test('switches locales without creating a parallel page architecture', async ({ page }) => {
    await page.goto('/en/');
    const germanLink = page.getByRole('link', { name: /Language: DE/ });
    await expect(germanLink).toHaveAttribute('href', '/de/');
    await expect(germanLink).toHaveAttribute('hreflang', 'de');
    await expect(germanLink).toHaveAttribute('lang', 'en');
    await expect(germanLink).toHaveText('DE');

    await germanLink.click();
    await expect(page).toHaveURL(/\/de\/$/);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Besprechungen organisieren. Rückfragen reduzieren.',
      }),
    ).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    await expect(page.locator('.hero__copy')).toHaveText(
      'Die Software für Ihre Besprechungsvorbereitung: Gäste, Catering und Technik in einer Anfrage. Ihre bestehende Raumbuchung bleibt für Reservierungen zuständig.',
    );
    const tagline = page.locator('footer .brand-lockup__tagline');
    await expect(tagline).toHaveText('Workplace hospitality, thoughtfully managed.');
    await expect(tagline).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: 'Demo anfragen' }).first()).toBeVisible();
    const englishLink = page.getByRole('link', { name: /Sprache: EN/ });
    await expect(englishLink).toHaveAttribute('href', '/en/');
    await expect(englishLink).toHaveAttribute('hreflang', 'en');
    await expect(englishLink).toHaveAttribute('lang', 'de');
    await expect(englishLink).toHaveText('EN');
    await englishLink.click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('keeps sign-in as a fixed HTTPS handoff to the application', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.getByRole('link', { name: 'Sign in', exact: true })).toHaveAttribute(
      'href',
      'https://app.example.invalid/login',
    );
  });

  test('keeps demo submission fail-closed without accepted deployment configuration', async ({
    page,
  }) => {
    await page.goto('/en/book-a-demo/');

    await expect(page.getByRole('status')).toContainText(
      'Demo requests are not active in this environment yet.',
    );
    await expect(page.getByRole('button', { name: 'Request a demo' })).toBeDisabled();
    await expect(page.getByLabel(/Business email/)).toBeDisabled();
  });

  test('does not introduce page-level horizontal overflow on the responsive shell', async ({
    page,
  }) => {
    await page.goto('/en/company/');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });

  test('keeps the compact navigation operable by keyboard across breakpoints', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/');
    const toggle = page.getByRole('banner').getByRole('button', { name: 'Menu', exact: true });
    const navigation = page.locator('.primary-nav');
    const firstLink = navigation.locator('a').first();

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(navigation).toBeHidden();
    await expect(toggle).toBeFocused();

    await page.setViewportSize({ width: 1365, height: 900 });
    await expect(toggle).toBeHidden();
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toBeFocused();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(navigation).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test('keeps navigation, pilot terms and demo links usable without JavaScript', async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    try {
      const page = await context.newPage();
      await page.goto(new URL('/de/', baseURL).href);
      await expect(page.locator('.nav-toggle')).toBeHidden();
      for (const link of await page.locator('.primary-nav a').all()) {
        await expect(link).toBeVisible();
      }
      const terms = page.locator('#pilot');
      await expect(terms).toContainText('einmalig kostenpflichtig');
      await expect(terms).toContainText('30 Tage');
      await expect(terms.getByRole('link')).toHaveAttribute('href', '/de/pricing/');
      await page
        .locator('.closing')
        .getByRole('link', { name: 'Demo anfragen', exact: true })
        .click();
      await expect(page).toHaveURL(/\/de\/book-a-demo\/$/);
    } finally {
      await context.close();
    }
  });
});

test.describe('demo request placement', () => {
  for (const locale of ['en', 'de'] as const) {
    test(`${locale} keeps demo requests in the header and only the home and pilot closing sections`, async ({
      page,
    }) => {
      for (const slug of demoPlacementSlugs) {
        const path = slug ? `/${locale}/${slug}/` : `/${locale}/`;
        await test.step(path, async () => {
          await page.goto(path);
          const requests = await page.locator('a[href]').evaluateAll((links, demoPath) => {
            const sections = Array.from(document.querySelectorAll('main section'));
            const finalSection = sections.at(-1);
            return links
              .filter((link) => {
                const href = link.getAttribute('href');
                if (!href || href.startsWith('#')) return false;
                const destination = new URL(href, document.baseURI);
                return (
                  destination.origin === window.location.origin &&
                  destination.pathname.replace(/\/+$/, '') === demoPath
                );
              })
              .map((link) => ({
                header: Boolean(link.closest('.site-header')),
                main: Boolean(link.closest('main')),
                footer: Boolean(link.closest('footer')),
                inFinalSection: finalSection?.contains(link) ?? false,
              }));
          }, `/${locale}/book-a-demo`);

          const headerCount = slug === 'book-a-demo' ? 0 : 1;
          const contentCount = slug === '' || slug === 'pricing' ? 1 : 0;
          expect(requests.filter((link) => link.header)).toHaveLength(headerCount);
          expect(requests.filter((link) => link.main)).toHaveLength(contentCount);
          expect(requests.filter((link) => link.footer)).toHaveLength(0);
          expect(requests).toHaveLength(headerCount + contentCount);
          for (const link of requests.filter((request) => request.main)) {
            expect(link.inFinalSection).toBe(true);
          }
        });
      }
    });
  }
});

test.describe('route integrity', () => {
  test('all discoverable internal links resolve successfully', async ({ page, request }) => {
    const internalPaths = new Set<string>();

    for (const discoveryPath of routeDiscoveryPaths) {
      await page.goto(discoveryPath);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((links) =>
          links
            .map((link) => link.getAttribute('href'))
            .filter((href): href is string => Boolean(href)),
        );

      for (const href of hrefs) {
        if (!href.startsWith('/') || href.startsWith('//')) continue;
        const url = new URL(href, 'http://127.0.0.1:4321');
        internalPaths.add(`${url.pathname}${url.search}`);
      }
    }

    expect(internalPaths.size).toBeGreaterThan(0);

    for (const path of internalPaths) {
      const response = await request.get(path);
      expect(response.ok(), `Expected internal route ${path} to resolve`).toBe(true);
    }
  });

  test('repository-owned image assets resolve successfully', async ({ request }) => {
    for (const path of [
      '/assets/brand/hero-conference-400.webp',
      '/assets/brand/workplace-boardroom-400.webp',
      '/assets/brand/hospitality-service-480.webp',
      '/assets/brand/about-hospitality-400.webp',
      '/assets/brand/meeting-room-1440.webp',
      '/assets/brand/meeting-catering-800.webp',
      '/assets/brand/meeting-preparation-1280.webp',
    ]) {
      const response = await request.get(path);
      expect(response.ok(), `Expected image ${path} to resolve`).toBe(true);
      expect(response.headers()['content-type']).toContain('image/webp');
    }
  });
});

test.describe('SEO and preview publication contracts', () => {
  test('publishes localized canonical, hreflang and social metadata from the configured origin', async ({
    page,
  }) => {
    const socialImageUrl = 'https://preview.example.invalid/assets/brand/meeting-room-1440.webp';

    for (const { locale, slug, imageAlt } of [
      {
        locale: 'en',
        slug: 'product',
        imageAlt: 'Illustrative meeting room with burgundy chairs and a prepared conference table.',
      },
      {
        locale: 'de',
        slug: 'insights/room-booking-is-only-part-of-conference-management',
        imageAlt:
          'Illustrativer Besprechungsraum mit bordeauxfarbenen Stühlen und vorbereitetem Besprechungstisch.',
      },
    ]) {
      const canonicalUrl = `https://preview.example.invalid/${locale}/${slug}/`;
      await page.goto(`/${locale}/${slug}/`);

      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow',
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalUrl);
      for (const alternateLocale of ['en', 'de']) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${alternateLocale}"]`),
        ).toHaveAttribute('href', `https://preview.example.invalid/${alternateLocale}/${slug}/`);
      }
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        canonicalUrl,
      );
      await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
        'content',
        'Conference Manager',
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        socialImageUrl,
      );
      await expect(page.locator('meta[property="og:image:type"]')).toHaveAttribute(
        'content',
        'image/webp',
      );
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
        'content',
        '1440',
      );
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
        'content',
        '810',
      );
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
        'content',
        imageAlt,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image',
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        'content',
        socialImageUrl,
      );
      await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
        'content',
        imageAlt,
      );
    }

    const publishedImageUrl = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content');
    expect(publishedImageUrl).not.toBeNull();
    const imageDimensions = await page.evaluate(async (imagePath) => {
      const image = new Image();
      image.src = imagePath;
      await image.decode();
      return { width: image.naturalWidth, height: image.naturalHeight };
    }, new URL(publishedImageUrl!).pathname);
    expect(imageDimensions).toEqual({ width: 1440, height: 810 });
  });

  test('publishes customer-led About metadata in both locales', async ({ page }) => {
    await page.goto('/en/company/');
    await expect(page).toHaveTitle('Pavurel supports your setup. — Conference Manager');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Learn how Pavurel prepares your Conference Manager environment, what your team contributes and how later adjustments are agreed.',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/company/',
    );
  });

  test('blocks preview crawling through robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBe(true);
    expect(await response.text()).toBe('User-agent: *\nDisallow: /\n');
  });

  test('does not expose production routes in the preview sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const xml = await response.text();

    expect(response.ok()).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).not.toContain('<url>');
    expect(xml).not.toContain('preview.example.invalid/en/');
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
