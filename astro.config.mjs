import { defineConfig } from 'astro/config';

const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  base,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
