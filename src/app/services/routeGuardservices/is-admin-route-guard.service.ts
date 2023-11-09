import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminRouteGuardService implements CanActivate {

  constructor(private authenticationService:AuthenticationServiceService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authenticationService.isLoggedIn().value;
    if (isLoggedIn) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  // ){return true;}
  }
}
  
