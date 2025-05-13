// @ts-check
import { test, expect } from '@playwright/test';

test('async request with assertions', async ({ page }) => {
  // Navigate to the network requests example page
  await page.goto('https://example.cypress.io/commands/network-requests');
  
  // Intercept network requests
  await page.route('**/comments/*', async route => {
    // Create a mock response
    const json = { 
      body: 'Playwright intercepted and modified this response',
      email: 'test@example.com',
      id: 123,
      name: 'Test User'
    };
    
    // Fulfill the request with our custom response
    await route.fulfill({ 
      status: 200, 
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });
  
  // Click the button that triggers the GET request
  await page.click('.network-btn.btn.btn-primary');
  
  // Wait for and verify the response content in the UI
  await expect(page.locator('.network-comment')).toContainText('Playwright intercepted and modified this response');
  
  // Example of waiting for a response and asserting on it
  const responsePromise = page.waitForResponse('**/comments/*');
  await page.click('.network-btn.btn.btn-primary');
  const response = await responsePromise;
  
  // Assert on response properties
  expect(response.status()).toBe(200);
  
  // Get the response body and assert on it
  const body = await response.json();
  expect(body.body).toBe('Playwright intercepted and modified this response');
});
