import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { Fixture } from '@fixtures/world';
import TodoPage from '@pages/TodoPage';
import { chromium, request } from '@playwright/test';

/**
 * Browser Loader
 * @param this
 * @param world
 * @returns {Promise<void>}
 * @description Initializes the browser, context, page, and API request context based on the test type (API or UI).
 */
export async function browserload(this: Fixture, world: ITestCaseHookParameter): Promise<void> {
  const isApiTest = world.pickle.tags.some(tag => tag.name === '@api');

  if (isApiTest) {
    this.request = await request.newContext();
    return;
  }

  const headless = process.env.HEADLESS === 'false' ? false : true;
  this.browser = await chromium.launch({ headless, timeout: 60000 });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.request = await request.newContext();
}

/**
 * Page Loader
 * @param this
 * @returns {Promise<void>}
 * @description Initializes page objects for UI tests.
 */
export async function pageload(this: Fixture): Promise<void> {
  this.todoPage = new TodoPage(this.page);
}
