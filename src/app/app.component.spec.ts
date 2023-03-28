import { TestBed } from '@angular/core/testing';
import { Role } from './models/role';
import { TokenStorageService } from './services/token-storage.service';

describe('TokenStorageService', () => {
  let tokenStorageService: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService],
    });

    tokenStorageService = TestBed.inject(TokenStorageService);
  });

  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('should be created', () => {
    expect(tokenStorageService).toBeTruthy();
  });

  it('should save and retrieve token', () => {
    const expectedToken = 'abc123';

    tokenStorageService.saveToken(expectedToken);

    const retrievedToken = tokenStorageService.getToken();

    expect(retrievedToken).toEqual(expectedToken);
  });

  it('should save and retrieve user roles', () => {
    const expectedRoles = [Role.Admin, Role.Member];

    tokenStorageService.saveUserRoles(expectedRoles);

    const retrievedRoles = tokenStorageService.getUserRoles();

    expect(retrievedRoles).toEqual(expectedRoles);
  });

  it('should clear storage on sign out', () => {
    spyOn(window.sessionStorage, 'clear');

    tokenStorageService.signOut();

    expect(window.sessionStorage.clear).toHaveBeenCalled();
  });
});
