import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login';
import { Register, RegisterResponse } from '../models/register';
import { Role } from '../models/role';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login user', () => {
    const username = 'testUser';
    const password = 'testPass';

    const expectedResponse: LoginResponse = {
      accessToken: 'jwt_token',
      accessTokenExpirationTime: 'accessTokenExpirationTime',
      userRoles: [Role.Member],
    };

    authService.login(username, password).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/authentication/login`);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(expectedResponse);
  });

  it('should register user', () => {
    const registerModel: Register = {
      username: 'John',
      password: 'testPass',
      confirmPassword: 'testPass',
      email: 'johndoe@example.com',
    };

    const expectedResponse: RegisterResponse = {
      username: 'John',
      token: 'jwt_token',
      email: 'johndoe@example.com',
    };

    authService.register(registerModel).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/authentication/register`);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(registerModel);

    req.flush(expectedResponse);
  });
});
