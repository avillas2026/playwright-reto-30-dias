import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { SidePanel, SideMenuOption } from '../components/SidePanel';

test ('Login to hrm exitoso', async ({page}) => {

    /* Ya no se requiere mandar el login porque lo hace el setup
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin() */
    await page.goto("/web/index.php/dashboard/index")

    const sidepanel = new SidePanel(page)
    await sidepanel.clickOnOption(SideMenuOption.ADMIN)


});

test('Login to hrm fallido', async ({page}) => {
    
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin1234')
    
    await expect(page.getByRole('alert')).toBeVisible();
    console.log(await page.getByRole('alert').textContent());
    await expect(page.getByText('Invalid credentials')).toBeVisible(); 

});

test('Login Empleado - Sin menu Admin', async ({ page }) => {

  /*   const loginPage = new LoginPage(page)
    await loginPage.loginAsEmployed() */

    await page.goto("/web/index.php/dashboard/index")

    const sidepanel = new SidePanel(page)
    await sidepanel.clickOnOption(SideMenuOption.BUZZ)
   


});