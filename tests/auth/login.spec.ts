import { test } from '../../src/fixtures/auth.fixture';
import { UserRole } from '../../src/constants/roles';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';
import { LoginPage } from '../../src/pages/auth/LoginPage';

const TEST_ROLE = process.env.TEST_ROLE;


/* =========================================================
   Login – Single User (Smoke + Regression)
========================================================= */
test.describe('Login – Single User', () => {

  test(
    'Admin user can login successfully',
    { tag: ['@smoke', '@regression'] },
    async ({ loginAs, page }, testInfo) => {

      testInfo.annotations.push(
        { type: 'severity', description: 'critical' }
      );

      await loginAs(UserRole.ADMIN);

      const dashboard = new DashboardPage(page);
      await dashboard.verifyDashboardLoaded();
    }
  );
});

/* =========================================================
   Login – All Users (Regression)
========================================================= */

// test.describe('Login – All Users', () => {

//   for (const role of Object.values(UserRole)) {
//     if (TEST_ROLE && TEST_ROLE !== role) continue;

//     test(
//       `${role} user can login successfully`,
//       { tag: '@regression' },
//       async ({ loginAs, page }, testInfo) => {

//         testInfo.annotations.push(
//           { type: 'severity', description: 'normal' }
//         );

//         await loginAs(role);

//         const dashboard = new DashboardPage(page);
//         await dashboard.verifyDashboardLoaded();
//       }
//     );
//   }
// });

/* =========================================================
   Login – Negative (Smoke)
========================================================= */

test.describe('Login – Negative', () => {

  test(
    'Login fails with invalid credentials',
{ tag: '@smoke' },
    async ({ page }, testInfo) => {

      testInfo.annotations.push(
        { type: 'severity', description: 'critical' }
      );

      const loginPage = new LoginPage(page);
      await loginPage.openLoginPage();
      await loginPage.login('tonystark7', '123456');
      await loginPage.verifyLoginFailed();
    }
  );
});
