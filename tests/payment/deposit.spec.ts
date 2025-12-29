import { test, expect } from '@playwright/test';

// test.describe('Deposit', () => {
//   test(
//     'User can access Deposit page',
//     { tag: ['@smoke', '@regression'] },
//     async ({ page }) => {

//       // Already authenticated via project dependency

//       // Anchor: proves login worked
//       await page.getByRole('button', { name: 'Deposit Now' }).click();

//       await expect(
//         page.getByRole('heading', { name: /deposit/i })
//       ).toBeVisible();
//     }
//   );
// });
