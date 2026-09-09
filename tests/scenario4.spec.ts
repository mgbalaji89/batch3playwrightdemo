import { test, expect, Page } from '@playwright/test';

test('Scenario 04 - Bank Account & Transaction Management', async ({
  page,
}) => {
  let accountNumber = '';

  // --------------------------------------------------
  // Step 1: Navigate to Banking Application
  // --------------------------------------------------
  await page.goto(
    'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
  );

  await expect(
    page.getByRole('button', { name: 'Customer Login' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Bank Manager Login' })
  ).toBeVisible();

  // --------------------------------------------------
  // Step 2: Bank Manager Login
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();

  // --------------------------------------------------
  // Step 3: Add Customer
  // --------------------------------------------------
const uniqueId = Date.now();
const firstName = `Alice${uniqueId}`;
const lastName = 'Smith';
const postCode = 'E1 6RF';

await page.locator('input[ng-model="fName"]').fill(firstName);
await page.locator('input[ng-model="lName"]').fill(lastName);
await page.locator('input[ng-model="postCd"]').fill(postCode);
const dialogPromise = page.waitForEvent('dialog');
await page.getByRole('button', { name: 'Add Customer' }).click();
const dialog = await dialogPromise;
console.log(dialog.message());
expect(dialog.message()).toContain('Customer added successfully');
await dialog.accept();

  // --------------------------------------------------
  // Step 7: Open Account
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Open Account' }).click();

  await page.locator('#userSelect').selectOption({
    label: 'Alice Smith',
  });

  await page.locator('#currency').selectOption('Dollar');

  const accountAlert = page.waitForEvent('dialog');

  await page.getByRole('button', { name: 'Process' }).click();

  const accountDialog = await accountAlert;

  expect(accountDialog.message()).toContain(
    'Account created successfully'
  );

  console.log(accountDialog.message());

  const matches = accountDialog.message().match(/\d+/g);

  if (matches && matches.length > 0) {
    accountNumber = matches[matches.length - 1];
  }

  await accountDialog.accept();

  expect(accountNumber).not.toBe('');

  // --------------------------------------------------
  // Step 12: Verify Customer in Customers List
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Customers' }).click();

  await expect(page.locator('table')).toContainText('Alice');
  await expect(page.locator('table')).toContainText('Smith');

  // --------------------------------------------------
  // Step 13: Go Home
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Home' }).click();

  // --------------------------------------------------
  // Step 14: Customer Login
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Customer Login' }).click();

  await page.locator('#userSelect').selectOption({
    label: 'Alice Smith',
  });

  // --------------------------------------------------
  // Step 15: Login
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Login' }).click();

  const balance = page.locator('strong.ng-binding').nth(1);

  await expect(balance).toHaveText('0');

  // --------------------------------------------------
  // Step 16-18: Deposit $5000
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Deposit' }).click();

  await page.locator('[ng-model="amount"]').fill('5000');

  await page.getByRole('button', { name: 'Deposit' }).click();

  await expect(page.locator('.error')).toContainText(
    'Deposit Successful'
  );

  await expect(balance).toHaveText('5000');

  // --------------------------------------------------
  // Step 19-21: Withdraw $2000
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Withdrawl' }).click();

  await page.locator('[ng-model="amount"]').fill('2000');

  await page.getByRole('button', { name: 'Withdraw' }).click();

  // Wait for balance to update
  await expect(balance).toHaveText('3000');

  // --------------------------------------------------
  // Assertion: Balance = Deposits - Withdrawals
  // --------------------------------------------------
  expect(await balance.textContent()).toBe('3000');

  // --------------------------------------------------
  // Assertion: Withdraw more than Balance
  // --------------------------------------------------
  await page.locator('[ng-model="amount"]').fill('5000');

  await page.getByRole('button', { name: 'Withdraw' }).click();

  await expect(page.locator('.error')).toContainText(
    'Transaction Failed'
  );

  // --------------------------------------------------
  // Step 22: Transaction History
  // --------------------------------------------------
  await page.getByRole('button', { name: 'Transactions' }).click();

  await expect(page.locator('table')).toBeVisible();

  const transactionText = await page.locator('table').textContent();

  expect(transactionText).toContain('5000');
  expect(transactionText).toContain('Credit');

  expect(transactionText).toContain('2000');
  expect(transactionText).toContain('Debit');

  // --------------------------------------------------
  // Final Validations
  // --------------------------------------------------
  console.log(`Generated Account Number: ${accountNumber}`);

  expect(accountNumber).not.toBe('');

  const finalBalance = await balance.textContent();

  expect(finalBalance).toBe('3000');
});
