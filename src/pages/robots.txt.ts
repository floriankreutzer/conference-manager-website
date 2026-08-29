import type { APIRoute } from 'astro';

import { getSeoConfig } from '@config/seo';

export const prerender = true;

export const GET: APIRoute = () => {
  const config = getSeoConfig({
    preview: import.meta.env.PUBLIC_PREVIEW === 'true',
    development: import.meta.env.DEV,
    siteOrigin: import.meta.env.PUBLIC_SITE_ORIGIN,
  });

  const lines = config.indexable
    ? [
        'User-agent: *',
        'Allow: /',
        `Sitemap: ${new URL('/sitemap.xml', config.siteOrigin).toString()}`,
      ]
    : ['User-agent: *', 'Disallow: /'];

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
