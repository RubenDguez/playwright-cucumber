---
name: project-setup
description: Guide for setting up and configuring this Playwright-Cucumber project. Use this when asked about project initialization, dependencies, or development environment setup.
---

# Project Setup and Configuration Guide

This guide covers setup, configuration, and development environment preparation for this Playwright-Cucumber project.

## Project Dependencies

### Core Testing Framework
- **@cucumber/cucumber**: BDD testing framework
- **@playwright/test**: Browser automation and testing
- **allure-cucumberjs**: Test reporting and documentation
- **ts-node**: TypeScript execution for Node.js

### Development Tools
- **TypeScript**: Type safety and modern JavaScript features
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting
- **Lefthook**: Git hooks for pre-commit checks

## Environment Setup

### 1. Required Environment Variables
Create a `.env` file in the project root:
```env
# Salesforce Credentials
SF_USERNAME=your-salesforce-username
SF_PASSWORD=your-salesforce-password

# Optional Configuration
SF_BASE_URL=https://your-org.my.salesforce.com
TEST_ENV=development
HEADLESS=true
DEBUG=false
```

### 2. Development Scripts
```bash
# Install dependencies
npm install

# Run all tests
npm run test

# Code quality checks
npm run lint          # ESLint with auto-fix
npm run prettier      # Code formatting

# Test reporting
npm run allure:generate  # Generate Allure report
npm run allure:open      # Open Allure report
npm run allure          # Generate and open report
```

### 3. Git Hooks Configuration
The project uses Lefthook for pre-commit checks. Configuration in `lefthook.yml`:
- Runs ESLint on staged files
- Runs Prettier formatting
- Validates TypeScript compilation

## Project Architecture

### File Structure
```
playwright-cucumber/
├── .github/skills/          # Agent Skills for Copilot
├── tests/
│   ├── features/           # Cucumber feature files
│   │   └── [FeatureName]/
│   │       └── [FeatureName].feature
│   ├── pages/              # Page Object Model classes
│   │   └── [PageName].ts
│   ├── steps/              # Step definition files
│   │   └── [FeatureName].ts
│   └── support/            # Test support files
│       ├── hooks.ts        # Before/After hooks
│       └── world.ts        # Test context and fixtures
├── log/                    # Test execution logs
├── allure-results/         # Allure test results
├── allure-report/          # Generated Allure reports
└── config files           # Various configuration files
```

### Configuration Files
- `cucumber.mjs`: Cucumber test runner configuration
- `tsconfig.json`: TypeScript compilation settings
- `eslint.config.mts`: ESLint linting rules
- `package.json`: Dependencies and scripts
- `lefthook.yml`: Git hooks configuration

## Development Workflow

### 1. Adding New Tests
```bash
# 1. Create feature file
mkdir -p tests/features/NewFeature
touch tests/features/NewFeature/NewFeature.feature

# 2. Create step definitions
touch tests/steps/NewFeature.ts

# 3. Create page object (if needed)
touch tests/pages/NewFeature.ts

# 4. Run tests to verify
npm run test -- tests/features/NewFeature/
```

### 2. Code Quality Workflow
```bash
# Before committing (automated via lefthook)
npm run lint
npm run prettier

# Manual verification
npm run test
```

### 3. Debugging Setup
```bash
# Run tests with debug output
DEBUG=pw:api npm run test

# Run with browser visible
HEADLESS=false npm run test

# Run specific scenario
npx cucumber-js tests/features/Login/Login.feature --name "Successful Login"
```

## TypeScript Configuration

### Compiler Options
- Target: ES2022
- Module: CommonJS  
- Strict type checking enabled
- Path mapping for clean imports
- Experimental decorators for Cucumber

### Import Patterns
```typescript
// Relative imports for test files
import { Fixture } from 'tests/support/world';
import LoginPage from 'tests/pages/Login';

// Package imports
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
```

## Browser Configuration

### Default Settings
- Browser: Chromium (configurable)
- Headless: true (override with HEADLESS=false)
- Viewport: Default Playwright viewport
- Timeout: 10 seconds default

### Custom Configuration
Modify browser settings in `tests/support/world.ts`:
```typescript
const browserOptions = {
  headless: process.env.HEADLESS !== 'false',
  slowMo: process.env.DEBUG ? 1000 : 0,
  devtools: process.env.DEBUG === 'true'
};
```

## Troubleshooting Setup Issues

### Common Issues
1. **Missing Environment Variables**: Ensure `.env` file is created with required variables
2. **TypeScript Compilation Errors**: Check `tsconfig.json` path mappings
3. **Import Resolution**: Verify relative paths and module resolution
4. **Browser Installation**: Run `npx playwright install` if browsers are missing
5. **Permission Issues**: Ensure proper file permissions for log directory

### Verification Commands
```bash
# Check Node.js version (requires 18+)
node --version

# Verify TypeScript compilation
npx tsc --noEmit

# Test Playwright installation
npx playwright --version

# Verify Cucumber setup
npx cucumber-js --version
```

## CI/CD Integration

### Required Environment Variables for CI
- `SF_USERNAME`: Salesforce test user
- `SF_PASSWORD`: Salesforce test password
- `SF_BASE_URL`: Target Salesforce org URL

### Artifacts to Preserve
- `allure-results/`: Test execution results
- `allure-report/`: Generated test reports  
- `log/`: Test execution logs
- Screenshots from failed tests

This setup provides a robust foundation for BDD testing with Playwright and Cucumber, with comprehensive tooling for development, debugging, and reporting.
