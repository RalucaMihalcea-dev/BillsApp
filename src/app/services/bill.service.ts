import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    console.log('here');
    return this.http.get<User[]>(`${environment.apiUrl}/user`);
  }
}
