# Playwright vs Cypress Test Examples

This directory contains example test scripts for both Playwright and Cypress, comparing how to implement common testing scenarios against the same application.

## Test Scenarios

The examples cover the following test scenarios:

1. **Checkbox Interaction** - Testing checkbox selection and verification
2. **Navigation** - Testing page navigation and URL verification
3. **Handling Alerts** - Working with JavaScript alerts, confirms, and prompts
4. **iframe Support** - Interacting with elements inside iframes
5. **Async Requests with Assertions** - Intercepting network requests and asserting on responses

## Directory Structure

```
examples/
├── playwright/
│   ├── checkbox-interaction.spec.js
│   ├── navigation.spec.js
│   ├── handling-alerts.spec.js
│   ├── iframe-support.spec.js
│   └── request-async-assert.spec.js
└── cypress/
    ├── checkbox-interaction.spec.js
    ├── navigation.spec.js
    ├── handling-alerts.spec.js
    ├── iframe-support.spec.js
    └── request-async-assert.spec.js
```

## Key Differences

### Playwright
- Uses async/await pattern consistently
- Built-in iframe support without plugins
- Dialog handling via event listeners
- Network interception with route handlers

### Cypress
- Uses chainable commands with implicit waiting
- Requires plugins for iframe support
- Alert handling via window event stubs
- Network interception with cy.intercept

## Running the Examples

### Playwright
To run the Playwright examples, you would need:

```bash
npm install @playwright/test
npx playwright test examples/playwright/
```

### Cypress
To run the Cypress examples, you would need:

```bash
npm install cypress
# For iframe support
npm install cypress-iframe
npx cypress open
```

Note: The iframe example for Cypress requires the cypress-iframe plugin to work properly.
