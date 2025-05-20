
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('do stuff');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('whatever');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByText('2 items left')).toBeVisible();
  expect(await page.getByTestId('todo-item').count()).toBe(2);
});


test('impressum', async ({ page }) => {
  await page.goto('https:/booking-a.baspo.admin.ch');
  await page.getByRole('button', { name: 'Impressum' }).click();
  await expect(page.locator('[id="__next"]')).toContainText('Bundesamt für Sport BASPO Hauptstrasse 247 CH-2532 Magglingen');
  await page.getByRole('button', { name: 'FR' }).click();
  await expect(page.locator('[id="__next"]')).toContainText('Office fédéral du sport OFSPO Route principale 247 CH-2532 Macolin');
});


test('test-impressum', async ({ page }) => {
  await page.goto('https://booking.baspo.admin.ch/');
  await page.getByText('© 2019 BASPOv1.51.02Terms and').click();
  await page.getByRole('button', { name: 'Impressum' }).click();
  await expect(page.getByRole('heading', { name: 'Herausgeber und Redaktion:' })).toBeVisible();
});
