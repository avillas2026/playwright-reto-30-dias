import { test, expect } from '@playwright/test';

test('Check left menu options', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

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
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

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