// @ts-check
import { test, expect } from '@playwright/test';

test('handling alerts', async ({ page }) => {
  // Navigate to the actions page with alert examples
  await page.goto('https://example.cypress.io/commands/actions');
  
  // Set up a listener for the dialog before triggering it
  page.once('dialog', async dialog => {
    // Verify dialog message
    expect(dialog.message()).toBe('Are you sure?');
    // Confirm the dialog
    await dialog.accept();
  });
  
  // Click the button that triggers the alert
  await page.click('.action-confirm');
  
  // Verify the result text after confirming the alert
  await expect(page.locator('#confirm-answer')).toHaveText('true');
  
  // Set up a listener for another dialog to dismiss it
  page.once('dialog', async dialog => {
    // Dismiss the dialog
    await dialog.dismiss();
  });
  
  // Click the button that triggers the alert again
  await page.click('.action-confirm');
  
  // Verify the result text after dismissing the alert
  await expect(page.locator('#confirm-answer')).toHaveText('false');
});
