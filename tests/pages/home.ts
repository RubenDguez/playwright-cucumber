import { Locator, Page } from '@playwright/test';

export default class HomePage {
  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('https://www.bestbuy.com/home');
  }

  get searchBar(): Locator {
    return this.page.getByTestId('SearchBarExtendable-TestID');
  }

  get searchButton(): Locator {
    return this.page.getByTestId('SearchButton-TestID');
  }

  get skuBlocks(): Locator {
    return this.page.locator('//body//*[@class="sku-block"]');
  }

  get resultsForText(): Locator {
    return this.page.getByText('Results for', { exact: true });
  }

  async searchForProduct(productName: string): Promise<void> {
    await this.searchBar.click();
    await this.searchBar.fill(productName);
    await this.searchButton.click();
  }

  async getSearchResultsCount(): Promise<number> {
    const products = await this.skuBlocks.all();
    return products.length;
  }
}
