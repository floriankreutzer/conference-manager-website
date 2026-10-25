import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const examples = [
  {
    locale: 'en',
    disclosure: 'Illustrative workflow example. Not a live product view.',
    meeting: 'Customer workshop',
    date: '12 November 2026',
    tabs: ['Request', 'Coordination', 'Change'],
    request: 'Start with the information your team needs.',
    coordination: 'See what is agreed and what is still open.',
    change: 'Review the impact of a change together.',
    changedCount: 'Requested 18',
    previousCatering: 'Coffee-break package for 12',
    changedCatering: 'Coffee-break package for 18',
    costImpact: 'Six additional portions requested; review the resulting cost.',
  },
  {
    locale: 'de',
    disclosure: 'Illustratives Ablaufbeispiel. Keine Live-Ansicht.',
    meeting: 'Kundenworkshop',
    date: '12. November 2026',
    tabs: ['Anfrage', 'Abstimmung', 'Änderung'],
    request: 'Mit den Angaben starten, die Ihr Team braucht.',
    coordination: 'Sehen, was geklärt ist und was noch offen bleibt.',
    change: 'Die Folgen einer Änderung zusammen prüfen.',
    changedCount: 'Angefragt 18',
    previousCatering: 'Paket Kaffeepause für 12',
    changedCatering: 'Paket Kaffeepause für 18',
    costImpact: 'Sechs zusätzliche Portionen angefragt; entstehende Kosten prüfen.',
  },
] as const;

for (const example of examples) {
  test(`${example.locale}: explores the same meeting with pointer or touch`, async ({
    page,
    isMobile,
  }) => {
    await page.goto(`/${example.locale}/`);
    const illustration = page.locator('meeting-example');
    const request = illustration.getByRole('tab', { name: example.tabs[0], exact: true });
    const coordination = illustration.getByRole('tab', { name: example.tabs[1], exact: true });
    const change = illustration.getByRole('tab', { name: example.tabs[2], exact: true });

    await expect(illustration.getByText(example.disclosure, { exact: true })).toBeVisible();
    await expect(illustration.getByText(example.meeting, { exact: true })).toBeVisible();
    await expect(illustration.getByText(example.date, { exact: true })).toBeVisible();
    await expect(request).toHaveAttribute('aria-selected', 'true');
    await expect(illustration.getByRole('tabpanel')).toHaveCount(1);
    await expect(illustration.getByRole('tabpanel').getByText('12', { exact: true })).toBeVisible();

    if (isMobile) await coordination.tap();
    else await coordination.click();
    await expect(coordination).toHaveAttribute('aria-selected', 'true');
    await expect(illustration.getByRole('tabpanel')).toHaveAccessibleName(example.tabs[1]);
    await expect(
      illustration.getByRole('heading', { name: example.coordination, exact: true }),
    ).toBeVisible();

    if (isMobile) await change.tap();
    else await change.click();
    await expect(change).toHaveAttribute('aria-selected', 'true');
    await expect(illustration.getByRole('tabpanel')).toHaveCount(1);
    await expect(illustration.getByRole('tabpanel').getByText(example.changedCount)).toBeVisible();
    await expect(
      illustration.getByRole('tabpanel').getByText(example.previousCatering, { exact: true }),
    ).toBeVisible();
    await expect(
      illustration.getByRole('tabpanel').getByText(example.changedCatering, { exact: true }),
    ).toBeVisible();
    await expect(illustration.getByRole('tabpanel').getByText(example.costImpact)).toBeVisible();
    await expect(illustration.getByText(example.meeting, { exact: true })).toBeVisible();

    if (isMobile) await request.tap();
    else await request.click();
    await expect(request).toHaveAttribute('aria-selected', 'true');
    await expect(illustration.getByRole('tabpanel').getByText('12', { exact: true })).toBeVisible();
    await expect(illustration.getByRole('tabpanel')).not.toContainText(example.changedCatering);
  });

  test(`${example.locale}: the enhanced example has no automated WCAG A/AA violations`, async ({
    page,
  }) => {
    await page.goto(`/${example.locale}/`);
    const illustration = page.locator('meeting-example');
    await illustration.getByRole('tab', { name: example.tabs[2], exact: true }).click();

    const results = await new AxeBuilder({ page })
      .include('meeting-example')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test('supports arrow keys, Home, End and a single tab stop with visible focus', async ({
  page,
}) => {
  await page.goto('/de/');
  const illustration = page.locator('meeting-example');
  const request = illustration.getByRole('tab', { name: 'Anfrage', exact: true });
  const coordination = illustration.getByRole('tab', { name: 'Abstimmung', exact: true });
  const change = illustration.getByRole('tab', { name: 'Änderung', exact: true });

  await request.focus();
  await page.keyboard.press('ArrowRight');
  await expect(coordination).toBeFocused();
  await expect(coordination).toHaveAttribute('aria-selected', 'true');
  await expect(request).toHaveAttribute('tabindex', '-1');
  await expect(change).toHaveAttribute('tabindex', '-1');

  const focusStyle = await coordination.evaluate((element) => {
    const style = getComputedStyle(element);
    return { width: Number.parseFloat(style.outlineWidth), style: style.outlineStyle };
  });
  expect(focusStyle.width).toBeGreaterThanOrEqual(3);
  expect(focusStyle.style).toBe('solid');

  await page.keyboard.press('End');
  await expect(change).toBeFocused();
  await expect(illustration.getByRole('tabpanel')).toHaveAccessibleName('Änderung');
  await page.keyboard.press('ArrowRight');
  await expect(request).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(change).toBeFocused();
  await page.keyboard.press('Home');
  await expect(request).toBeFocused();
  await expect(illustration.getByRole('tabpanel')).toHaveAccessibleName('Anfrage');
  await page.keyboard.press('Tab');
  await expect(illustration.getByRole('tabpanel')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(request).toBeFocused();
});

test('keeps all states readable at 320px and respects reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/de/');
  const illustration = page.locator('meeting-example');

  for (const name of ['Anfrage', 'Abstimmung', 'Änderung']) {
    const tab = illustration.getByRole('tab', { name, exact: true });
    await tab.click();
    await expect(illustration.getByRole('tabpanel')).toHaveAccessibleName(name);

    const dimensions = await illustration.evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      right: element.getBoundingClientRect().right,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    expect(dimensions.right).toBeLessThanOrEqual(321);

    const control = await tab.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      transition: getComputedStyle(element).transitionDuration,
    }));
    const panelAnimation = await illustration
      .getByRole('tabpanel')
      .evaluate((element) => getComputedStyle(element).animationDuration);
    expect(control.height).toBeGreaterThanOrEqual(44);
    expect(control.transition).toBe('0s');
    expect(panelAnimation).toBe('0s');
  }
});

test.describe('Without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const example of examples) {
    test(`${example.locale}: keeps the complete example available without inactive controls`, async ({
      page,
    }) => {
      await page.goto(`/${example.locale}/`);
      const illustration = page.locator('meeting-example');

      await expect(illustration.getByText(example.disclosure, { exact: true })).toBeVisible();
      await expect(illustration.getByRole('tablist')).toHaveCount(0);
      await expect(illustration.getByRole('button')).toHaveCount(0);
      for (const name of [example.request, example.coordination, example.change]) {
        await expect(illustration.getByRole('heading', { name, exact: true })).toBeVisible();
      }
      await expect(illustration.getByText(example.changedCatering, { exact: true })).toBeVisible();
      await expect(illustration.getByText(example.costImpact, { exact: true })).toBeVisible();
    });
  }
});
