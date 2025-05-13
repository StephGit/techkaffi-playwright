// @ts-check
import { test, expect } from '@playwright/test';

test('checkbox interaction', async ({ page }) => {
  // Navigate to the todo app
  await page.goto('https://example.cypress.io/todo');
  
  // Check the first todo item
  const firstTodo = page.locator('.todo-list li').nth(0).locator('.toggle');
  await firstTodo.check();
  
  // Verify the todo item is marked as completed
  await expect(page.locator('.todo-list li').nth(0)).toHaveClass(/completed/);
  
  // Uncheck the first todo item
  await firstTodo.uncheck();
  
  // Verify the todo item is not marked as completed
  await expect(page.locator('.todo-list li').nth(0)).not.toHaveClass(/completed/);
});
