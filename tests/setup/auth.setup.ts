import { test } from '../../src/fixtures/auth.fixture';
import { UserRole } from '../../src/constants/roles';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';

/**
 * Auth Setup
 * -----------
 * Purpose:
 * - Login once using existing login logic
 * - Persist authenticated session
 * - Used by e2e project via dependencies
 */
test('authenticate admin user', async ({ loginAs, page }, testInfo) => {
   console.log('▶ Base URL (project):', testInfo.project.use.baseURL);

  // Login using shared fixture
  await loginAs(UserRole.ADMIN);

  // Safety check to ensure login succeeded
  const dashboard = new DashboardPage(page);
  await dashboard.verifyDashboardLoaded();

  // Save authenticated browser state
  await page.context().storageState({
    path: 'storage/user.auth.json',
  });
});