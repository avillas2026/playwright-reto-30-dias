import { Locator, Page } from "@playwright/test";

export class JobMenu {

    readonly page: Page
    readonly job: Locator

    constructor(page: Page) {
        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job')

    }

    private menuItem(item: JobItem): Locator {
        return this.page.getByRole('menuitem', { name: item })
    }

    async clickOnItem(item: JobItem) {
        await this.job.click()
        await this.menuItem(item).click()
    }

    private async clickOnJob() {
        await this.job.click()
    }
}

export enum JobItem {
    JOBTITLES = 'Job Titles',
    PAYGRADES = 'Pay Grades',
    EMPLOYMENTSSTATUS = 'Employment Status',
    JOBCATEGORY = 'Job Categories',
    WORKSHIFT = 'Work Shifts'
}
