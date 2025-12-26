import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }], // CI-safe
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true,
    }]
  ],

  use: {
    headless: process.env.CI === 'true', // true on CI, false locally
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    args: process.env.CI === 'true'
      ? ['--no-sandbox', '--disable-setuid-sandbox']
      : [],
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
});
