import { test, expect } from "@playwright/test"

test('Get all usernames registered', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();

    const rows = page.getByRole('table').getByRole('row');
    const usernames: string[] = [];

    const rowsCount = await rows.count();

    for (let i = 1; i < rowsCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1);
        const username = await cell.textContent();

        if (username) {
            usernames.push(username);
        }

    }

    console.log(usernames);

});


test('Get all Employee Name registered', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();

    const rows = page.getByRole('table').getByRole('row');
    const employeeName: string[] = [];

    const rowsCount = await rows.count();

    for (let i = 1; i < rowsCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(3);
        const employee = await cell.textContent();

        if (employee) {
            employeeName.push(employee);
        }

    }

    console.log(employeeName);

});
