import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { BillService } from 'src/app/services/bill.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUserRoles!: Role[];
  users: User[] | undefined;

  constructor(private token: TokenStorageService, private billService: BillService) {}

  ngOnInit(): void {
    this.currentUserRoles = this.token.getUserRoles();
    this.loadUsers();
  }

  loadUsers(): void {
    this.billService.getAll().subscribe((data) => {
      this.users = data;
    });
  }
}
