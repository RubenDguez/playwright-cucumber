import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { Fixture } from 'tests/support/world';
import { chromium } from '@playwright/test';
import LoginPage from '@pages/Login';
import chalk from 'chalk';

/**
 * BeforeAll hook - Runs once before all scenarios in the test run
 * Used for global setup that should happen once across all tests
 * Examples: Starting servers, initializing test data, setting up databases
 */
BeforeAll(async function () {
  // Global setup code here
});

/**
 * Before hook - Runs before each individual scenario
 * Used for scenario-level setup like browser initialization, navigation, etc.
 * This is where you typically set up the test environment for each scenario
 */
Before(async function (this: Fixture) {
  this.browser = await chromium.launch({ headless: true, timeout: 60000 });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.loginPage = new LoginPage(this.page);
});

/**
 * BeforeStep hook - Runs before each individual step within scenarios
 * Used for step-level preparation, logging, or state validation
 * Can be useful for debugging or adding custom behavior before each step execution
 */

BeforeStep(function ({ gherkinDocument, pickleStep }) {
  const featureChildren = gherkinDocument?.feature?.children ?? [];

  for (const child of featureChildren) {
    if (child.scenario) {
      const steps = child.scenario.steps ?? [];
      const gherkinStep = steps.find(s => s.text === pickleStep.text);

      if (gherkinStep) {
        this.currentStepKeyword = gherkinStep.keyword.trim();
        return;
      }
    }
  }
});

/**
 * AfterStep hook - Runs after each individual step within scenarios
 * Used for step-level cleanup, screenshot capture on failures, or logging
 * Currently captures screenshots when steps fail for debugging purposes
 */
AfterStep(async function (this: Fixture, { result, pickleStep }) {
  const keyword = this.currentStepKeyword ?? '';
  const stepText = pickleStep.text;

  if (!result) return;

  const fullStep = `${keyword} ${stepText}`;

  switch (result.status) {
    case Status.PASSED:
      console.log(chalk.green(`✔ ${fullStep}`));
      break;

    case Status.FAILED:
      this.attach(await this.page.screenshot(), 'image/png');
      console.log(chalk.red(`✘ ${fullStep}`));
      console.error('\n' + chalk.red(result.message));
      break;

    case Status.SKIPPED:
      console.log(chalk.yellow(`↷ ${fullStep}`));
      break;

    case Status.PENDING:
      console.log(chalk.yellow(`⚠ ${fullStep}`));
      break;

    case Status.UNDEFINED:
      console.log(chalk.red(`? ${fullStep}`));
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
After(async function (this: Fixture) {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});

/**
 * AfterAll hook - Runs once after all scenarios have completed
 * Used for global cleanup that should happen once after all tests finish
 * Examples: Stopping servers, cleaning up test data, generating reports
 */
AfterAll(async function () {
  // Global cleanup code here
});
