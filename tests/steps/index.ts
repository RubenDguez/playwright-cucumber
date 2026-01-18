import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from 'tests/support/world';

Given('I am on the BestBuy website', async function (this: CustomWorld) {
  await this.homePage.navigate();
});

When('I search for Headphones', async function (this: CustomWorld) {
  await this.homePage.searchForProduct('Headphones');
});

Then('I should see multiple products related the search', async function (this: CustomWorld) {
  await expect(this.homePage.resultsForText).toBeVisible();

  const products = await this.homePage.skuBlocks.all();
  expect(products.length).toBeGreaterThan(0);
});
