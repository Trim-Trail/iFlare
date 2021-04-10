import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer,
  on
} from '@ngrx/store';
import { Item } from 'src/app/models/item.model';
import { itemActions } from '../item-action.types';



export const itemStateFeatureKey = 'item';

export interface ItemState extends EntityState<Item> {
  isItemsLoaded: boolean;
}

export const itemAdapter = createEntityAdapter<Item>();

export const initialItemState: ItemState = itemAdapter.getInitialState({
  isItemsLoaded: false,
});

export const itemReducers = createReducer(
  initialItemState,
  on(itemActions.allItemsLoaded, (state, action) => {
    return itemAdapter.setAll(action.items, { ...state, isItemsLoaded: true });
  }),
  on(itemActions.itemCreated, (state, { item }) => {
    return itemAdapter.addOne(item, state);
  }),
  on(itemActions.itemEdited, (state, { update }) => {
    return itemAdapter.updateOne(update, state);
  }),
  on(itemActions.itemDeleted, (state, { id }) => {
    return itemAdapter.removeOne(id, state);
  }),

);

export const { selectAll, selectEntities } = itemAdapter.getSelectors();
