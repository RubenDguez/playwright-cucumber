import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Status } from '@cucumber/cucumber';
import { Fixture } from '@fixtures/world';
import fs from 'fs';
import path from 'path';
import { api, browser, pages, teardown } from './Loaders';

const tempDir = path.join(process.cwd(), 'temp');

/**
 * BeforeAll hook - Runs once before all scenarios in the test run
 * Used for global setup that should happen once across all tests
 * Examples: Starting servers, initializing test data, setting up databases
 */
BeforeAll({ name: 'Setup BeforeAll' }, async function () {
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
});

/**
 * Before hook - Runs before each individual scenario
 * Used for scenario-level setup like browser initialization, navigation, etc.
 * This is where you typically set up the test environment for each scenario
 */
Before({ name: 'Configure UI', tags: '@ui' }, async function (this: Fixture) {
  await browser.call(this);
  await pages.call(this);
});

Before({ name: 'Configure API', tags: '@api' }, async function (this: Fixture) {
  await api.call(this);
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
After({ name: 'Teardown' }, async function (this: Fixture) {
  await teardown.call(this);
});

/**
 * AfterAll hook - Runs once after all scenarios have completed
 * Used for global cleanup that should happen once after all tests finish
 * Examples: Stopping servers, cleaning up test data, generating reports
 */
AfterAll({ name: 'Setup AfterAll' }, async function () {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
});
