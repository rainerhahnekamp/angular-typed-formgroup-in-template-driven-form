import { expect, test } from '@playwright/test';

test('console logs from changes in input field', async ({ page }) => {
  const inputLoc = page.getByRole('textbox').first();
  await page.goto('');
  await expect(inputLoc).toHaveValue('Vienna');
  const logs: string[] = [];
  page.on('console', (data) => {
    logs.push(data.text());
  });
  await inputLoc.clear();
  await inputLoc.type('Wien');

  expect(logs).toEqual(['', 'W', 'Wi', 'Wie', 'Wien']);
});
