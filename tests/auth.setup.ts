import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

setup('authentication as admin', async ({ page }) => {

    console.log('Autentication iniciada usando el setup')
    // Inicia sesión con el usuario administrador.
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    // Verifica que el inicio de sesión haya sido exitoso.
    await expect(loginPage.menuOptionAdmin).toBeVisible()

    // Guarda el nuevo estado de autenticación para reutilizarlo en otros tests.
    await page.context().storageState({ path: 'auth/admin.json' })

    console.log('Autenticacion completada usando el setup')
})

setup('authentication as employee', async({page}) => {

    console.log('Autentication iniciada usando el setup')

    // Inicia sesión con el usuario empleado.
    const loginPage = new LoginPage(page)
    await loginPage.loginAsEmployed()

    await expect(loginPage.menuOptionAdmin).not.toBeVisible();
    await page.context().storageState({path: 'auth/employee.json'})

    console.log('Autenticacion completada usando el setup')
})