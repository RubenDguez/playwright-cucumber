import { Fixture } from '@fixtures/world';
import TodoPage from '@pages/TodoPage';
import { chromium, request } from '@playwright/test';

/**
 * Browser Loader
 * @param this
 * @returns {Promise<void>}
 * @description Initializes the browser, context, page, and API request context based on the test type (API or UI).
 */
export async function browser(this: Fixture): Promise<void> {
  const headless = process.env.HEADLESS === 'false' ? false : true;
  this.browser = await chromium.launch({ headless, timeout: 60000 });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.request = await request.newContext();
}

/**
 * API Loader
 * @param this
 * @returns {Promise<void>}
 * @description Initializes the API request context for API tests.
 */
export async function api(this: Fixture): Promise<void> {
  this.request = await request.newContext();
}

/**
 * Pages Loader
 * @param this
 * @returns {Promise<void>}
 * @description Initializes page objects for UI tests.
 */
export async function pages(this: Fixture): Promise<void> {
  this.todoPage = new TodoPage(this.page);
}

/**
 * Teardown
 * @param this
 * @returns {Promise<void>}
 * @description Cleans up resources after each scenario, including closing the request context, page, context, and browser.
 */
export async function teardown(this: Fixture): Promise<void> {
  if (this.request) await this.request.dispose();
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
}
