import { Menu } from './navbar-menu.model';
export class OrgConfig {
    constructor(public orgId: string, public appTitle: string,public logout : string, public menuList: Menu[]) { };
}