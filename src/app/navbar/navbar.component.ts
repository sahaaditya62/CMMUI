import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { CommonService } from '../_services/common.service';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap'
import { OrgConfig } from './navbar-org-config.model'
import { Menu } from './navbar-menu.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = false;
  orgConfig: any = {}
  currentOrg: OrgConfig = null;
  public isCollapsed: boolean = false;

  constructor(private serviceInstance: NavbarService, private router: Router) {
    this.serviceInstance.loadConfig().forEach((item: OrgConfig) => {
        this.orgConfig[item.orgId] = item;
        console.log("Config Done!!");
        this.subscribeToChangeEvent();
    });

    if (localStorage.getItem('userDetails') === null || localStorage.getItem("menu-config") === null) {
      
      console.log("Wait for initialization to complete");
    } else {
      let orgId:string = localStorage.getItem("menu-config");
      if (orgId == null){
        console.log('Waiting from initialization')
      }
      else{
        this.showNavbar = true;
        console.log("Read from local strorage:" + orgId);
        this.currentOrg = this.orgConfig[orgId];
        console.log(this.currentOrg);
      }
    }
    console.log("Navbar need to be persisted");

  }
  subscribeToChangeEvent() {
    this.serviceInstance.showNavBarEmitter.subscribe((navData) => {
      if (navData != null) {
        console.log("Change in nabar detected");
        this.showNavbar = navData.showNav;
        if (this.showNavbar == true) {
          if (navData.orgId) {
            this.currentOrg = this.orgConfig[navData.orgId];
            localStorage.setItem("menu-config", navData.orgId);
          }
        } else {
          this.currentOrg = null;
          localStorage.removeItem("menu-config");
        }
      }
    });
  }
  ngOnInit() {
    
    
  }

  open() {
    console.log("Open clicked")
  }
  /**
   * Logout link
   */
  logout(link){
    localStorage.removeItem('userDetails');
    localStorage.removeItem("menu-config");
    this.showNavbar=false;
    this.router.navigate(['/login']);
  }
}
