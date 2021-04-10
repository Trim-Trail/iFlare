import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItem from './reducers';



export const selectItemState = createFeatureSelector<fromItem.ItemState>(fromItem.itemStateFeatureKey);

export const selectAllItems = createSelector(
  selectItemState,
  fromItem.selectAll
);

export const selectAllItemsLoaded = createSelector(
  selectItemState,
  (state) => state.isItemsLoaded
);

export const selectAllItemEntities = createSelector(
  selectItemState,
  fromItem.selectEntities
);


