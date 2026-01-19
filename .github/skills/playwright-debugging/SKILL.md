---
name: playwright-debugging
description: Comprehensive guide for debugging failing Playwright tests in this Cucumber project. Use this when tests are failing, elements are not found, or timeouts occur.
---

# Playwright Debugging Guide

When debugging Playwright test failures in this Cucumber project, follow this systematic approach:

## Common Debugging Strategies

### 1. Element Not Found Issues
```typescript
// Add debug logging to step definitions
console.log('Looking for element:', await this.page.locator('[selector]').count());

// Use Playwright's built-in waiting
await this.page.waitForSelector('[selector]', { timeout: 10000 });

// Check if element is visible
await expect(this.page.locator('[selector]')).toBeVisible({ timeout: 10000 });
```

### 2. Network and Loading Issues
```typescript
// Wait for network to be idle
await this.page.waitForLoadState('networkidle');

// Wait for specific network requests
await this.page.waitForResponse(response => 
  response.url().includes('[endpoint]') && response.status() === 200
);
```

### 3. Environment Setup Debugging
```typescript
// In step definitions, check environment variables
console.log('Environment check:', {
  username: !!process.env.SF_USERNAME,
  password: !!process.env.SF_PASSWORD,
  baseUrl: process.env.BASE_URL || 'not set'
});
```

### 4. Page Object Debugging
```typescript
// Add debugging methods to page objects
async debugState(): Promise<void> {
  console.log('Current URL:', this.page.url());
  console.log('Page title:', await this.page.title());
  console.log('Username field visible:', await this.usernameInput.isVisible());
  console.log('Password field visible:', await this.passwordInput.isVisible());
}
```

## Debugging Configurations

### Enable Debug Mode in Cucumber
```javascript
// In cucumber.mjs, add debug options
export default {
  // ... existing config
  format: [
    '@cucumber/pretty-formatter',
    'allure-cucumberjs/reporter'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  }
};
```

### Playwright Debug Options
```typescript
// Add to support/world.ts for browser debugging
const browserOptions = {
  headless: false,
  slowMo: 1000,
  devtools: true
};
```

## Troubleshooting Checklist

1. **Environment Variables**: Verify SF_USERNAME and SF_PASSWORD are set
2. **Network Connectivity**: Check if Salesforce URL is accessible
3. **Element Selectors**: Use browser dev tools to verify selectors
4. **Timing Issues**: Add appropriate waits for dynamic content
5. **Browser State**: Ensure clean browser state between tests

## Useful Debug Commands
```bash
# Run with debug output
DEBUG=pw:api npm run test

# Run specific scenario
npx cucumber-js tests/features/Login/Login.feature --name "Successful Login"

# Run with browser visible
HEADLESS=false npm run test
```

## Logging Strategy
- Use structured logging with the @argenis.dominguez/logger package
- Log before and after critical actions
- Include context like page URL, element states, and user inputs
- Use different log levels: error, warn, info, debug
