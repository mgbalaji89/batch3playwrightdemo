import { test, expect, Page } from '@playwright/test';

test.describe('Scenario 13 - Data Table Operations & Pagination', () => {

  test('Validate CRUD Operations, Search, Pagination and Sorting', async ({ page }) => {

    await page.goto('https://demoqa.com/webtables');

    // ==========================
    // Step 1: Verify initial data
    // ==========================
    await expect(page.locator('tbody tr')).toHaveCount(3);

    // ==========================
    // Step 2: Click Add button
    // ==========================
    await page.locator('#addNewRecordButton').click();

    // ==========================
    // Step 3 & 4: Enter new record
    // ==========================
    await page.locator('#firstName').fill('Emma');
    await page.locator('#lastName').fill('Stone');
    await page.locator('#userEmail').fill('emma.stone@test.com');
    await page.locator('#age').fill('28');
    await page.locator('#salary').fill('75000');
    await page.locator('#department').fill('QA');

    // ==========================
    // Step 5: Submit
    // ==========================
    await page.locator('#submit').click();

    // ==========================
    // Step 6: Verify record added
    // ==========================
    const emmaRow = page.locator('tbody tr').filter({
      hasText: 'Emma'
    });

    await expect(emmaRow).toBeVisible();
    await expect(emmaRow).toContainText('Stone');
    await expect(emmaRow).toContainText('28');
    await expect(emmaRow).toContainText('75000');
    await expect(emmaRow).toContainText('QA');
    await expect(emmaRow).toContainText('emma.stone@test.com');

    // Verify total rows = 4
    const activeRows = page.locator('tbody tr');

    await expect(activeRows).toHaveCount(4);

    // ==========================
    // Step 7: Search Emma
    // ==========================
    await page.locator('#searchBox').fill('Emma');

    await expect(emmaRow).toBeVisible();

    const visibleFilteredRows = page.locator('tbody tr')
      .filter({ hasText: 'Emma' });

    await expect(visibleFilteredRows).toHaveCount(1);

    // ==========================
    // Step 8: Clear Search
    // ==========================
    await page.locator('#searchBox').clear();

    await expect(activeRows).toHaveCount(4);

    // ==========================
    // Step 9: Edit Emma Record
    // ==========================
    await page.locator('#searchBox').fill('Emma');

    await page.locator('#edit-record-4').click();

    // Verify pre-populated values
    await expect(page.locator('#firstName')).toHaveValue('Emma');
    await expect(page.locator('#lastName')).toHaveValue('Stone');
    await expect(page.locator('#salary')).toHaveValue('75000');

    // ==========================
    // Step 10: Update Salary
    // ==========================
    await page.locator('#salary').fill('85000');

    // ==========================
    // Step 11: Submit changes
    // ==========================
    await page.locator('#submit').click();

    await expect(emmaRow).toContainText('85000');

    // Validate other fields remain unchanged
    await expect(emmaRow).toContainText('Emma');
    await expect(emmaRow).toContainText('Stone');
    await expect(emmaRow).toContainText('QA');

    // ==========================
    // Step 12: Search Kierra
    // ==========================
    await page.locator('#searchBox').clear();
    await page.locator('#searchBox').fill('Kierra');

    const kierraRow = page.locator('tbody tr').filter({
      hasText: 'Kierra'
    });

    await expect(kierraRow).toBeVisible();

    // ==========================
    // Step 13: Delete Emma
    // ==========================
    await page.locator('#searchBox').clear();
    await page.locator('#searchBox').fill('Emma');

    await page.locator('#delete-record-4').click();

    // ==========================
    // Step 14: Verify Emma removed
    // ==========================
    await expect(emmaRow).toHaveCount(0);

    await page.locator('#searchBox').clear();

    await expect(page.locator('tbody tr').filter({
      hasText: 'Emma'
    })).toHaveCount(0);

    await expect(activeRows).toHaveCount(3);

    // ==========================
    // Step 15: Change rows/page
    // ==========================
    // Step 15: Change rows per page to 5
      const options = await page
.locator('select.form-control option')
.allTextContents();
console.log(options)


    // ==========================
    // Step 16: Sort Age Ascending
    // ==========================
    await page.locator('th').filter({
      hasText: 'Age'
    }).click();

    const getAgeValues = async () => {
      const rows = page.locator('tbody tr');
      const count = await rows.count();

      const ages: number[] = [];

      for (let i = 0; i < count; i++) {
        const ageText = await rows
          .nth(i)
          .locator('td')
          .nth(2)
          .textContent();

        if (
          ageText &&
          ageText.trim() !== '' &&
          !isNaN(Number(ageText))
        ) {
          ages.push(Number(ageText.trim()));
        }
      }

      return ages;
    };

    const ascendingAges = await getAgeValues();

    const expectedAscending = [...ascendingAges].sort(
      (a, b) => a - b
    );

    expect(ascendingAges).toEqual(expectedAscending);

    // ==========================
    // Step 17: Sort Age Descending
    // ==========================
    await page.locator('.rt-th').filter({
      hasText: 'Age'
    }).click();

    const descendingAges = await getAgeValues();

    const expectedDescending = [...descendingAges].sort(
      (a, b) => b - a
    );

    expect(descendingAges).toEqual(expectedDescending);

    console.log('Scenario 13 executed successfully');
  });
});
