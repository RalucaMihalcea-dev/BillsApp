import { TestBed, getTestBed } from '@angular/core/testing';
import { BillService } from './bill.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Client } from '../models/client';
import { dummyClientsResponse } from '../mocks/client-dummy';

describe('BillService', () => {
  let service: BillService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillService],
    });
    injector = getTestBed();
    service = TestBed.inject(BillService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserList() should return data', () => {
    service.getClients().subscribe((res) => {
      expect(res).toEqual(dummyClientsResponse);
    });

    const req = httpMock.expectOne('https://localhost:7164/api/Client');
    expect(req.request.method).toBe('GET');
    req.flush(dummyClientsResponse);
  });
});
