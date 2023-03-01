import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyApiHelperService } from './../services/my-api-helper.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private APIservice: MyApiHelperService, private cookieService: CookieService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if (!this.APIservice.CheckUserIsLoggedin()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  
}
