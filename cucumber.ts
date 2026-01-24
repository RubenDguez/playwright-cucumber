import type { IConfiguration } from '@cucumber/cucumber';
import dotenv from 'dotenv';

dotenv.config({ override: true, quiet: true });

export default {
  // Paths to where your feature files are located
  // Supports glob patterns to find .feature files
  paths: [],

  // Show the full backtrace for errors
  // When true, displays complete stack traces for debugging
  backtrace: true,

  // Prepare a test run but don't execute it
  // Useful for validating step definitions without running tests
  dryRun: false,

  // Explicitly call process.exit() after the test run
  // Forces Node.js process termination when run via CLI
  forceExit: false,

  // Stop running tests when the first test fails
  // Useful for quick feedback during development
  failFast: false,

  // Name/path and output file path of each formatter to use
  // Controls how test results are displayed and where they're saved
  format: ['pretty', 'allure-cucumberjs/reporter:./allure-results/ignore.txt'],

  // Options to be provided to formatters
  // Configuration object passed to the selected formatters
  formatOptions: {
    pretty: {
      featuresAndRules: true,
    },
  },

  // Paths to where your support code is (ES modules)
  // Used when loading files with ES module syntax
  import: [],

  // Default language for your feature files
  // Supports Gherkin keywords in different languages (en, es, fr, etc.)
  language: 'en',

  // Module specifiers for loaders to be registered ahead of loading support code
  // Used for transpilation (e.g., TypeScript, Babel)
  loader: [],

  // Regular expressions of which scenario names should match to be run
  // Filters scenarios by their names using regex patterns
  name: [],

  // Run scenarios in the order defined or in random order
  // Options: 'defined' (source order) or 'random'
  order: 'defined',

  // Run tests in parallel with the given number of worker processes
  // 0 = no parallelization, >0 = number of worker processes
  // parallel: 0,

  // Paths or package names of plugins to load
  // Extends cucumber functionality with custom plugins
  plugin: [],

  // Options to be provided to plugins
  // Configuration object passed to loaded plugins
  pluginOptions: {},

  // Publish a report of your test run to https://reports.cucumber.io/
  // Shares test results on the public Cucumber Reports service
  publish: false,

  // Paths to where your support code is (CommonJS)
  // Used when loading files with CommonJS syntax (require/module.exports)
  require: ['tests/**/*.ts'],

  // Names of transpilation modules to load via require()
  // Registers modules like ts-node for TypeScript support
  requireModule: ['ts-node/register', 'tsconfig-paths/register'],

  // Retry failing tests up to the given number of times
  // Automatically re-runs failed scenarios the specified number of times
  retry: 0,

  // Tag expression to filter which scenarios can be retried
  // Only scenarios matching this tag expression will be eligible for retry
  retryTagFilter: '',

  // Run a subset of scenarios across multiple test runs
  // Format: "current/total" (e.g., "1/3" runs 1/3 of scenarios)
  shard: '',

  // Fail the test run if there are pending steps
  // When true, undefined steps cause test failure instead of being skipped
  strict: true,

  // Tag expression to filter which scenarios should be run
  // Uses cucumber tag expressions (e.g., "@smoke and not @wip")
  tags: '',

  // Parameters to be passed to your World constructor
  // Available in step definitions through this.parameters
  worldParameters: {},
} satisfies Partial<IConfiguration>;
