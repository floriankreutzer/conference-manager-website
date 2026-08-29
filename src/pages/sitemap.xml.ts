import type { APIRoute } from 'astro';

import { getSeoConfig } from '@config/seo';
import { getIndexablePublicPaths } from '@domain/seo/publicRoutes';

export const prerender = true;

export const GET: APIRoute = () => {
  const config = getSeoConfig({
    preview: import.meta.env.PUBLIC_PREVIEW === 'true',
    development: import.meta.env.DEV,
    siteOrigin: import.meta.env.PUBLIC_SITE_ORIGIN,
  });

  const urls = config.indexable
    ? getIndexablePublicPaths().map(
        (path) => `  <url><loc>${new URL(path, config.siteOrigin).toString()}</loc></url>`,
      )
    : [];

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
