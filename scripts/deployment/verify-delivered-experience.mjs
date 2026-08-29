import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { validateDeploymentOrigin } from './deployment-contract.mjs';
import { assertDeliveredExperience } from './experience-contract.mjs';

const origin = validateDeploymentOrigin(process.argv[2] ?? '');
const artifactDir = 'artifacts/delivered-experience';
const routes = ['/en/', '/de/'];
const lcpSampleCount = 3;

await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const externalFontRequests = new Set();

async function measureRoute(route, screenshotName) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    serviceWorkers: 'block',
  });
  const page = await context.newPage();

  page.on('request', (request) => {
    if (request.resourceType() !== 'font') return;
    const requestUrl = new URL(request.url());
    if (requestUrl.origin !== origin) externalFontRequests.add(request.url());
  });

  await page.addInitScript(() => {
    const state = { cls: 0, lcp: 0 };
    window.__conferenceManagerExperience = state;

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) state.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });

    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const latest = entries.at(-1);
      if (latest) state.lcp = latest.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  const response = await page.goto(new URL(route, origin).href, {
    waitUntil: 'networkidle',
    timeout: 30_000,
  });
  if (!response?.ok()) throw new Error(`${route} returned HTTP ${response?.status() ?? 'unknown'}`);

  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  const metrics = await page.evaluate(() => window.__conferenceManagerExperience);
  if (!metrics || !Number.isFinite(metrics.lcp) || metrics.lcp <= 0) {
    throw new Error(`No valid LCP was observed for ${route}`);
  }

  if (screenshotName) {
    await page.screenshot({ path: `${artifactDir}/${screenshotName}`, fullPage: true });
  }

  await context.close();
  return metrics;
}

async function verifyReflow() {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(new URL('/en/', origin).href, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.documentElement.style.zoom = '2';
  });

  const result = await page.evaluate(() => {
    const heading = document.querySelector('h1');
    const primaryAction = document.querySelector('a[href$="/book-a-demo/"]');
    const visible = (element) => {
      if (!(element instanceof HTMLElement)) return false;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
    };

    return {
      primaryHeadingVisible: visible(heading),
      primaryActionVisible: visible(primaryAction),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });

  await page.screenshot({ path: `${artifactDir}/en-200-percent.png`, fullPage: true });
  await context.close();
  return result;
}

try {
  const enSamples = [];
  let enCls = 0;
  for (let index = 0; index < lcpSampleCount; index += 1) {
    const metrics = await measureRoute('/en/', index === 0 ? 'en-desktop.png' : null);
    enSamples.push(metrics.lcp);
    enCls = Math.max(enCls, metrics.cls);
  }

  const deMetrics = await measureRoute('/de/', 'de-desktop.png');
  const reflow = await verifyReflow();

  const result = assertDeliveredExperience({
    lcpSamples: enSamples,
    clsByRoute: { '/en/': enCls, '/de/': deMetrics.cls },
    externalFontRequests: [...externalFontRequests],
    reflow,
  });

  console.log('Delivered experience acceptance passed.');
  console.log(`Origin: ${origin}`);
  console.log(`Median cold-navigation lab LCP: ${result.medianLcp.toFixed(0)}ms`);
  console.log(`EN CLS: ${result.clsByRoute['/en/'].toFixed(3)}`);
  console.log(`DE CLS: ${result.clsByRoute['/de/'].toFixed(3)}`);
  console.log('External font requests: 0');
  console.log('200% reflow: passed');
  console.log('Note: these are controlled lab measurements, not field Core Web Vitals.');
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Delivered experience acceptance failed');
  process.exitCode = 1;
} finally {
  await browser.close();
}
