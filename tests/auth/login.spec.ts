import { test } from '../../src/fixtures/auth.fixture';
import { UserRole } from '../../src/constants/roles';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';
import { LoginPage } from '../../src/pages/auth/LoginPage';

const TEST_ROLE = process.env.TEST_ROLE;

/* =========================================================
   Login – Single User (Focused / Smoke)
========================================================= */

test.describe('Login – Single User', () => {
  test('Admin user can login successfully @regression @smoke', async ({ loginAs, page }) => {
    // Arrange
    const role = UserRole.ADMIN;

    // Act
    await loginAs(role);

    // Assert
    const dashboard = new DashboardPage(page);
    await dashboard.verifyDashboardLoaded();
  });
});

/* =========================================================
   Login – All Users (Regression)
========================================================= */

test.describe('Login – All Users', () => {
  for (const role of Object.values(UserRole)) {
    if (TEST_ROLE && TEST_ROLE !== role) continue;

    test(`${role} user can login successfully @regression`, async ({ loginAs, page }) => {
      // Act
      await loginAs(role);

      // Assert
      const dashboard = new DashboardPage(page);
      await dashboard.verifyDashboardLoaded();
    });
  }
});

/* =========================================================
   Login – Negative
========================================================= */

test.describe('Login – Negative', () => {
  test('Login fails with invalid credentials @smoke', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.openLoginPage();
    await loginPage.login('wrong@test.com', 'wrong123');

    // Assert
    await loginPage.verifyLoginFailed();
  });
});
