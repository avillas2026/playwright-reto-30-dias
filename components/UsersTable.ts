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
        await expect(firstAdminToSearch, "No Admin users found in the table")

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
        await expect(firstESSToSearch, "No ESS users found in the table")

        return firstESSToSearch
    }

    async editFirstESSOnTheTable() {

        const firstESSToEdit = await this.getFirstESSFromTable()
        await firstESSToEdit
            .locator('button')
            .filter({ has: this.page.locator('i.bi-pencil-fill') }).click()

    }




}


















