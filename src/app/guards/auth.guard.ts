import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthenticationService,
    private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserLoggedIn()) {
      console.log("User is logged in");
      return true;
    }

    //set the attempted URL in the AuthService for redirecting after login
    this.authService.redirectUrl = state.url;
    
    //new way (since Angular 7.1) use UrlTree return type
    return this.router.createUrlTree(['./login']);
  }
  
}
