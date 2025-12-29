import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class DashboardPage extends BasePage {
  private readonly myAccountLink: Locator;
  private readonly balanceDropdown: Locator;
  private readonly realBalance: Locator;
  //private readonly logout: Locator;

  constructor(page: Page) {
    super(page);

    // Account link
    this.myAccountLink = page.getByRole('link', { name: /my account/i });

    // Dropdown menu container
    this.balanceDropdown = page.locator('.dropdown.dhdr-balance-view');

    // Real Balance locator
    this.realBalance = page.locator(
      '.hdr-dropdown-menu .hdr-balance-item:has-text("Real Balance") span.block'

      // Logout locator
      //this.logout = page.locator({});
    );
  }

  /* ---------------------------
     Assertions
  ---------------------------- */

  async verifyDashboardLoaded() {
    await expect(
      this.myAccountLink,
      'Dashboard should be visible after login'
    ).toBeVisible({ timeout: 10_000 });
  }

  // Keep the method name your test uses
  async verifyBalanceIsVisible() {
    await this.openMyAccount();

    await expect(this.realBalance, 'Real balance should be visible').toBeVisible({ timeout: 10_000 });
    await expect(this.realBalance, 'Real balance should not be empty').not.toHaveText('');
  }

  /* ---------------------------
     Actions
  ---------------------------- */

  async openMyAccount() {
    if (!(await this.balanceDropdown.isVisible())) {
      await this.myAccountLink.click();
      await this.balanceDropdown.waitFor({ state: 'visible', timeout: 10_000 });
    }
  }

  /* ---------------------------
     Get Real Balance
  ---------------------------- */

  async getRealBalance(): Promise<string> {
    await this.openMyAccount();
    return (await this.realBalance.textContent())?.trim() ?? '';
  }
}
