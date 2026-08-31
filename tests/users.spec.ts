import { test, expect } from "@playwright/test"

test('Get all usernames registered', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

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

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

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

     const userForEdition = 'PutTestt'

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

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

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    //Seleccionando un usuario aleatorio.
    const rows = page.getByRole('table').getByRole('row')
    const rowsCount = await rows.count()

    console.log('Cantidad de filas:', rowsCount)

    if (rowsCount > 0) {

        const rowsAleatorio = Math.floor(Math.random() * 10) + 1;
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
