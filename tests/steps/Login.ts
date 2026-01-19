import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Fixture } from 'tests/support/world';

Given('I am on the Salesforce website', async function (this: Fixture) {
  await this.loginPage.navigate();
});

When('I enter valid credentials', async function (this: Fixture) {
  const username = process.env.SF_USERNAME || '';
  const password = process.env.SF_PASSWORD || '';

  if (!username || !password) {
    throw new Error('SF_USERNAME or SF_PASSWORD environment variables are not set');
  }

  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
});

When('I click the login button', async function (this: Fixture) {
  await this.loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async function (this: Fixture) {
  const isLoggedIn = await this.loginPage.isLoggedIn();
  expect(isLoggedIn).toBe(true);
});
