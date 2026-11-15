import { defineConfig } from '@playwright/test';
import publicSiteConfig from './playwright.config';

export default defineConfig({
  ...publicSiteConfig,
  testDir: './e2e-demo-request',
  outputDir: './test-results/demo-request-results',
  use: {
    ...publicSiteConfig.use,
    baseURL: 'http://127.0.0.1:4332',
    javaScriptEnabled: false,
  },
  webServer: {
    // Keep the synthetic active form out of dist/, which CI can publish as a preview.
    command:
      'npm run build -- --outDir ./test-results/demo-request-site && npm run preview -- --outDir ./test-results/demo-request-site --host 127.0.0.1 --port 4332',
    url: 'http://127.0.0.1:4332/en/',
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      PUBLIC_CM_APP_ORIGIN: 'https://app.example.invalid',
      PUBLIC_PREVIEW: 'true',
      PUBLIC_SITE_ORIGIN: 'https://preview.example.invalid',
      PUBLIC_DEMO_REQUEST_ENDPOINT: 'https://demo-request.example.invalid/submit',
      PUBLIC_DEMO_PRIVACY_URL: 'https://privacy.example.invalid/demo-request',
      PUBLIC_LEGAL_NOTICE_URL_EN: 'https://information.example.invalid/en/legal/',
      PUBLIC_LEGAL_NOTICE_URL_DE: 'https://information.example.invalid/de/impressum/',
      PUBLIC_PRIVACY_URL_EN: 'https://information.example.invalid/en/privacy/',
      PUBLIC_PRIVACY_URL_DE: 'https://information.example.invalid/de/datenschutz/',
      PUBLIC_CONTACT_URL_EN: 'https://information.example.invalid/en/contact/',
      PUBLIC_CONTACT_URL_DE: 'https://information.example.invalid/de/kontakt/',
    },
  },
});
