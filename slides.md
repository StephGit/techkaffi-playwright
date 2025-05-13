---
# You can also start simply with 'default'
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Playwright Techkaffi
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
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
---

# Playwright


Techkaffi, 21.05.2025<br>
Stephan Girod, Puzzle ITC

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
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
layout: image
image: /img/character.png
backgroundSize: 100%
---

# Choose your character

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

# Key Differences

| **Feature** | **Playwright** | **Cypress** |
|-------------|----------------|-------------|
| 📝 **Language** | JavaScript, TypeScript, Python, Java, C# | JavaScript, TypeScript |
| 🏃🏽 **Test Runner** | Works with Jest, Mocha, and others | Built-in test runner with time-travel debugging |
| ⛓️ **Parallel Testing** | Full parallelism, even within specs | Parallel at spec level only (paid plans for optimal performance) |
| ⛩️ **Architecture** | Node.js context separate from browser | Runs within the browser itself |
| 🕸️ **Browsers Supported** | Chromium, Firefox, WebKit (Safari), Edge | Chrome, Firefox, Edge (Chromium-based), Electron (Safari experimental) |
| 📱 **Mobile Testing** | Emulation + limited real device support | Emulation only with limited options |
| 📄 **Test Syntax** | `async/await` with explicit promises | Chainable commands with implicit waiting |
| 🖼️ **iframes** | Native support | Requires plugins or custom commands |
| 🪟 **Multiple tabs/windows** | Supported | Limited support |
| 🌐 **Network Interception** | Route-based with flexible handlers | Powerful `cy.intercept()` API |
| 🔄 **Auto-waiting** | Intelligent waiting for actionable elements | Built-in retry-ability and automatic waiting |
| 🧩 **Component Testing** | Framework-agnostic | Supports React, Vue, Angular, Svelte |
| 🔍 **Debugging** | Inspector, tracing, screenshots, videos | Time-travel debugging with DOM snapshots |
| 📊 **Reporting** | Built-in HTML reporter | Dashboard service (paid feature) |
| 🔌 **Plugin Ecosystem** | Growing ecosystem | Mature, extensive ecosystem |
| 🎬 **Record & Playback** | Mature codegen tool with multi-language support | Experimental Cypress Studio feature |

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
h1, span {
  color: black;
}
</style>

# Stats

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
layout: two-cols
---

## Cypress

```js
describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2)
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })
```

::right::

## Playwright

```ts
import { test, expect } from '@playwright/test';

test('has list with two items by default', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  expect(page.locator('.todo-list li')).toHaveCount(2);
  expect(page.locator('.todo-list li')).toHaveText(['Pay electric bill', 'Walk the dog']);
});
```


<!-- More examples:
  interaction checkboxes
  navigation
  handling alerts
  iframe support
  requests async with assert
 -->


---
transition: fade-out
level: 4
layout: two-cols
---

## Cypress

```js
cy.visit('https://example.cypress.io/todo')
cy.get('.todo-list li:first').find('input[type="checkbox"]').check()
cy.get('.todo-list li:first').find('input[type="checkbox"]').should('be.checked')
```

::right::

## Playwright

```ts
const { test, expect } = require('@playwright/test');

test('checkbox interaction', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.locator('.todo-list li:first input[type="checkbox"]').check();
  await expect(page.locator('.todo-list li:first input[type="checkbox"]')).toBeChecked();
});
```


---
transition: fade-out
level: 4
layout: two-cols
---

## Cypress

```js
cy.visit('https://example.cypress.io/todo')
cy.get('.todo-list li:first a').click()
cy.url().should('contain', '/todo/#/')
```

::right::

## Playwright

```ts
const { test, expect } = require('@playwright/test');

test('navigation', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.locator('.todo-list li:first a').click();
  await expect(page.url()).toContain('/todo/#/');
});
```


---
transition: fade-out
level: 4
layout: two-cols
---

## Cypress

```js
cy.visit('https://example.cypress.io/todo')
cy.window().its('alert').should('be.undefined')
cy.get('.todo-list li:first button').click()
cy.on('window:alert', (text) => {
  expect(text).to.equal('Deleted!')
})
```

::right::

## Playwright

```ts
const { test, expect } = require('@playwright/test');

test('handling alerts', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.on('dialog', (dialog) => {
    expect(dialog.message()).toBe('Deleted!');
    dialog.dismiss();
  });
  await page.locator('.todo-list li:first button').click();
});
```


---
transition: fade-out
level: 4
layout: two-cols
---

## Cypress

```js
cy.visit('https://example.cypress.io/todo')
cy.frame('iframe').find('h1').should('contain', 'TodoMVC')
```

::right::

## Playwright

```ts
const { test, expect } = require('@playwright/test');

test('iframe support', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  const iframe = page.frame('iframe');
  await expect(iframe.locator('h1')).toContainText('TodoMVC');
});
```



---
transition: fade-out
level: 4
layout: two-cols
---

## Cypress

```js
cy.visit('https://example.cypress.io/todo')
cy.intercept('GET', '/api/todos').as('getTodos')
cy.wait('@getTodos').then((xhr) => {
  expect(xhr.response.body).to.have.length(3)
})
```

::right::

## Playwright

```ts
const { test, expect } = require('@playwright/test');

test('requests async with assert', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.route('GET', '/api/todos', (route) => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }]),
    });
  });
  const response = await page.request.get('/api/todos');
  const body = await response.json();
  expect(body).toHaveLength(3);
});
```




---
transition: fade-out
level: 1
layout: two-cols
---

# Special Attacks

Async
Testrecording

```js
import { test, expect } from '@playwright/test'

test('Multiple API Requests Test', async ({ request }) => {
  // First request and assertion
  const todoResponse = await request.get('https://jsonplaceholder.typicode.com/todos/1')
  expect(todoResponse.status()).toBe(200)

  // Second request and assertion
  const userResponse = await request.get('https://jsonplaceholder.typicode.com/users/1')
  expect(userResponse.status()).toBe(200)
})
```
