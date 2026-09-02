import { Locator, Page } from "@playwright/test";

export class ConfigurationMenu {

    readonly page: Page
    readonly configuration: Locator

    constructor(page: Page) {
        this.page = page
        this.configuration = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Configuration')

    }

    private menuItem(item: ConfigurationItem): Locator {
        return this.page.getByRole('menuitem', { name: item })
    }


    async clickOnItem(item: ConfigurationItem) {
        await this.configuration.click()
        await this.menuItem(item).click()
    }

    async clickOnConfiguration() {
        await this.configuration.click()
    }
}

export enum ConfigurationItem {
    EMAIL_CONFIGURATION = 'Email Configuration',
    EMAIL_SUBSCRIPTIONS = 'Email Subscriptions',
    LOCALIZATION = 'Localization',
    LANGUAGE_PACKAGES = 'Language Packages',
    MODULES = 'Modules',
    SOCIAL_MEDIA_AUTHENTICATION = 'Social Media Authentication',
    REGRISTER_OAUTH_CLIENT = 'Register OAuth Client',
    LDAP_CONFIGURATION = 'LDAP Configuration'

}
