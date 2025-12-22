import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { ENV } from '../../config/env';
import { MESSAGES } from '../../constants/messages';

export class LoginPage extends BasePage {
  private readonly signInLink: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.signInLink = page.getByRole('link', { name: /^sign in$/i });
    this.usernameInput = page.getByPlaceholder(/email|username/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.signInButton = page.getByRole('button', { name: /^sign in$/i });
    this.errorMessage = page.getByText(MESSAGES.LOGIN_FAILED);
  }

  async openLoginPage() {
    await this.goto(ENV.BASE_URL);
    await this.click(this.signInLink);
    await this.waitForVisible(this.usernameInput);
  }

  async login(username: string, password: string) {
    await this.stableFill(this.usernameInput, username);
    await this.stableFill(this.passwordInput, password);

    // Real user submit
    await this.click(this.signInButton);
  }

  async verifyLoginFailed() {
    await this.expectVisible(this.errorMessage);
  }
}
