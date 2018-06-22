import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { NavbarData } from '../_model/navbar-data.model';
import { OrgConfig } from './navbar-org-config.model';



@Injectable()
export class NavbarService {
      private _config: OrgConfig[] = [
            {
                  "orgId": "MINE_OPS",
                  "appTitle": "Mine Operations Application",
                  "logout" : "login",
                  "menuList": [
                        { "id": 1, "description": "Home", "link": "/mine/home", "icon": "assets/home-icon.png" }
                  ]
            },
            {
                  "orgId": "SHIP_REP",
                  "appTitle": "Shipment Provider Application",
                  "logout" : "login",
                  "menuList": [
                        { "id": 1, "description": "Home", "link": "/logistics/home", "icon": "assets/home-icon.png" }]
            },
            {
                  "orgId": "SMLT_OP",
                  "appTitle": "Smelter Application",
                  "logout" : "login",
                  "menuList": [
                        { "id": 1, "description": "Home", "link": "/smelter/home", "icon": "assets/home-icon.png" }]
            }
      ];

      private _showNavBar: BehaviorSubject<NavbarData> = new BehaviorSubject<NavbarData>(null);
      public showNavBarEmitter: Observable<NavbarData> = this._showNavBar.asObservable();

      constructor(private http: Http) { }


      showNavBarWithTitle(ifShow: boolean, orgId: string) {
            this._showNavBar.next(new NavbarData(ifShow, orgId));
      }
      loadConfig(): OrgConfig[] {
            return this._config;

      }
}
