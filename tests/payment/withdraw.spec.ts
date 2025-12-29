import { test, expect } from '@playwright/test';

/*
=========================================================
 Withdraw – Logged-in User
 Purpose:
 - Validate Withdraw page is accessible
 - Uses same login session
=========================================================
*/

// test.use({
//   storageState: 'storage/auth/admin.json',
// });

// test.describe('Withdraw', () => {
//   test(
//     'User can access Withdraw page',
//     { tag: ['@smoke', '@regression'] },
//     async ({ page }) => {

//       // Arrange
//       await page.goto('https://qa.hocodev.co/');

//       // Act
//       await page.getByRole('link', { name: 'Withdraw', exact: true }).click();

//       // Assert
//       await expect(
//         page.getByRole('heading', { name: /withdraw/i })
//       ).toBeVisible();
//     }
//   );
// });
