import { Locator, Page } from "@playwright/test";

export class NationalitiesMenu {

    readonly page: Page
    readonly nationalities: Locator

    constructor(page: Page) {
        this.page = page
        this.nationalities = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Nationalities')

    }

    async clickOnNationalities() {
        await this.nationalities.click()
    }
}

