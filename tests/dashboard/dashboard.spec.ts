import { test, expect, Page } from '@playwright/test';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';

// test.describe('Dashboard', () => {
//   test(
//     'User sees account balance on dashboard after login',
//     { tag: ['@smoke', '@regression'] },
//     async ({ page }) => {
//       // User is already logged in via storageState
//       await page.goto('/dashboard');

//       const dashboard = new DashboardPage(page);
//       await page.waitForTimeout(5000);
//       // Verify balance section is visible
//       await dashboard.verifyBalanceIsVisible();
//     }
//   );

//    test(
//     '2 - User sees account balance on dashboard after login',
//     { tag: ['@smoke', '@regression'] },
//     async ({ page }) => {
//       // User is already logged in via storageState
//       await page.goto('/dashboard');

//       const dashboard = new DashboardPage(page);
//       await page.waitForTimeout(5000);
//       // Verify balance section is visible
//       await dashboard.verifyBalanceIsVisible();
//     }
//   );
// });

test.describe('Dashboard 2', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      storageState: 'storage/user.auth.json',
    });
    page = await context.newPage();
    await page.goto('/dashboard');
  });

  test('Dashboard validations', async () => {
    const dashboard = new DashboardPage(page);

    await test.step('User sees account balance', async () => {
      await dashboard.verifyBalanceIsVisible();
    });

    await test.step('User sees something else', async () => {
      await dashboard.verifyBalanceIsVisible();
    });
  });
});
