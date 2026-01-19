import { expect, Locator, Page } from '@playwright/test';

export default class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Log In' });
  }

  get userProfileButton(): Locator {
    return this.page.getByRole('button', { name: 'View profile' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://argenisdominguez-dev-ed.develop.my.salesforce.com/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await expect(this.userProfileButton).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }
}
