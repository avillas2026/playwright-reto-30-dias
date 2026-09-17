import { test, expect } from "@playwright/test"
import { LoginPage } from "../pageobjects/LoginPage"
import { SidePanel, SideMenuOption } from "../components/SidePanel"
import { TopBarMenu } from "../components/top-bar-menu/TopBarMenu";

test('Get all usernames registered', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row')
    const usernames: string[] = []

    const rowsCount = await rows.count()

    for (let i = 1; i < rowsCount; i++) {
        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if (username) {
            usernames.push(username)
        }

    }

    console.log(usernames)

});


test('Get all Employee Name registered', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

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

// Este test falla si los usuarios de la tabla cambian.
test('Select specific user for edition', async ({ page }) => {

     const userForEdition = 'Jobinsam@6742' //Modificar usuario antes de correr

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })


    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input").inputValue();
  //const currentUsername = await page.locator('.oxd-input-group:has-text("Username") input').inputValue();

    expect(currentUsername).toEqual(userForEdition)

    expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
        .toHaveValue(currentUsername) 

    });


test('Usuario aleatorio para editar', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    //Seleccionando un usuario aleatorio.
    const rows = page.getByRole('table').getByRole('row')
    const rowsCount = await rows.count()

    console.log('Cantidad de filas:', rowsCount)

    if (rowsCount > 0) {

        const rowsAleatorio = Math.floor(Math.random() * rowsCount) + 1;
        console.log('Fila Aleatoria: ', rowsAleatorio)
    const userForEdition = String(await rows.nth(rowsAleatorio).getByRole('cell').nth(1).textContent())
    console.log('Usuario Aleatorio: ', userForEdition)

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })


    await pencilToEdit.click()
    
    const currentUsername = await page.locator('.oxd-input-group:has-text("Username") input').inputValue();
    console.log('Usuario al editar: ',currentUsername)
    
    //expect(currentUsername).toEqual(userForEdition)


    expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
       .toHaveValue(currentUsername) 

       
    } else console.log('No se encontraron usuarios')
    
     /*  const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input").inputValue(); */

});

test('Check user role options', async({page}) =>{

    const expectedRoleOptions = ['-- Select --', 'Admin', 'ESS']

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

     await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').nth(0).click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()
    
    console.log(currentUserRoleOptions)

     expect(currentUserRoleOptions,
        'The options displayed in the User Role Dropdown do not match the expected options.').toEqual(expectedRoleOptions)
 

});


test('Check Status options', async({page}) =>{

    const expectedStatusOptions = ['-- Select --', 'Enabled', 'Disabled']

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

     await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').nth(1).click()
    const currentStatusOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()
    
    console.log(currentStatusOptions)

     expect(currentStatusOptions,
        'The options displayed in the User Role Dropdown do not match the expected options.').toEqual(expectedStatusOptions)
 

});

test ('Filter by user admin', async({page}) =>{

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topBarMenu = new TopBarMenu(page)
    await topBarMenu.userManagement.clickOnItem(topBarMenu.UserManagementItems.USERS)

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

     //Filas que contienen el role admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    })

    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users before filtering: ', expectedAdminCount)
  
    //Aplicar filtro
    await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').nth(0).click()
    await page.getByRole('listbox').getByRole('option', { name: 'Admin' }).click()
     await page.getByRole('button', { name: 'Search' }).click()


    //La tabla filtrada deberia tener exactamente la misma cantidad que encontramos
    await expect(allBodyRows).toHaveCount(expectedAdminCount)
    const total = await allBodyRows.count()
    console.log ('La nueva tabla allBodyRows: ', total)
    console.log ('La expetativa  expectedAdminCount era: ', expectedAdminCount)

    for (let i = 0; i < expectedAdminCount; i++) {
        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }


});

