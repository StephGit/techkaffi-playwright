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

| **Feature** | **Playwright**	| **Cypress** |
| :----------- | :------ | :------ |
| 📝 *Language*	| JavaScript, TypeScript, Python, Java, C# |	JavaScript, TypeScript |
| 🏃🏽 *Test Runner*	| Works with Jest, Mocha, and others	| Built-in test runner
| ⛓️ *Parallel Testing*	| Full parallelism, even within specs |	Parallel at spec level only |
| ⛩️ *Architecture* | Uses browser contexts for isolation |	Runs within the browser itself |
| 🕸️ *Browsers Supported* |	Chromium, Firefox, WebKit	| Chrome, Edge (Chromium-based) |
| 📱 *Real Devices Support* |	Limited |	No |

<!--
Both are opensource and support all Operation Systems

arch: playwright -> websocket connection
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
