import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { ItemDataService } from 'src/app/services/item-data.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default.config';
import { ItemManagerComponent } from '../item-manager/item-manager.component';
import { itemActions } from '../store/item-action.types';
import { selectAllItems } from '../store/item.selectors';
import { ItemState } from '../store/reducers';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, AfterViewInit {
  @Input() item: Item = null;
  items$: Observable<Item[]>;
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  displayedColumns: string[] = ['sl', 'name', 'price', 'actualPrice', 'save', 'buyItem', 'getItem', 'category', 'displayOrder', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<ItemState>,
    private dialog: MatDialog,
    private itemDataService: ItemDataService) {
  }

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(selectAllItems));
    this.items$.subscribe(item => {
      this.dataSource.data = item;
      console.log(item);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAddNewItem(): void {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Add New Item',
      item: new Item(null, null, null, null, null, null, null, null, null, null),
      mode: 'create'
    };

    this.dialog.open(ItemManagerComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  onEditItem(item: Item): void {
    this.item = item;
    const data = {
      dialogTitle: 'Edit Item',
      item,
      mode: 'edit'
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(ItemManagerComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
      });
  }

  onDeleteItem(item: Item): void {
    this.item = item;
    const data = {
      dialogTitle: 'Confirm',
      data: {
        message: 'Do you really want to delete this event?'
      }
    };
    const dialogConfig = {...defaultDialogConfig(), ...{data}};
    this.dialog.open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'yes') {
          this.delete();
        }
      });
  }

  private delete(): void {
    this.itemDataService.delete(this.item.id)
      .subscribe(() => {
        this.store.dispatch(itemActions.itemDeleted({ id: this.item.id }));
      });
  }

}
