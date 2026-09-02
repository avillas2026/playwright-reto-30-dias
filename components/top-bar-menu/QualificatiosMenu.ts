import { Locator, Page } from "@playwright/test";

export class QualificationsMenu {

    readonly page: Page
    readonly qualifications: Locator

    constructor(page: Page) {
        this.page = page
        this.qualifications = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications')

    }

    private menuItem(item: QualificationsItem): Locator {
        return this.page.getByRole('menuitem', { name: item })
    }


    async clickOnItem(item: QualificationsItem) {
        await this.qualifications.click()
        await this.menuItem(item).click()
    }

    private async clickOnQualifications() {
        await this.qualifications.click()
    }
}

export enum QualificationsItem {
    SKILLS = 'Skills',
    EDUCATION = 'Education',
    LICENSES = 'Licenses',
    LANGUAGES = 'Languages',
    MEMBERSHIPS= 'Memberships',
}
