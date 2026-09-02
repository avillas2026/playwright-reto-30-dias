import { Page } from "@playwright/test";
import { UserManagementMenu, UserManagementItem } from "./UserManagementMenu";
import { JobMenu, JobItem } from "./JobMenu";
import { OrganizationMenu, OrganizationItem } from "./OrganizationMenu";
import { QualificationsMenu, QualificationsItem} from "./QualificatiosMenu"
import { NationalitiesMenu} from "./NationalitiesMenu"
import { CorporateBrandingMenu} from "./CorporateBrandingMenu"
import { ConfigurationMenu, ConfigurationItem} from "./ConfigurationMenu"


export class TopBarMenu {

    readonly page:Page
    readonly userManagement: UserManagementMenu
    readonly job: JobMenu
    readonly organization: OrganizationMenu
    readonly qualifications: QualificationsMenu
    readonly nationalities: NationalitiesMenu
    readonly corporteBranding: CorporateBrandingMenu
    readonly configuration: ConfigurationMenu

    
    //Se leen las variables de los items de menu
    readonly JobItems = JobItem;
    readonly UserManagementItems = UserManagementItem;
    readonly OrganizationItems = OrganizationItem;
    readonly QualificationsItems = QualificationsItem;
    //  readonly NationalitiesItems = NationalitiesItem;
    //  readonly CorporateBrandingItems = CorporateBrandingItem;
    readonly ConfigurationItems = ConfigurationItem;

    constructor(page: Page){   
        this.page = page
        this.userManagement = new UserManagementMenu(page)
        this.job = new JobMenu(page)
        this.organization = new OrganizationMenu(page)
        this.qualifications = new QualificationsMenu(page)
        this.nationalities = new NationalitiesMenu(page)
        this.corporteBranding = new CorporateBrandingMenu(page)
        this.configuration = new ConfigurationMenu(page)

    }
}


