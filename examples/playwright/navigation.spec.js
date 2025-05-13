// @ts-check
import { test, expect } from '@playwright/test';

test('navigation between pages', async ({ page }) => {
  // Navigate to the todo app
  await page.goto('https://example.cypress.io/todo');
  
  // Verify we're on the todo page
  await expect(page).toHaveTitle(/Cypress.io/);
  
  // Click on a link to navigate to another page (using the "commands" link in the header)
  await page.click('.navbar-nav a:has-text("Commands")');
  
  // Verify we've navigated to the commands page
  await expect(page).toHaveURL(/commands/);
  
  // Navigate back
  await page.goBack();
  
  // Verify we're back on the todo page
  await expect(page).toHaveURL(/todo/);
});
