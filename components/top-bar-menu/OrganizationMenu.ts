import { Locator, Page } from "@playwright/test";

export class OrganizationMenu {

    readonly page: Page
    readonly organization: Locator

    constructor(page: Page) {
        this.page = page
        this.organization = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Organzation')

    }

    private menuItem(item: OrganizationItem): Locator {
        return this.page.getByRole('menuitem', { name: item })
    }

    async clickOnItem(item: OrganizationItem) {
        await this.organization.click()
        await this.menuItem(item).click()
    }

    private async clickObJob() {
        await this.organization.click()
    }
}

export enum OrganizationItem {
    GENERALINFORMATION = 'General Information',
    LOCATIONS = 'Locations',
    STRUCTURE = 'Structure'
}
