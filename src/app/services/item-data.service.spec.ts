import { TestBed } from '@angular/core/testing';
import { ItemAdapter } from '../models/item.model';
import { ItemDataService } from './item-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ItemDataService', () => {
  let service: ItemDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemAdapter, ItemDataService]
    });
    service = TestBed.inject(ItemDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`returned Observable should be matching data`, () => {
    const mockitem = [{
      id: 1,
      name: 'Lorem Ipsum is simply 1',
      date: '2020-11-12T00:00:00.000Z',
      choice: 'Basic'
    },
    {
      id: 2,
      name: 'Lorem Ipsum is simply 2',
      date: '2020-11-12T00:00:00.000Z',
      choice: 'Basic'
    }];

    service.get()
      .subscribe(data => {
        expect(data.length).toBe(2);
      });

    const req = httpTestingController.expectOne('items');

    expect(req.request.method).toEqual('GET');

    req.flush(mockitem);
  });

  it(`save data should works as expected`, () => {
    const mockitem = {
      id: null,
      name: 'Lorem Ipsum is simply 1',
      date: new Date('2020-11-12T00:00:00.000Z'),
      choice: 'Basic'
    };

    service.save({
      id: null,
      name: 'Lorem Ipsum is simply 1',
      date: new Date('2020-11-12T00:00:00.000Z'),
      choice: 'Basic'
    })
      .subscribe(data => {
        expect(data.name).toEqual('Lorem Ipsum is simply 1');
      });

    const req = httpTestingController.expectOne('items');

    expect(req.request.method).toEqual('POST');

    req.flush(mockitem);
  });

  it(`should call the handleError()`, () => {
    service.get().subscribe(data => data,
      error => {
      expect(error.toString()).toContain('An unknown error occurred!');
    });

    const req = httpTestingController.expectOne('items');

    expect(req.request.method).toEqual('GET');
    req.flush({ status: 400, statusText: 'Bad Request' });
  });
});
