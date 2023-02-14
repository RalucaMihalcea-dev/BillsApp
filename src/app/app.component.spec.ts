import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { dummyClientsResponse } from './mocks/client-dummy';
import { BillService } from './services/bill.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let billServiceSpy: jasmine.SpyObj<BillService>;

  beforeEach(async () => {
    billServiceSpy = jasmine.createSpyObj('BillService', ['getClients']);
    billServiceSpy.getClients.and.returnValue(of(dummyClientsResponse));

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: BillService, useValue: billServiceSpy }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      fixture.detectChanges();
    });

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('loadClients call getClients from billService', () => {
    app.loadClients();
    expect(billServiceSpy.getClients).toHaveBeenCalled();
  });

  it('loadClients expect to return a client list', (() => {
    app.loadClients();
    expect(app.clients).toEqual(dummyClientsResponse);
  }));

});
