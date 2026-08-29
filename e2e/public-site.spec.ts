import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const accessibilityPaths = [
  '/en/',
  '/de/',
  '/en/book-a-demo/',
  '/de/book-a-demo/',
  '/en/company/',
  '/de/company/',
];
const routeDiscoveryPaths = ['/en/', '/de/'];

test.describe('public website contracts', () => {
  test('renders the approved customer-led Pavurel homepage narrative and primary actions', async ({
    page,
  }) => {
    await page.goto('/en/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Make every workplace conference feel effortless.',
      }),
    ).toBeVisible();
    await expect(
      page.getByText('Keep your room booking. Replace the coordination around it.'),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Operational precision, with a more considered workplace experience.',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'About Pavurel' })).toHaveAttribute(
      'href',
      '/en/company/',
    );
    await expect(page.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
  });

  test('uses governed Pavurel identity and restrained application-family control geometry', async ({
    page,
  }) => {
    await page.goto('/en/');

    const signet = page.locator('header .brand-lockup__signet');
    await expect(signet).toBeVisible();
    await expect(signet).toHaveAttribute('src', /^data:image\/svg\+xml,/);
    await expect(page.locator('.primary-nav a')).toHaveCount(6);
    await expect(page.locator('.primary-nav')).toContainText('Company');
    await expect(page.locator('.primary-nav')).not.toContainText('Pricing');
    await expect(page.locator('footer')).toContainText('Conference Manager');
    await expect(page.locator('footer')).toContainText('by Pavurel');

    const radius = await page
      .getByRole('link', { name: 'Book a demo' })
      .first()
      .evaluate((element) => getComputedStyle(element).borderRadius);
    expect(radius).toBe('4px');
  });

  test('provides a dedicated customer-facing Pavurel company destination', async ({ page }) => {
    await page.goto('/en/company/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Conference Manager is the product. Pavurel is the endorsement behind it.',
      }),
    ).toBeVisible();
    await expect(page.getByText('Conference Manager is the product. by Pavurel is the endorsement.')).toBeVisible();
    await expect(page.getByText(/operational precision with warm workplace hospitality/i)).toBeVisible();
    await expect(page.getByText(/formal company-name, domain and trademark clearance/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a demo' }).first()).toHaveAttribute(
      'href',
      '/en/book-a-demo/',
    );
  });

  test('switches locales without creating a parallel page architecture', async ({ page }) => {
    await page.goto('/en/');
    const germanLink = page.getByRole('link', { name: /Language: DE/ });
    await expect(germanLink).toHaveAttribute('href', '/de/');

    await germanLink.click();
    await expect(page).toHaveURL(/\/de\/$/);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Damit sich professionelle Konferenzen einfach anfühlen.',
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Demo anfragen' }).first()).toBeVisible();
  });

  test('keeps Login as a fixed HTTPS handoff to the application', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.getByRole('link', { name: 'Login', exact: true })).toHaveAttribute(
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
    await page.goto('/en/');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  });
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
});

test.describe('SEO and preview publication contracts', () => {
  test('publishes localized canonical, hreflang and social metadata from the configured origin', async ({
    page,
  }) => {
    await page.goto('/en/product/');

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/en/product/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute(
      'href',
      'https://preview.example.invalid/de/product/',
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://preview.example.invalid/en/product/',
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'Conference Manager',
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
  });

  test('publishes customer-led Company metadata in both locales', async ({ page }) => {
    await page.goto('/en/company/');
    await expect(page).toHaveTitle(
      'Conference Manager is the product. Pavurel is the endorsement behind it. — Conference Manager',
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Pavurel brand direction/,
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
