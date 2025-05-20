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

Willkommen zum Techkaffi 

Damit das Techkaffi eine gewisse pädagogische Message hat, wurden gewisse Slides mit Dall-e erstellt. Die pädagogische Message ist dabei: do not.


Idee Arcade Game

Record!!!!
-->


---
transition: fade-out
level: 1
layout: image-right
image: /img/character.png
backgroundSize: 100% 100%
---

## Choose your character

What is your preference for End-to-End testing?


<!--
cypress - browser emulation testing

playwright - nodejs 

Webdriver.io - nodejs ose

TestCafe - nodejs

Nightwatch.js - to check

Puppeteer 

Playwright Devs -> ex. Puppeteer Team
-->

---
transition: fade-out
level: 2
layout: image
image: /img/compare_stats.png
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
Source: https://npmtrends.com/cypress-vs-nightwatch-vs-playwright-vs-puppeteer-vs-testcafe-vs-webdriverio
  </span>
</div>

<!--
playwright jüngstes framework
Mai 2024 turning point? Why?
Paywalling Features in Cypress
More focus on enterprise features

Puppeteer - 90.7k stars 
-->

---
transition: fade-out
level: 1
layout: image
image: /img/cypressvsplaywright.png
backgroundSize: 100%
---


<!--

-->
---
transition: fade-out
level: 2
---

## Key Differences

| **Feature** | **Playwright** | **Cypress** |
|-------------|----------------|-------------|
| 📝 **Language** | JavaScript, TypeScript, Python, Java, C# | JavaScript, TypeScript |
| ⛩️ **Architecture** | Node.js context  | Runs within the browser itself |
| 🏃🏽 **Test Runner** | Works with Jest, Mocha, and others | Built-in test runner |
| ⛓️ **Parallel Testing** | Full parallelism | Parallel at spec level only |
| 🕸️ **Browsers Supported** | Chromium, Firefox, WebKit (Safari), Edge | Chrome, Firefox, Edge (Chromium-based), Electron (Safari experimental) |
| 🔄 **Auto-waiting** | Intelligent waiting for actionable elements | Built-in retry-ability and automatic waiting |

<!--
Both are opensource and support all Operation Systems

Sprachunterstützung bei Playwright besser

TestRunner: Playwright mehrere Optionen, Cypress nur Built-in -> Speed Vorteil
https://www.cuketest.com/playwright/docs/test-runners/
-> Cypress unterstützt für Component Testing nur React, Vue, Angular, Svelte

Paralleles Testen bei Cypress nur bedingt, sonst paid plans für optimale Performance
-->

---
transition: fade-out
level: 2
---

## Key Differences

| **Feature** | **Playwright** | **Cypress** |
|-------------|----------------|-------------|
| 📱 **Mobile Testing** | Emulation + limited real device support | Emulation only limited |
| 🖼️ **iframes** | Native support | Requires plugins or custom commands |
| 🪟 **Multiple tabs/windows** | Supported | Limited support |
| 🔍 **Debugging** | Inspector, tracing, screenshots, videos | Time-travel debugging with DOM snapshots |
| 🔌 **Plugin Ecosystem** | Growing ecosystem | Mature, extensive ecosystem |


<!--
Both are opensource and support all Operation Systems

Sprachunterstützung bei Playwright besser
Paralleles Testen bei Cypress nur bedingt, sonst paid plans für optimale Performance

-->


---
transition: fade-out
level: 3
layout: two-cols-header
---
## Syntax Comparison

::left::

### Playwright

```javascript
test('add and complete todo items', async ({ page }) => {
  await page.goto('https://example.com/todo');
  
  // Add a new todo
  await page.locator('.new-todo').fill('Buy groceries');
  await page.locator('.new-todo').press('Enter');
  
  // Verify it was added
  await expect(page.locator('.todo-list li'))
      .toHaveCount(1);
  await expect(page.locator('.todo-list li'))
      .toHaveText('Buy groceries');
  
  // Complete the todo
  await page.locator('.todo-list li .toggle').click();
  
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

Playwright uses Locators to find elements and commands to perform actions 
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
await page.getByRole('button', { name: 'Submit' }).click(); // built-in 
await page.getByTestId('submit-button').click(); // built-in 
await page.getByLabel('Password').fill('secret-password'); // built-in 
await page.locator('css=button').click();  // CSS locator
await page.locator('.class >> nth=2').click(); // CSS with filtering
await page.locator('role=button[name="Submit"]').click(); // Accessibility 


```
<div class="absolute bottom-5">
  <a href="https://playwright.dev/docs/locators" class="font-size-3">
https://playwright.dev/docs/locators
  </a>
</div>

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
Playwright bietet diverse Locator, empfohlen werden die User-facing Attribute um die Tests resilient zu machen.

Cypress nutzt CSS Selectors mit einigen Zusatzfunktionen

 has build-in method with configurable attibute
Cypress requires custom commands or plugins for specialized data-attribute selection
data-cy recommended by Cypress
Attribute is customizable with both -> cypress/playwright.config.js

- Accessiblity tree snapshots - deprecated use Axe
-->


---
transition: fade-out
level: 4
---
## Network Requests
<br/>

### Playwright
```javascript
// Explicit waiting with async/await
const responsePromise = page.waitForResponse('**/api/data');
await page.getByText('trigger response').click();
const response = await responsePromise;
```

<br/>

### Cypress
```javascript
// Implicit waiting built into commands
cy.get('trigger response').click();
cy.intercept('**/api/data').as('apiRequest');
cy.wait('@apiRequest'); // Wait for aliased route
```
<!--
Playwright 
explizite struktur mit async/await

cypress
implicites warten eingebaut in befehle
-->


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

<div class="absolute bottom-5">
  <a href="https://playwright.dev/docs/api/class-genericassertions" class="font-size-3">
https://playwright.dev/docs/api/class-genericassertions
  </a>
</div>

<br/>

## Cypress
```javascript
// Chainable assertions
cy.title().should('eq', 'Page Title');
cy.get('.element').should('be.visible');
cy.get('.count').should('have.text', '5');
```

<!--
Playwright 
expect mit vielen Optionen Generic/Locator/Page

cypress
methoden innerhalb should function
-->

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
await page.locator('.item').forEach(async (item) => await item.locator('button').click();
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


**Playwright**
```shell
npx playwright test --ui # ui mode
npx playwright test --headed  # headed mode
npx playwright test  # headless mode
```

**Cypress**
```shell
npx cypress open # ui mode
npx cypress run # headless mode
```

<!--
Both are capable to record video / screenshots / trace
expect(...).toMatchSnapshot(...) compare screenshots or textual or binary data
-->


---
transition: fade-out
level: 1
layout: image-right
image: /img/special_attacks.webp
backgroundSize: 100% 100%
---

# Special Attacks

---
transition: fade-out
level: 1
---

## Codegen Support

<br/>


```shell
npx playwright codegen

# emulate viewport size
npx playwright codegen --viewport-size="800,600" puzzle.ch

# emulate device
npx playwright codegen --device="Pixel 5" --lang="fr-FR" puzzle.ch
npx playwright codegen --color-scheme=dark playwright.dev
```

<!--
record test and add expects
show locator selector
record cursor
assert visibilty / text /value
https://playwright.dev/docs/codegen#preserve-authenticated-state
-->

---
transition: fade-out
level: 1
layout: center
---

# And the winner is ???

