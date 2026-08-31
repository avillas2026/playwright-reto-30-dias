import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test('Check left menu options', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    const leftMenuItems = await page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log('Current menu items count:', currentMenuItemsCount)

    const currentMenuItems: string[] = []

    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuText = await leftMenuItems.nth(i).innerText();
        currentMenuItems.push(menuText)

    }

    console.log(currentMenuItems)

    const expectdMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];

    expect(currentMenuItems).toEqual(expectdMenuItems);
    expect(currentMenuItems[0]).toEqual('Admin');
    console.log('Primer menu item:', currentMenuItems[0]);


});

test('Navegando el panel izquierdo', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    const leftMenuItems = await page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()

    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuItem = await leftMenuItems.nth(i);
        const menuText = await menuItem.innerText();


        if (menuText === 'Maintenance') {
            await menuItem.click();
            await page.goBack({ waitUntil: 'commit' });
        } else {
            await menuItem.click();
        }

        console.log('Click en Menu item:', menuText);

    }
});

test('Check all the qualification links', async ({ page }) => {

    const expectedPages = [
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        },

    ]

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

    const qualificationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages) {

        const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu })
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url)) // Valida una porcion de la URL

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

    }

});

test('Check all the Pin/Configurations links', async ({ page }) => {

    const expectedPages = [
        {
            menu: 'Optional Fields',
            url: '/web/index.php/pim/configurePim'
        },
        {
            menu: 'Custom Fields',
            url: '/web/index.php/pim/listCustomFields'
        },
        {
            menu: 'Data Import',
            url: '/web/index.php/pim/pimCsvImport'
        },

    ]

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'PIM' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Configuration').click()

    const qualificationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages) {

        const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu })
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url)) // Valida una porcion de la URL

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Configuration').click()

    }

});