import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';

test.describe('Dashboard', () => {
  test(
    'User sees account balance on dashboard after login',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {
      // User is already logged in via storageState
      await page.goto('/dashboard');

      const dashboard = new DashboardPage(page);

      // Verify balance section is visible
      await dashboard.verifyBalanceIsVisible();
    }
  );
});