import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { itemActions } from '../item/store/item-action.types';
import { selectAllItemsLoaded } from '../item/store/item.selectors';
import { ItemState } from '../item/store/reducers';

@Injectable()
export class ItemResolverService implements Resolve<any> {
  loading = false;

  constructor(private store: Store<ItemState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store.pipe(
      select(selectAllItemsLoaded),
      tap((itemsLoaded) => {
        if (!this.loading && !itemsLoaded) {
          this.loading = true;
          this.store.dispatch(itemActions.loadAllItems());
          console.log('Load all items');
        }
      }),
      filter(itemsLoaded => itemsLoaded),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
