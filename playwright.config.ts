import { defineConfig } from '@playwright/test';
import { ENV } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,

  // 🔹 Keep your local behavior, add CI retries safely
  retries: process.env.CI ? 2 : 0,

  // 🔹 Optional but recommended for CI stability
  workers: process.env.CI ? 4 : undefined,

  globalSetup: './tests/setup/global-setup.ts',

  reporter: [
    ['list'],

    // 🔹 HTML Report (unchanged behavior)
    [
      'html',
      {
        open: !process.env.CI ? 'always' : 'never',
      },
    ],

    // 🔹 Allure Report (UNCHANGED – already correct)
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
      },
    ],

    // 🔹 ADD: JUnit (CI / GitHub Actions)
    [
      'junit',
      {
        outputFile: 'results/junit.xml',
      },
    ],

    // 🔹 ADD: JSON (Optional, future dashboards)
    [
      'json',
      {
        outputFile: 'results/results.json',
      },
    ],
  ],

  use: {
    headless: process.env.CI === 'true',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // 🔹 Your choice is GOOD – keep it
    trace: 'on-first-retry',
  },

  projects: [
    // 🔹 PREPARE-AUTH PROJECT (LOGIN ONCE)
    {
      name: 'prepare-auth',
      testMatch: /.*\.setup\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: ENV.BASE_URL,

        launchOptions:
          process.env.CI === 'true'
            ? {
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
            : {},
      },
    },

    // 🔹 AFTER-LOGIN PROJECT (REUSE LOGIN)
    {
      name: 'after-login',
      dependencies: ['prepare-auth'],
      testIgnore: /.*login\.spec\.ts/, // ✅ DO NOT TOUCH
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: ENV.BASE_URL,
        storageState: 'storage/user.auth.json',

        launchOptions:
          process.env.CI === 'true'
            ? {
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
            : {},
      },
    },

    // 🔹 BEFORE-LOGIN PROJECT (LOGIN TESTS)
    {
      name: 'before-login',
      dependencies: ['prepare-auth'],
      testMatch: /.*login\.spec\.ts/,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: ENV.BASE_URL,

        // ✅ CRITICAL — keep as-is
        storageState: undefined,
      },
    },
  ],
});
