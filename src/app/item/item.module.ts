import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { ItemDataService } from '../services/item-data.service';
import { StoreModule } from '@ngrx/store';
import * as fromItemState from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './store/item.effects';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ItemListComponent, ItemManagerComponent],
  exports: [ItemListComponent, ItemManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    StoreModule.forFeature(fromItemState.itemStateFeatureKey, fromItemState.itemReducers),
    EffectsModule.forFeature([ItemEffects])
  ],
  providers: [
    ItemDataService
  ]
})
export class ItemModule { }
