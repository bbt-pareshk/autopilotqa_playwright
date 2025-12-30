import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,

  reporter: [
    ['list'],
    [
      'html',
      {
        open: !process.env.CI ? 'always' : 'never', // open HTML report only on local runs
      },
    ],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        // open: false, // optional, prevents Allure from opening automatically
      },
    ],
  ],

  use: {
    headless: process.env.CI === 'true',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
        baseURL: process.env.BASE_URL || 'https://qa.hocodev.co/', // fallback if env not set
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
      dependencies: ['setup'],
      testIgnore: /.*login\.spec\.ts/, // IMPORTANT LINE
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        baseURL: process.env.BASE_URL || 'https://qa.hocodev.co/', // fallback if env not set
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
    dependencies: ['setup'],
    testMatch: /.*login\.spec\.ts/,
    use: {
      browserName: 'chromium',
      channel: 'chrome',
      baseURL: process.env.BASE_URL || 'https://qa.hocodev.co/', 
      storageState: undefined, // KEY LINE
    },
  },
  ],
});

