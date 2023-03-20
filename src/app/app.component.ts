import { Component } from '@angular/core';
import { Client } from './models/client';
import { BillService } from './services/bill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  clients: Array<Client> | undefined;

  constructor(private billService: BillService) {}

  loadClients(): void {
    this.billService.getClients().subscribe((data) => {
      this.clients = data;
      console.log(data);
    });
  }
}
