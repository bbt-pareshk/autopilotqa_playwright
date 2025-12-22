import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class DashboardPage extends BasePage {
  private readonly myAccountLink: Locator;

  constructor(page: Page) {
    super(page);

    // Robust locator (ignores icons)
    this.myAccountLink = page.getByRole('link', {
      name: /my account/i
    });
  }

  /* ---------------------------
     Assertions
  ---------------------------- */

  async verifyDashboardLoaded() {
    await expect(
      this.myAccountLink,
      'Dashboard should be visible after login'
    ).toBeVisible({ timeout: 10000 });
  }

  /* ---------------------------
     Actions (optional)
  ---------------------------- */

  async openMyAccount() {
    await this.myAccountLink.click();
  }
}
