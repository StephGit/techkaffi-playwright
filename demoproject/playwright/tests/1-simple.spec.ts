import { test, expect } from '@playwright/test';

test('has list with two items by default', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  expect(page.locator('.todo-list li')).toHaveCount(2);
  expect(page.locator('.todo-list li')).toHaveText(['Pay electric bill', 'Walk the dog']);
});


