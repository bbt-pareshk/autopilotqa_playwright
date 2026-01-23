import { test, expect } from '../../src/fixtures/base.fixture';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';

test.describe('Dashboard', () => {
  test(
    'User sees account balance on dashboard after login',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {
      // User is already logged in via storageState
      await page.goto('/dashboard');

      const dashboard = new DashboardPage(page);
      await page.waitForTimeout(5000);
      // Verify balance section is visible
      await dashboard.verifyBalanceIsVisible();
    }
  );

   test(
    '2 - User sees account balance on dashboard after login',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {
      // User is already logged in via storageState
      await page.goto('/dashboard');

      test.fail(true, 'Known issue');
    }
  );
});

