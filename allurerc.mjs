import { defineConfig } from 'allure';

export default defineConfig({
  name: 'Allure Report',
  output: './allure-report',
  historyPath: './history.jsonl',
  appendHistory: true,
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
      matcher: ({ labels }) => labels.find(({ name, value }) => name === 'os' && value === 'Windows'),
      variables: {
        OS: 'Windows 11',
        Architecture: 'x64',
      },
    },
    macos: {
      matcher: ({ labels }) => labels.find(({ name, value }) => name === 'os' && value === 'macOS'),
      variables: {
        OS: 'macOS',
        Architecture: 'arm64',
      },
    },
    linux: {
      matcher: ({ labels }) => labels.find(({ name, value }) => name === 'os' && value === 'Linux'),
      variables: {
        OS: 'Ubuntu 22.04',
        Architecture: 'x64',
      },
    },
  },
});
