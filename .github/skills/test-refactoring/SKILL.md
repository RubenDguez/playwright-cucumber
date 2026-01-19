---
name: test-refactoring
description: Guide for refactoring and improving existing test code, step definitions, and page objects. Use this when asked to improve code quality, maintainability, or performance.
---

# Test Refactoring Guide

When refactoring tests in this Playwright-Cucumber project, follow these patterns for improved maintainability and performance:

## Code Quality Improvements

### 1. Step Definition Refactoring
```typescript
// Before: Repetitive code
Given('I am on the login page', async function (this: Fixture) {
  await this.page.goto('https://argenisdominguez-dev-ed.develop.my.salesforce.com/');
});

Given('I am on the home page', async function (this: Fixture) {
  await this.page.goto('https://argenisdominguez-dev-ed.develop.my.salesforce.com/home');
});

// After: Parameterized steps
Given('I am on the {string} page', async function (this: Fixture, pageName: string) {
  await this.navigationHelper.goToPage(pageName);
});
```

### 2. Page Object Improvements
```typescript
// Follow the established pattern with clean, direct implementation
export default class LoginPage {
  constructor(private readonly page: Page) {}

  // Getters for all Locators - clean and direct
  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Log In' });
  }

  // Methods to fulfill actions - one responsibility per method
  async navigate(): Promise<void> {
    await this.page.goto('https://example.com/login');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  // Composite method for common workflows
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.loginButton.click();
  }
}
```

### 3. Extract Common Utilities
```typescript
// Create tests/utils/TestHelpers.ts
export class TestHelpers {
  static async waitForStableElement(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ state: 'stable', timeout });
  }

  static async fillWithValidation(field: Locator, value: string): Promise<void> {
    await field.fill(value);
    await expect(field).toHaveValue(value);
  }
}
```

## Performance Optimizations

### 1. Efficient Waiting Strategies
```typescript
// Before: Multiple separate waits
await this.usernameInput.waitFor();
await this.passwordInput.waitFor();
await this.loginButton.waitFor();

// After: Single wait for page ready state
async waitForLoginFormReady(): Promise<void> {
  await Promise.all([
    this.usernameInput.waitFor({ state: 'visible' }),
    this.passwordInput.waitFor({ state: 'visible' }),
    this.loginButton.waitFor({ state: 'visible' })
  ]);
}
```

### 2. Batch Operations
```typescript
// Before: Sequential actions
await this.enterUsername(username);
await this.enterPassword(password);
await this.clickLoginButton();

// After: Optimized flow
async loginWithCredentials(username: string, password: string): Promise<void> {
  await this.usernameInput.fill(username);
  await this.passwordInput.fill(password);
  
  // Wait for form validation if needed
  await this.page.waitForFunction(() => 
    !document.querySelector('[data-login-form]')?.classList.contains('validating')
  );
  
  await this.loginButton.click();
}
```

## Maintainability Patterns

### 1. Configuration Management
```typescript
// Create tests/config/TestConfig.ts
export class TestConfig {
  static readonly TIMEOUTS = {
    DEFAULT: 10000,
    LONG: 30000,
    NETWORK: 15000
  };

  static readonly URLS = {
    BASE: process.env.SF_BASE_URL || 'https://argenisdominguez-dev-ed.develop.my.salesforce.com',
    LOGIN: '/login',
    DASHBOARD: '/dashboard'
  };
}
```

### 2. Error Handling Patterns
```typescript
// Enhanced error context
async performLoginAction(): Promise<void> {
  try {
    await this.login(username, password);
  } catch (error) {
    const context = {
      url: this.page.url(),
      title: await this.page.title(),
      timestamp: new Date().toISOString(),
      screenshot: await this.page.screenshot({ fullPage: true })
    };
    
    throw new Error(`Login failed: ${error.message}\nContext: ${JSON.stringify(context)}`);
  }
}
```

### 3. Data Management
```typescript
// Create tests/data/TestData.ts
export const TestData = {
  users: {
    valid: {
      username: () => process.env.SF_USERNAME!,
      password: () => process.env.SF_PASSWORD!
    },
    invalid: {
      username: 'invalid@test.com',
      password: 'wrongpassword'
    }
  }
};
```

## Refactoring Checklist

1. **Extract Common Code**: Look for repeated patterns in step definitions
2. **Optimize Waits**: Replace fixed waits with dynamic waiting strategies
3. **Improve Selectors**: Use more robust, accessible selectors
4. **Add Type Safety**: Ensure proper TypeScript types throughout
5. **Error Handling**: Add comprehensive error context and recovery
6. **Documentation**: Update comments and documentation
7. **Test Data**: Externalize test data and make it configurable
8. **Parallel Safety**: Ensure tests can run in parallel without conflicts

## Code Review Standards
- Follow the existing ESLint and Prettier configurations
- Maintain consistent naming conventions
- Add appropriate TypeScript types
- Include error handling for all async operations
- Document complex business logic
- Keep page objects focused on UI interactions only
