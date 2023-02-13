import { BillService } from './services/bill.service';
import { Client } from './models/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'BillsApp';
  clients: Array<Client> | undefined;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.billService.getClient().subscribe((data) => {
      this.clients = data;
      console.log(data);
    });
  }
}
