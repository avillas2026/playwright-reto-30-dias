import { Locator, Page } from "@playwright/test";

export class CorporateBrandingMenu {

    readonly page: Page
    readonly corporateBranding: Locator

    constructor(page: Page) {
        this.page = page
        this.corporateBranding = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Corporate Branding')

    }

     async clickOnCorporateBranding() {
        await this.corporateBranding.click()
    }
}
