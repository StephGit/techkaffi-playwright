---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Welcome to Slidev
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

Techkaffi, 21.05.2025
Stephan Girod, Puzzle ITC

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
transition: fade-out
level: 1
---

# Agenda

- Your favorites?
- Playwright vs. Cypress
- Features
- Fazit

<!--
top frameworks vergleich -> cypress vs. playwright
-->

---
transition: fade-out
level: 1
---

# FE Testing

Welche Tools verwendet ihr für Frontend Tests?

Cypress vs. Playwright Lager?

Andere?

<!--
Webdriver.io / TestCafe / Nightwatch.js, Puppeteer,...

Playwright Devs -> ex. Puppeteer Team
-->

---
transition: fade-out
level: 1
---

# Playwright vs. Cypress

While Cypress is a testing tool, Playwright is an automation solution.


---
transition: fade-out
level: 2
---

# Defering Feature

| **Feature** | **Playwright**	| **Cypress** |
| :----------- | :------ | :------ |
| Language	| JavaScript, TypeScript, Python, Java, C# |	JavaScript, TypeScript |
| Test Runner	| Works with Jest, Mocha, and others	| Built-in test runner
| Parallel Testing	| Full parallelism, even within specs |	Parallel at spec level only |
| Architecture | Uses browser contexts for isolation |	Runs within the browser itself |
| Browsers Supported |	Chromium, Firefox, WebKit	| Chrome, Edge (Chromium-based) |
| Real Devices Support |	Limited |	No |

<!--
Both are opensource and support all Operation Systems
-->

---
transition: fade-out
level: 3
layout: image
image: /img/stats.png
backgroundSize: 60%
---

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
---

# Conclusion

While Cypress is a testing tool, Playwright is an automation solution.
