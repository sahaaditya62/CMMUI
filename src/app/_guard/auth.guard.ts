import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor( private r: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    console.log('Checking the AuthGuard');
    console.log("Route Requested"+JSON.stringify(state.url));
    if(localStorage.getItem('userDetails')){
      return true;
    }
      this.r.navigateByUrl("/login");
    
  }
}
