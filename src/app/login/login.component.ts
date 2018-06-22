import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NavbarService } from '../navbar/navbar.service'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host >>> .alert-custom {
      color: #ffffff;
      background-color: #ff0000;
      border-color: #800040;
      font-weight:bolder;
    }
  `]
})
export class LoginComponent implements OnInit {
  header="Application Login";
 
  model: any = {};
 
  message: string = 'TEST';
  isValid: boolean = true;
  spinner: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private navbarService: NavbarService, private authService: AuthenticationService) {
    
    this.model['org']='MINE_OPS';
  }

  ngOnInit() {
    //Do Logout
    //Cleanup local storage
    localStorage.removeItem("userDetails");
    localStorage.removeItem("menu-config");
    
    this.isValid = true;
   
  }
  changeOrg(newOrg){
    this.model['org'] = newOrg;
  }
  login() {
    //this.org = "MINE_OP";
    this.spinner = true;
    this.isValid = true;
    this.authService.authenticate(this.model).subscribe(payload => {
      console.log("Current org is :" + this.model.org);
      if(this.model.org =='MINE_OPS'){
        this.router.navigate(['mine/home']);
        this.navbarService.showNavBarWithTitle(true,this.model.org );
      }
      else if( this.model.org =='SHIP_REP'){
        this.router.navigate(['logistics/home']);
        this.navbarService.showNavBarWithTitle(true, this.model.org);
      }
      else if( this.model.org =='SMLT_OP'){
        this.router.navigate(['smelter/home']);
        this.navbarService.showNavBarWithTitle(true, this.model.org);
      }
      else if( this.model.org =='AUDITOR'){
        alert('Not implemented');
      }
      localStorage.setItem("userDetails", JSON.stringify(payload));
    }, err => {
      this.message = <any>err;
      this.isValid = false;
      console.log(err.error);
    }, () => { this.spinner = false; });


  }

}
