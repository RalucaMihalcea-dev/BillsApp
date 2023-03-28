import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.tokenStorageService.signOut();
          window.location.reload();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
