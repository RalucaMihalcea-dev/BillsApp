import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showMemberBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const roles = this.tokenStorageService.getUserRoles();
      this.roles = roles;

      this.showAdminBoard = this.roles.includes(Role.Admin);
      this.showMemberBoard = this.roles.includes(Role.Member);
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
