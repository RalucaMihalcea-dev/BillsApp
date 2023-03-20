import { Client } from './../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  public API = 'https://localhost:7164/api';
  public baseUrl = `${this.API}/client`;

  constructor(private httpClient: HttpClient) {}

  getClients(): Observable<Array<Client>> {
    const test = '';
    return this.httpClient.get<Array<Client>>(this.baseUrl);
  }
}
