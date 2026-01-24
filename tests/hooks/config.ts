import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Status } from '@cucumber/cucumber';
import { Fixture } from '@fixtures/world';
import TodoPage from '@pages/TodoPage';
import { chromium, request } from '@playwright/test';

/**
 * BeforeAll hook - Runs once before all scenarios in the test run
 * Used for global setup that should happen once across all tests
 * Examples: Starting servers, initializing test data, setting up databases
 */
BeforeAll({ name: 'Config BeforeAll' }, async function () {
  // Global setup code here
});

/**
 * Before hook - Runs before each individual scenario
 * Used for scenario-level setup like browser initialization, navigation, etc.
 * This is where you typically set up the test environment for each scenario
 */
Before({ name: 'Config Before' }, async function (this: Fixture, world) {
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

  // Initialize Page Objects
  this.todoPage = new TodoPage(this.page);
});

/**
 * BeforeStep hook - Runs before each individual step within scenarios
 * Used for step-level preparation, logging, or state validation
 * Can be useful for debugging or adding custom behavior before each step execution
 */

BeforeStep(async function (this: Fixture) {
  // Log the current step keyword and text for debugging purposes
});

/**
 * AfterStep hook - Runs after each individual step within scenarios
 * Used for step-level cleanup, screenshot capture on failures, or logging
 * Currently captures screenshots when steps fail for debugging purposes
 */
AfterStep(async function (this: Fixture, { result }) {
  if (!result) return;

  switch (result.status) {
    case Status.FAILED:
      this.attach(await this.page.screenshot(), 'image/png');
      break;

    default:
      break;
  }
});

/**
 * After hook - Runs after each individual scenario
 * Used for scenario-level cleanup like closing browsers, clearing data, etc.
 * This ensures proper cleanup after each test scenario completes
 */
After({ name: 'Config After' }, async function (this: Fixture) {
  if (this.request) await this.request.dispose();
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

/**
 * AfterAll hook - Runs once after all scenarios have completed
 * Used for global cleanup that should happen once after all tests finish
 * Examples: Stopping servers, cleaning up test data, generating reports
 */
AfterAll({ name: 'Config AfterAll' }, async function () {
  // Global cleanup code here
});
