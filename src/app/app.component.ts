import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private tokenStorageService: TokenStorageService) {}

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
