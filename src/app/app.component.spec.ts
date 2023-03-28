import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Role } from 'src/app/models/role';
import { AppComponent } from './app.component';
import { TokenStorageService } from './services/token-storage.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let tokenStorageServiceSpy: jasmine.SpyObj<TokenStorageService>;

  beforeEach(async () => {
    tokenStorageServiceSpy = jasmine.createSpyObj('TokenStorageService', [
      'getToken',
      'getUserRoles',
      'signOut',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: TokenStorageService, useValue: tokenStorageServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show admin board if user has admin role', () => {
    tokenStorageServiceSpy.getToken.and.returnValue('adminToken');
    tokenStorageServiceSpy.getUserRoles.and.returnValue([Role.Admin]);

    component.ngOnInit();

    expect(component.showAdminBoard).toBeTrue();
  });

  it('should show member board if user has member role', () => {
    tokenStorageServiceSpy.getToken.and.returnValue('memberToken');
    tokenStorageServiceSpy.getUserRoles.and.returnValue([Role.Member]);

    component.ngOnInit();

    expect(component.showMemberBoard).toBeTrue();
  });
});
