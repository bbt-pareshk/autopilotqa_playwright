import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class DashboardPage extends BasePage {
  private readonly myAccountLink: Locator;
  private readonly balanceDropdown: Locator;
  private readonly realBalance: Locator;

  constructor(page: Page) {
    super(page);

    this.myAccountLink = page.getByRole('link', { name: /my account/i });
    this.balanceDropdown = page.locator('.dropdown.dhdr-balance-view');
    this.realBalance = page.locator(
      '.hdr-dropdown-menu .hdr-balance-item:has-text("Real Balance") span.block'
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

  async verifyBalanceIsVisible() {
    await this.openMyAccount();

    await expect(
      this.realBalance,
      'Real balance should be visible'
    ).toBeVisible({ timeout: 10_000 });

    await expect(
      this.realBalance,
      'Real balance should not be empty'
    ).not.toHaveText('');
  }

  /* ---------------------------
     Actions
  ---------------------------- */

  async openMyAccount() {
    // ✅ Always try to open — Playwright handles waiting & retry
    await this.myAccountLink.scrollIntoViewIfNeeded();
    await this.myAccountLink.click({ timeout: 10_000 });

    // ✅ Assert result, not the click
    await expect(this.balanceDropdown).toBeVisible({ timeout: 10_000 });
  }

  /* ---------------------------
     Get Real Balance
  ---------------------------- */

  async getRealBalance(): Promise<string> {
    await this.openMyAccount();
    return (await this.realBalance.textContent())?.trim() ?? '';
  }
}
