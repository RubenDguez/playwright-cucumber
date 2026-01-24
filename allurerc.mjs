import { defineConfig } from 'allure';
import os from 'os';

export default defineConfig({
  name: 'Allure Report',
  output: './allure-report',
  historyPath: './.history/history.jsonl',
  appendHistory: false,
  qualityGate: {
    rules: [
      {
        maxFailures: 5,
        fastFail: true,
      },
    ],
  },
  plugins: {
    awesome: {
      options: {
        reportName: 'PlayCuke',
        singleFile: false,
        reportLanguage: 'en',
        open: false,
        // charts: chartLayout,
        publish: true,
      },
    },
    dashboard: {
      options: {
        singleFile: false,
        reportName: 'PlayCuke-Dashboard',
        reportLanguage: 'en',
        // layout: defaultChartsConfig,
      },
    },
    csv: {
      options: {
        fileName: 'allure-report.csv',
      },
    },
    log: {
      options: {
        groupBy: 'none',
      },
    },
  },
  variables: {
    'App Version': '2.5.1',
    'Test Suite': 'Regression v1.2',
    'Launch Date': '2025-10-20',
    'Build Number': '#1234',
    Environment: 'Staging',
  },
  environments: {
    windows: {
      matcher: () => os.platform() === 'win32',
      variables: {
        OS: os.type(),
        Architecture: os.arch(),
      },
    },
    macos: {
      matcher: () => os.platform() === 'darwin',
      variables: {
        OS: os.type(),
        Architecture: os.arch(),
      },
    },
    linux: {
      matcher: () => os.platform() === 'linux',
      variables: {
        OS: os.type(),
        Architecture: os.arch(),
      },
    },
  },
});
