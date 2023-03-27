import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from './../models/role';
import { TokenStorageService } from './../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRoles = this.tokenStorageService.getUserRoles();

    const requiredRoles = route.data.roles ? (route.data.roles as Role[]) : [];
    if (
      (requiredRoles.length === 0 && userRoles.length > 0) ||
      requiredRoles.some((requiredRole) => userRoles.includes(requiredRole))
    ) {
      return true;
    }
    // route.data.roles && route.data.roles.
    // if (userRoles.length != 0) {
    //   // check if route is restricted by role
    //   userRoles.forEach((role) => {
    //     if (route.data.roles && route.data.roles.indexOf(role) === -1) {
    //       // role not authorised so redirect to home page
    //       this.router.navigate(['/']);
    //       return false;
    //     }
    //   });

    // authorized so return true
    // return false;
    // }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
