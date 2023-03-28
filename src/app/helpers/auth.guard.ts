import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from '../models/role';
import { TokenStorageService } from './../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRoles = this.tokenStorageService.getUserRoles();

    const requiredRoles = route.data.roles ? (route.data.roles as Role[]) : [];
    if (
      (requiredRoles.length === 0 && userRoles.length > 0) ||
      requiredRoles.some((requiredRole) => userRoles.includes(requiredRole))
    ) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
