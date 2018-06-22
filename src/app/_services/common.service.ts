import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
@Injectable()
export class CommonService {

  constructor(private router: Router) { }
  
  logout(route:string){
    localStorage.removeItem('userDetails');
    localStorage.removeItem("menu-config");
    this.router.navigate([route]);
  }
  
}
