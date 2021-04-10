import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item, ItemAdapter } from '../models/item.model';
import * as moment from 'moment';

@Injectable()
export class ItemDataService {

  constructor(
    private http: HttpClient,
    private adapter: ItemAdapter) { }

  get(): Observable<Item[]> {
    console.log('get');
    return this.http
      .get<Item[]>('items')
      .pipe(
        map((data: any[]) => data.map(it => this.adapter.adapt(it))),
        catchError(this.handleError),
      );
  }

  save(item: Item): Observable<Item> {
    console.log('save');
    console.log('To Save', item);
    return this.http
      .post('items',
        {
          id: item.id,
          name: item.name,
          categoryId: 1,
          picture: item.picture,
          price: item.price,
          actualPrice: item.actualPrice,
          save: item.save,
          buyItem: item.buyItem,
          getItem: item.getItem,
          displayOrder: item.displayOrder
        })
      .pipe(
        map(it => this.adapter.adapt(it)),
        catchError(this.handleError)
      );
  }

  update(item: Item): Observable<any>{
    return this.http
      .put(`items/${item.id}`,
        {
          id: item.id,
          name: item.name,
          categoryId: 1,
          picture: item.picture,
          price: item.price,
          actualPrice: item.actualPrice,
          save: item.save,
          buyItem: item.buyItem,
          getItem: item.getItem,
          displayOrder: item.displayOrder
        })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any>{
    return this.http
      .delete(`items/${id}`)
      .pipe(
        map(item => {
          console.log(item);
          return item;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const customErrorMessage = 'An unknown error occurred!';
    return throwError(customErrorMessage);
  }
}
