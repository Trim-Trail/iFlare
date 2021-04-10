import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllItems } from '../item/store/item.selectors';
import { ItemState } from '../item/store/reducers';
import { Item } from '../models/item.model';
import { ItemDataService } from '../services/item-data.service';

@Component({
  selector: 'app-flare',
  templateUrl: './flare.component.html',
  styleUrls: ['./flare.component.scss']
})
export class FlareComponent implements OnInit {
  items$: Observable<Item[]>;
  constructor(
    private store: Store<ItemState>,
    private dialog: MatDialog,
    private itemDataService: ItemDataService
    ) { }

    ngOnInit(): void {
      this.items$ = this.store.pipe(select(selectAllItems));
    }

}
