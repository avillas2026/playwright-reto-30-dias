import { expect, Locator, Page } from "@playwright/test";

export class UserTable {

    readonly page: Page
    constructor(page: Page) {

        this.page = page

    }


    private getAllBodyRows(): Locator {
        return this.page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    }


    private getAdminRows(): Locator {
        const allBodyRows = this.getAllBodyRows()
        //Filas que continene el role Admin
        const currentAdminRows = allBodyRows.filter({
            has: this.page.getByRole('cell').nth(2).getByText('Admin')
        })

        return currentAdminRows
    }

    private async getFirstAdminFromTable(): Promise<Locator> {
        const currentAdminRows = this.getAdminRows()
        const firstAdminToSearch = currentAdminRows.nth(0)
        await expect(firstAdminToSearch, "No Admin users found in the table").toBeVisible()

        return firstAdminToSearch
    }

    async editFirstAdminOnTheTable() {

        const firstAdminToEdit = await this.getFirstAdminFromTable()
        await firstAdminToEdit
            .locator('button')
            .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()

    }


    private getESSRows(): Locator {
        const allBodyRows = this.getAllBodyRows()
        const currentESSRows = allBodyRows.filter({
            has: this.page.getByRole('cell').nth(2).getByText('ESS')
        })

        return currentESSRows
    }

    private async getFirstESSFromTable(): Promise<Locator> {
        const currentESSRows = this.getESSRows()
        const firstESSToSearch = currentESSRows.nth(0)
        await expect(firstESSToSearch, "No ESS users found in the table").toBeVisible()

        return firstESSToSearch
    }

    async editFirstESSOnTheTable() {

        const firstESSToEdit = await this.getFirstESSFromTable()
        await firstESSToEdit
            .locator('button')
            .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()

    }


    private getRowByUsername(userName: string): Locator {
        const allBodyRows = this.getAllBodyRows()
        //Fila que contiene exactamente el username
        return allBodyRows.filter({
            has: this.page.getByRole('cell').nth(1).getByText(userName, { exact: true })
        })
    }

    async clickOnDeletetActionByUsername(userName: string) {
        const rowToDelete = this.getRowByUsername(userName)

        console.log(`Usuario a Borrar es: `, userName)

        await expect(rowToDelete, `No rows contain username: ${userName} were found`).toHaveCount(1)

        await rowToDelete
            .locator('button')
            .filter({ has: this.page.locator('i.bi-trash') }).click()
    }

    async acceptDeleteUser() {
        await this.page.getByRole('button', { name: /Yes, Delete/ }).click()
    }
    
    async cancelDeleteUser() {
        await this.page.getByRole('button', { name: /No, Cancel/ }).click()
    }

    async checkDeleteDialogIsClosed() {
        await expect(this.page.getByRole('button', { name: /Yes, Delete/ }),
            'The delete confirmation dialog is still open').toBeHidden()
    }


    async checkUserIsNotInTable(userName: string) {
        await expect(this.getRowByUsername(userName),
            `User ${userName} still appears in the table after being deleted`).toHaveCount(0)
    }

    async checkUserIsInTable(userName: string) {
        await expect(this.getRowByUsername(userName),
            `User ${userName} should still appear in the table`).toHaveCount(1)
    }



}


















