import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Item } from 'src/app/models/item.model';
import { ItemDataService } from 'src/app/services/item-data.service';
import { itemActions } from './item-action.types';

@Injectable()
export class ItemEffects{
  constructor(private actions$: Actions, private itemDataService: ItemDataService){}
  loadAllItems$ = createEffect(
    () => this.actions$.pipe(
      ofType(itemActions.loadAllItems)
      , concatMap(action => this.itemDataService.get())
      , map((items: Item[]) => itemActions.allItemsLoaded({ items }))
    ));
}
