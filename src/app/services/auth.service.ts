import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './../models/login';
import { Register, RegisterResponse } from './../models/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_API = `${environment.apiUrl}/authentication`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.AUTH_API}/login`,
      {
        username,
        password,
      },
      this.httpOptions
    );
  }

  register(registerModel: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.AUTH_API}/register`,
      registerModel,
      this.httpOptions
    );
  }
}
