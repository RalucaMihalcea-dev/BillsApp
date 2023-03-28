import { Injectable } from '@angular/core';
import { Role } from '../models/role';

const TOKEN_KEY = 'auth-token';
const USER_ROLES = 'auth-user-roles';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserRoles(userRoles: Role[]): void {
    window.sessionStorage.removeItem(USER_ROLES);
    window.sessionStorage.setItem(USER_ROLES, JSON.stringify(userRoles));
  }

  public getUserRoles(): Role[] {
    const userRoles = window.sessionStorage.getItem(USER_ROLES);
    console.log('UserRoles: ' + userRoles);

    if (userRoles != null) {
      return JSON.parse(userRoles) as Role[];
    }

    return [];
  }
}
