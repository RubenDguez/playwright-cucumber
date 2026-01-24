import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { Fixture } from 'tests/fixtures/world';
import { chromium } from '@playwright/test';
import TodoPage from '@pages/TodoPage';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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

  this.todoPage = new TodoPage(this.page);
});

/**
 * BeforeStep hook - Runs before each individual step within scenarios
 * Used for step-level preparation, logging, or state validation
 * Can be useful for debugging or adding custom behavior before each step execution
 */

BeforeStep(function (this: Fixture) {
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
      console.error(chalk.red([result.message?.split('\n').pop()].join('\n')));

      if (process.env.CI === 'true') {
        const dirpath = path.join(process.cwd(), 'screenshot');
        if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath, { recursive: true });
        fs.writeFileSync(path.join(dirpath, crypto.randomUUID() + '.png'), await this.page.screenshot(), { encoding: 'base64', flag: 'w' });
      } else {
        this.attach(await this.page.screenshot(), 'image/png');
      }

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
