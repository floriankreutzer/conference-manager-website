import type { APIRoute } from 'astro';

import { getSeoConfig } from '@config/seo';
import { getIndexablePublicPaths } from '@domain/seo/publicRoutes';
import { getPublishedInsights } from '@features/insights/content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const config = getSeoConfig({
    preview: import.meta.env.PUBLIC_PREVIEW === 'true',
    development: import.meta.env.DEV,
    siteOrigin: import.meta.env.PUBLIC_SITE_ORIGIN,
  });

  const urls: string[] = [];

  if (config.indexable) {
    const insightEntries = await getPublishedInsights();
    const paths = [
      ...getIndexablePublicPaths(),
      ...insightEntries.map((entry) => `/${entry.data.locale}/insights/${entry.data.slug}/`),
    ];

    urls.push(
      ...paths.map(
        (path) => `  <url><loc>${new URL(path, config.siteOrigin).toString()}</loc></url>`,
      ),
    );
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
