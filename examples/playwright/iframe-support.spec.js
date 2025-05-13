// @ts-check
import { test, expect } from '@playwright/test';

test('iframe support', async ({ page }) => {
  // Navigate to the page with iframes
  await page.goto('https://example.cypress.io/commands/querying');
  
  // Get the iframe with the example button
  const iframe = page.frameLocator('iframe.demo-frame');
  
  // Interact with elements inside the iframe
  const button = iframe.locator('.btn.btn-large');
  
  // Verify the button text
  await expect(button).toHaveText('Button');
  
  // Click the button inside the iframe
  await button.click();
  
  // Verify the button state changed after clicking
  await expect(button).toHaveClass(/btn-success/);
});
