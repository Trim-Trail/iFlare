import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/item.model';
import { ItemDataService } from 'src/app/services/item-data.service';
import { ItemState } from '../store/reducers';
import * as moment from 'moment';
import { itemCreated, itemEdited } from '../store/item.actions';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default.config';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.scss']
})
export class ItemManagerComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  item: Item;
  mode: 'edit' | 'create';
  unsavedChanges = false;
  nameMaxLength = 30;
  infoMaxLength = 200;
  @ViewChild('uploader') uploader: ElementRef;
  private file: File = null;
  public image: string | ArrayBuffer | SafeResourceUrl;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ItemManagerComponent>,
    private itemDataService: ItemDataService,
    private store: Store<ItemState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data);
    this.dialogTitle = data.dialogTitle;
    this.item = data.item;
    this.mode = data.mode;
    this.image = data.item.picture;
    const formElements = {
      name: [null, Validators.required],
      price: [null],
      actualPrice: [null],
      save: [null],
      buyItem: [null],
      getItem: [null],
      mainItem: [null],
      subItem: [null],
      description: [null],
      displayOrder: [null],
      categoryId: ['1']
    };

    this.form = this.formBuilder.group(formElements);
    this.form.valueChanges.subscribe(f => {
      this.unsavedChanges = this.form.dirty;
    });
    if (this.mode === 'edit') {
      this.form.patchValue({ ...this.item });
    }
  }

  ngOnInit(): void {
  }

  onSubmitForm(): void {
    if (!this.form.invalid) {
      const change: Item = {
        ...this.item,
        ...this.form.value,
        picture: this.image
      };
      if (this.mode === 'create') {
        this.save(change);
      }
      else if (this.mode === 'edit') {
        this.update(change);
      }
    }
  }

  private save(changes: Item): void {
    this.itemDataService.save(changes)
      .subscribe((item) => {
        this.unsavedChanges = false;
        this.store.dispatch(itemCreated({ item }));
        this.dialogRef.close();
      });
  }

  private update(changes: Item): void {
    this.itemDataService.update(changes)
      .subscribe(() => {
        const updatedItem: Update<Item> = {
          id: changes.id,
          changes
        };
        this.unsavedChanges = false;
        this.store.dispatch(itemEdited({ update: updatedItem }));
        this.dialogRef.close();
      });
  }

  onCancel(): void {
    if (this.unsavedChanges) {
      const dialogConfig = defaultDialogConfig();
      dialogConfig.data = {
        dialogTitle: 'Confirm',
        data: {
          message: 'You have unsaved changes, Do you really want to cancel the changes?'
        }
      };

      this.dialog.open(ConfirmDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe((data) => {
          if (data.action === 'yes') {
            this.dialogRef.close();
          }
        });
    }
    else{
      this.dialogRef.close();
    }
  }

  onChangeImage(): void {
    this.uploader.nativeElement.click();
  }

  onRemoveImage(): void {
    const data = {
      dialogTitle: 'Confirm',
      data: {
        message: 'Do you want to remove this image?'
      }
    };
    const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
    this.dialog.open(ConfirmDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'yes') {
          this.image = '';
          this.unsavedChanges = true;
        }
      });
  }

  onImageUpload(fileUploader: any): void {
    this.file = fileUploader.target.files[0];
    this.previewImage();
  }

  private previewImage(): void {
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.file);
    fileReader.onload = ((e) => {
      this.image = fileReader.result;
    });
  }
}
