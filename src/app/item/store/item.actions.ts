import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models/item.model';

export const loadAllItems = createAction(
  '[Item Root Resolver] Load all items'
);

export const allItemsLoaded = createAction(
  '[Item Effect] Load all items from api',
  props<{ items: Item[] }>()
);

export const itemCreated = createAction(
  '[Item Manage] Item created',
  props<{ item: Item }>()
);

export const itemEdited = createAction(
  '[Item Manage] Item updated'
  , props<{update: Update<Item>}>()
);

export const itemDeleted = createAction(
  '[Item Manage] Item deleted',
  props<{ id: number }>()
);


