import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page, type Request } from '@playwright/test';
import { createHandler } from '../functions/demo-request/handler.js';

const endpoint = 'https://demo-request.example.invalid/submit';
const syntheticEnv = {
  SCW_SECRET_KEY: 'synthetic-not-a-provider-credential',
  SCW_PROJECT_ID: '00000000-0000-0000-0000-000000000000',
  SCW_TEM_REGION: 'fr-par',
  DEMO_REQUEST_SENDER_EMAIL: 'sender@example.invalid',
  DEMO_REQUEST_RECIPIENT_EMAIL: 'recipient@example.invalid',
};
const resultTitles = {
  en: {
    accepted: 'Your demo request has been accepted.',
    invalid: 'Please check your details.',
    unavailable: 'We cannot confirm your request right now.',
  },
  de: {
    accepted: 'Ihre Demo-Anfrage wurde angenommen.',
    invalid: 'Bitte prüfen Sie Ihre Angaben.',
    unavailable: 'Wir können Ihre Anfrage derzeit nicht bestätigen.',
  },
};

async function fillForm(page: Page, email = 'browser-acceptance@example.invalid') {
  await page.locator('[name="firstName"]').fill('Synthetic');
  await page.locator('[name="lastName"]').fill('Browser Acceptance');
  await page.locator('[name="email"]').fill(email);
  await page.locator('[name="company"]').fill('Native Form Synthetic Marker');
  await page.locator('[name="companySize"]').selectOption('250-999');
  await page.locator('[name="message"]').fill('<script>private-synthetic-marker</script>');
  const privacy = page.locator('[name="privacyAcknowledged"]');
  // Native keyboard input avoids pointer-action retry timers while JavaScript is
  // disabled and the mobile page is still scrolling to a newly focused field.
  await privacy.focus();
  await page.keyboard.press('Space');
  await expect(privacy).toBeChecked();
}

async function isolateEndpoint(page: Page, baseURL: string, fails = false) {
  const submissions: Request[] = [];
  const unexpectedRequests: string[] = [];
  let sendCount = 0;
  const handler = createHandler({
    env: syntheticEnv,
    // Exercise the actual HTTP handler with a local substitute for its only mail boundary.
    sendEmail: async () => {
      sendCount += 1;
      if (fails) throw new Error('synthetic ambiguous provider failure');
    },
  });
  await page.route('**/*', async (route) => {
    const request = route.request();
    if (request.url() === endpoint) {
      submissions.push(request);
      const result = await handler({
        httpMethod: request.method(),
        headers: request.headers(),
        body: request.postData(),
        isBase64Encoded: false,
      });
      await route.fulfill({
        status: result.statusCode,
        // Playwright otherwise grants CORS automatically for intercepted cross-origin
        // requests. An empty value grants nothing, so this tests native navigation
        // without silently giving a fetch implementation access to the response.
        headers: { ...result.headers, 'Access-Control-Allow-Origin': '' },
        body: result.body,
      });
      return;
    }
    if (new URL(request.url()).origin === new URL(baseURL).origin) {
      await route.continue();
      return;
    }
    unexpectedRequests.push(request.url());
    await route.abort();
  });
  return { submissions, unexpectedRequests, sendCount: () => sendCount };
}

test.describe('native demo form completion without JavaScript', () => {
  for (const locale of ['en', 'de'] as const) {
    for (const outcome of ['accepted', 'invalid', 'unavailable'] as const) {
      test(`${locale} completes a native ${outcome} submission with accessible private feedback`, async ({
        page,
        baseURL,
      }) => {
        const fixture = await isolateEndpoint(page, baseURL!, outcome === 'unavailable');
        await page.goto(`/${locale}/book-a-demo/`);
        const form = page.locator('form');
        await expect(form).toHaveAttribute('action', endpoint);
        await expect(form).toHaveAttribute('method', 'post');
        await expect(form).toHaveAttribute('aria-disabled', 'false');
        await expect(page.locator('[name="locale"]')).toHaveValue(locale);
        // A single-label email domain passes native HTML validation but is rejected by
        // the authoritative server schema, exercising a real server correction path.
        await fillForm(page, outcome === 'invalid' ? 'synthetic@example' : undefined);
        expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(
          true,
        );
        const submit = page.getByRole('button', {
          name: locale === 'de' ? 'Demo anfragen' : 'Request a demo',
          exact: true,
        });
        await submit.focus();
        const [response] = await Promise.all([
          page.waitForResponse(endpoint),
          page.keyboard.press('Enter'),
        ]);

        expect(response.status()).toBe(
          outcome === 'accepted' ? 202 : outcome === 'invalid' ? 400 : 503,
        );
        expect(response.headers()['content-type']).toBe('text/html; charset=utf-8');
        expect(response.headers()['cache-control']).toBe('no-store');
        expect(response.headers()['x-robots-tag']).toBe('noindex, nofollow');
        expect(response.headers()['content-security-policy']).toContain("default-src 'none'");
        expect(response.headers()['access-control-allow-origin']).toBe('');
        if (outcome === 'unavailable') expect(response.headers()['retry-after']).toBe('60');
        await expect(page).toHaveURL(endpoint);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page).toHaveTitle(`${resultTitles[locale][outcome]} — Conference Manager`);
        await expect(
          page.getByRole('heading', { level: 1, name: resultTitles[locale][outcome], exact: true }),
        ).toBeVisible();
        await expect(page.getByRole('main')).toContainText(
          locale === 'de' ? 'Zurück-Funktion Ihres Browsers' : 'browser’s Back button',
        );
        await expect(page.locator('script, form, input, button, iframe, img, a, link')).toHaveCount(
          0,
        );
        await expect(page.locator('body')).not.toContainText('private-synthetic-marker');
        await expect(page.locator('body')).not.toContainText('Native Form Synthetic Marker');
        await expect(page.locator('body')).not.toContainText('browser-acceptance@example.invalid');

        expect(fixture.submissions).toHaveLength(1);
        const request = fixture.submissions[0]!;
        expect(request.method()).toBe('POST');
        expect(request.isNavigationRequest()).toBe(true);
        expect(request.resourceType()).toBe('document');
        expect(request.headers()['accept']).toContain('text/html');
        expect(request.headers()['content-type']).toContain('application/x-www-form-urlencoded');
        expect(fixture.sendCount()).toBe(outcome === 'invalid' ? 0 : 1);

        await page.setViewportSize({ width: 320, height: 640 });
        // Verify the hash-authorized stylesheet actually applies in the browser.
        expect(
          await page
            .getByRole('main')
            .evaluate((element) => getComputedStyle(element).paddingInlineStart),
        ).toBe('16px');
        const baselineSize = await page
          .locator('html')
          .evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
        await page.locator('html').evaluate((element) => {
          element.style.fontSize = '200%';
        });
        const layout = await page.evaluate(() => ({
          fontSize: parseFloat(getComputedStyle(document.documentElement).fontSize),
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(layout.fontSize).toBe(baselineSize * 2);
        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

        await page.goBack();
        await expect(page).toHaveURL(new URL(`/${locale}/book-a-demo/`, baseURL).href);
        await expect(page.locator('form')).toBeVisible();
        expect(fixture.submissions).toHaveLength(1);
        expect(fixture.sendCount()).toBe(outcome === 'invalid' ? 0 : 1);
        expect(fixture.unexpectedRequests).toEqual([]);
      });
    }

    test(`${locale} keeps native required-field validation before any request`, async ({
      page,
      baseURL,
    }) => {
      const fixture = await isolateEndpoint(page, baseURL!);
      await page.goto(`/${locale}/book-a-demo/`);
      await fillForm(page);
      const privacy = page.locator('[name="privacyAcknowledged"]');
      await privacy.focus();
      await page.keyboard.press('Space');
      await expect(privacy).not.toBeChecked();
      await page.locator('button[type="submit"]').focus();
      await page.keyboard.press('Enter');
      await expect(privacy).toBeFocused();
      await expect(page).toHaveURL(new URL(`/${locale}/book-a-demo/`, baseURL).href);
      expect(fixture.submissions).toEqual([]);
      expect(fixture.sendCount()).toBe(0);
      expect(fixture.unexpectedRequests).toEqual([]);
    });
  }
});

test.describe('automated accessibility of the native result documents', () => {
  // Axe requires JavaScript timers. Keep this separate from the complete no-script
  // submission, correction, retry-prevention and browser-history checks above.
  test.use({ javaScriptEnabled: true });

  for (const locale of ['en', 'de'] as const) {
    for (const outcome of ['accepted', 'invalid', 'unavailable'] as const) {
      test(`${locale} ${outcome} has no automated WCAG A/AA violations`, async ({
        page,
        baseURL,
      }) => {
        const fixture = await isolateEndpoint(page, baseURL!, outcome === 'unavailable');
        await page.goto(`/${locale}/book-a-demo/`);
        await fillForm(page, outcome === 'invalid' ? 'synthetic@example' : undefined);
        await page.locator('button[type="submit"]').click();
        await expect(page).toHaveURL(endpoint);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(
          resultTitles[locale][outcome],
        );
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(accessibility.violations).toEqual([]);
        expect(fixture.unexpectedRequests).toEqual([]);
      });
    }
  }
});
