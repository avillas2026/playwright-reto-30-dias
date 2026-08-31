import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test ('Login to hrm exitoso', async ({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', {name: 'Admin'})).toBeVisible();
});

test('Login to hrm fallido', async ({page}) => {
    
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin1234')
    
    await expect(page.getByRole('alert')).toBeVisible();
    console.log(await page.getByRole('alert').textContent());
    await expect(page.getByText('Invalid credentials')).toBeVisible(); 

});