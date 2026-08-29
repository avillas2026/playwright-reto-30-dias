import {test, expect} from '@playwright/test';

test ('Login to hrm exitoso', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin');
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible();
});

test('Login to hrm fallido', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', {name: 'Username'}).fill('Admin');
    await page.getByRole('textbox', {name: 'Password'}).fill('otro123');
    await page.getByRole('button', {name: 'Login'}).click();
    
    await expect(page.getByRole('alert')).toBeVisible();
    console.log(await page.getByRole('alert').textContent());
    await expect(page.getByText('Invalid credentials')).toBeVisible(); 

});