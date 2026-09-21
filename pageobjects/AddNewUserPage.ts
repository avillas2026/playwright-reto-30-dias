import { Locator, Page, expect } from "@playwright/test";

export class AddNewUserPage {

    private readonly page: Page
    readonly btnADD: Locator
    readonly userRole: Locator
    readonly employeeName: Locator
    readonly status: Locator
    readonly userName: Locator
    readonly password: Locator
    readonly confirmPassword: Locator
    readonly btnSave: Locator
    readonly btnCancel: Locator


    constructor(page: Page) {
        this.page = page
        this.btnADD = page.getByText('Add')
        this.userRole = page.locator('div.oxd-grid-item--gutters').filter({ has: this.page.getByText('User Role') }).locator('div.oxd-select-text-input')
        this.employeeName = page.getByRole('textbox', { name: 'Type for hints...' })
        this.status = page.locator('div.oxd-grid-item--gutters').filter({ has: this.page.getByText('Status') }).locator('div.oxd-select-text-input')
        this.userName = page.locator('div.oxd-grid-item--gutters').filter({ has: this.page.getByText('Username') }).getByRole('textbox')
        this.password = page.locator('div.oxd-grid-item--gutters').filter({ has: this.page.getByText('Password', { exact: true }) }).getByRole('textbox')
        this.confirmPassword = page.locator('div.oxd-grid-item--gutters').filter({ has: this.page.getByText('Confirm Password', { exact: true }) }).getByRole('textbox')    
        this.btnSave = page.getByRole('button', { name: 'Save' })
        this.btnCancel = page.getByRole('button', { name: 'Cancel' })


    }

    async clickOnAdd() {
        await this.btnADD.click()
    }

    async selectUserRole(userRole: string) {
        await this.userRole.click()

        //await this.page.getByText(userRole, { exact: true }).click()
        await this.page.getByRole('option', { name: userRole }).click()
    }

    async selectEmployeeName(employeeName: string) {
        await this.employeeName.fill(employeeName)
        await this.page.getByText('Qwerty Qwerty LName', { exact: true }).click()

    }

    async selectStatus(status: string) {
        await this.status.click()

        await this.page.getByText(status).click()
    }

    async enterUsername(username: string) {
        await this.userName.fill(username)
    }

    async enterPassword(password: string) {
        await this.password.fill(password)
    }

    async enterConfirmPassword(password: string) {
        await this.confirmPassword.fill(password)
    }

    async clickOnSave() {
        await this.btnSave.click()
    }

    async checkUserWasAddedMessage() {
        await expect(this.page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Saved')
    }

    async checkMessageWrongPassword(){

         await expect(this.page.locator('.oxd-input-field-error-message')).toContainText('Passwords do not match')

    }
}