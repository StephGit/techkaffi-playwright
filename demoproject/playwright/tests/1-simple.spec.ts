import { test, expect } from '@playwright/test';

test('has list with two items by default', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  expect(page.locator('.todo-list li')).toHaveCount(2);
  expect(page.locator('.todo-list li')).toHaveText(['Pay electric bill', 'Walk the dog']);
});


test('checkbox interaction', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.locator('.todo-list li:first input[type="checkbox"]').check();
  await expect(page.locator('.todo-list li:first input[type="checkbox"]')).toBeChecked();
});


test('navigation', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.locator('.todo-list li:first a').click();
  await expect(page.url()).toContain('/todo/#/');
});

test('handling alerts', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  await page.on('dialog', (dialog) => {
    expect(dialog.message()).toBe('Deleted!');
    dialog.dismiss();
  });
  await page.locator('.todo-list li:first button').click();
});

test('iframe support', async ({ page }) => {
  await page.goto('https://example.cypress.io/todo');
  const iframe = page.frame('iframe');
  await expect(iframe.locator('h1')).toContainText('TodoMVC');
});

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
