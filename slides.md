---
# You can also start simply with 'default'
theme: default


# some information about your slides (markdown enabled)
title: Playwright Techkaffi

# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev
layout: image
image: /img/cover.webp
---



<!--
Techkaffi, 21.05.2025<br>
Stephan Girod, Puzzle ITC
-->

---
transition: fade-out
level: 1
---

# Agenda

- Choose your character
- Cypress vs. Playwright
- Special Attacks
- Finish move

<!--
top frameworks vergleich -> cypress vs. playwright
-->

---
transition: fade-out
level: 1
layout: image-right
image: /img/character.png
backgroundSize: 100% 100%
---

## Choose your character

What is your preference for FE testing?


<!--
Webdriver.io / TestCafe / Nightwatch.js, Puppeteer,...

Playwright Devs -> ex. Puppeteer Team
-->

---
transition: fade-out
level: 1
layout: image
image: /img/cypressvsplaywright.png
backgroundSize: 100%
---


<!--
While Cypress is a testing tool, Playwright is an automation solution.
-->
---
transition: fade-out
level: 2
---

## Key Differences

| **Feature** | **Playwright** | **Cypress** |
|-------------|----------------|-------------|
| 📝 **Language** | JavaScript, TypeScript, Python, Java, C# | JavaScript, TypeScript |
| ⛓️ **Parallel Testing** | Full parallelism | Parallel at spec level only |
| ⛩️ **Architecture** | Node.js context  | Runs within the browser itself |
| 🕸️ **Browsers Supported** | Chromium, Firefox, WebKit (Safari), Edge | Chrome, Firefox, Edge (Chromium-based), Electron (Safari experimental) |
| 🧩 **Component Testing** | Framework-agnostic | Supports React, Vue, Angular, Svelte |
| 🔍 **Debugging** | Inspector, tracing, screenshots, videos | Time-travel debugging with DOM snapshots |

<!--
Both are opensource and support all Operation Systems

- **Playwright Strengths**: Cross-browser support (including Safari), multiple language bindings, flexible architecture
- **Cypress Strengths**: Developer experience, built-in test runner, mature ecosystem
- **Major Differences**: Browser support, execution model, iframe handling
- **Decision Factors**: Safari testing needs, language requirements, debugging preferences
-->


---
transition: fade-out
level: 3
layout: image
image: /img/stats.png
backgroundSize: 78% 72%
---
<style>
h2, span {
  color: black;
}
</style>

## Stats

<div class="absolute bottom-10">
  <span class="font-size-3">
Source: https://npmtrends.com/cypress-vs-playwright
  </span>
</div>

<!--
Mai 2024 turning point?
Paywalling Features in Cypress
More focus on enterprise features
-->

---
transition: fade-out
level: 4
layout: two-cols-header
---
## Syntax Comparison

::left::

### Playwright

```javascript
test('add and complete todo items', async ({ page }) => {
  await page.goto('https://example.com/todo');
  
  // Add a new todo
  await page.fill('.new-todo', 'Buy groceries');
  await page.press('.new-todo', 'Enter');
  
  // Verify it was added
  await expect(page.locator('.todo-list li'))
      .toHaveCount(1);
  await expect(page.locator('.todo-list li'))
      .toHaveText('Buy groceries');
  
  // Complete the todo
  await page.click('.todo-list li .toggle');
  
  // Verify it's completed
  await expect(page.locator('.todo-list li'))
      .toHaveClass(/completed/);
});
```


::right::

### Cypress:

```javascript
it('add and complete todo items', () => {
    cy.visit('https://example.com/todo');

    // Add a new todo
    cy.get('.new-todo').type('Buy groceries{enter}');

    
    // Verify it was added
    cy.get('.todo-list li')
        .should('have.length', 1);
    cy.get('.todo-list li')
        .should('contain.text', 'Buy groceries');

    // Complete the todo
    cy.get('.todo-list li .toggle').click();

    // Verify it's completed
    cy.get('.todo-list li')
        .should('have.class', 'completed');
});
```

<!-- 
Syntax more readable with Cypress, as long your are not familiar to async/await patterns
Test flow feels more natural with Playwright
Cypress uses a unique command chaining API with implicit waiting
- Automatic retry-ability built into commands and hides complexity of async operations from the test writer
-->

---
transition: fade-out
level: 4
---

## Selector Approach
<br/>

### Playwright 
```javascript
// Multiple selector strategies
await page.click('text=Click me');  // Text content
await page.click('.class >> nth=2'); // CSS with filtering
await page.click('role=button[name="Submit"]'); // Accessibility 
await page.getByTestId('submit-button').click();// selectors

```
<br/>

### Cypress
```javascript
// Primarily CSS selectors with some extensions
cy.contains('Click me').click();
cy.get('.class').eq(2).click();
cy.get('[aria-label="Submit"]').click();
cy.get('[data-cy="submit-button"]').click();
```
<!--
Playwright has build-in method with configurable attibute
Cypress requires custom commands or plugins for specialized data-attribute selection
data-cy recommended by Cypress
Attribute is customizable with both -> cypress/playwright.config.js
-->


---
transition: fade-out
level: 4
---
## Handling Asynchronous Operations
<br/>

### Playwright
```javascript
// Explicit waiting with async/await
await page.waitForSelector('.element');
await page.waitForResponse('**/api/data');
const response = await page.waitForResponse(
    res => res.url().includes('/api'));
```
<br/>

### Cypress
```javascript
// Implicit waiting built into commands
cy.get('.element'); // Automatically waits
cy.wait('@apiRequest'); // Wait for aliased route
cy.intercept('**/api/data').as('apiRequest');
```
---
transition: fade-out
level: 4
---
## Assertions
<br/>

## Playwright
```javascript
// Jest-like assertions
await expect(page).toHaveTitle('Page Title');
await expect(page.locator('.element')).toBeVisible();
await expect(page.locator('.count')).toHaveText('5');
```
<br/>

## Cypress
```javascript
// Chainable assertions
cy.title().should('eq', 'Page Title');
cy.get('.element').should('be.visible');
cy.get('.count').should('have.text', '5');
```
---
transition: fade-out
level: 4

---
## Handling Multiple Elements
<br/>

### Playwright
```javascript
// Working with multiple elements
const items = await page.locator('.item').all();
for (const item of items) {
  await item.click();
}

// Or using forEach with a locator
await page.locator('.item').locator('button').click();
```
<br/>

### Cypress
```javascript
// Working with multiple elements
cy.get('.item').each(($item) => {
  cy.wrap($item).click();
});

// Or using direct jQuery-like operations
cy.get('.item').find('button').click();
```

---
transition: fade-out
level: 1

---

## Tooling

`
npx playwright test --headed 
`

---
transition: fade-out
level: 1

---

## Special Attacks

`npx playwright codegen`
`npx playwright codegen --viewport-size="800,600" playwright.dev`
`npx playwright codegen --timezone="Europe/Rome" --geolocation="41.890221,12.492348" --lang="it-IT" bing.com/maps`

https://playwright.dev/docs/codegen#preserve-authenticated-state
<!--
record test and add expects
show locator selector
record cursor
assert visibilty / text /value


---
transition: fade-out
level: 1
---

## Winner is



## Conclusion

**Cypress** offers a more accessible entry point for beginners and non-developers with its readable syntax and automatic handling of asynchronous operations. The chainable API and built-in waiting mechanisms make it easier to write stable tests without deep JavaScript knowledge.

**Playwright** follows standard JavaScript patterns that may be more familiar to experienced developers. While it requires understanding of async/await, it offers more flexibility and control for complex scenarios, and its multi-language support makes it more versatile for diverse teams.

The choice between the two often comes down to:
1. The team's existing JavaScript experience
2. The complexity of the testing scenarios
3. The need for cross-browser testing (especially Safari)
4. Preference for either automatic or explicit control over test flow


