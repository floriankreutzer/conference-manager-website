import { assertDeploymentContract, validateDeploymentOrigin } from './deployment-contract.mjs';

const mode = process.argv[2];
const origin = validateDeploymentOrigin(process.argv[3] ?? '');

async function fetchText(path) {
  const response = await fetch(new URL(path, origin), {
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return { text: await response.text(), headers: Object.fromEntries(response.headers.entries()) };
}

try {
  const page = await fetchText('/en/');
  const robots = await fetchText('/robots.txt');
  const sitemap = await fetchText('/sitemap.xml');

  assertDeploymentContract({
    mode,
    origin,
    pageHtml: page.text,
    pageHeaders: page.headers,
    robotsText: robots.text,
    sitemapText: sitemap.text,
  });

  console.log(`Deployment contract passed for ${mode}: ${origin}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Deployment contract failed');
  process.exitCode = 1;
}
