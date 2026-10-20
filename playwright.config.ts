import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  failOnFlakyTests: true,
  workers: 2,
  reporter: 'github',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    // Exercise the built pages without development hot reloads interrupting browser checks.
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321/en/',
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      PUBLIC_CM_APP_ORIGIN: 'https://app.example.invalid',
      PUBLIC_PREVIEW: 'true',
      PUBLIC_SITE_ORIGIN: 'https://preview.example.invalid',
    },
  },
});
