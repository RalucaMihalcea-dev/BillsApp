import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { BillService } from './bill.service';

describe('BillService', () => {
  let billService: BillService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillService],
    });
    billService = TestBed.inject(BillService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(billService).toBeTruthy();
  });

  it('should get all users', () => {
    const expectedResponse: User[] = [
      { id: 1, firstName: 'George', lastName: 'Bluth' } as User,
      { id: 2, firstName: 'Janet', lastName: 'Weaver' } as User,
      { id: 3, firstName: 'Emma', lastName: 'Wong' } as User,
    ];

    billService.getAll().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/user`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedResponse);
  });
});
