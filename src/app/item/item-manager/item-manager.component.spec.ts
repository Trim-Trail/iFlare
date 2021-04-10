import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ItemManagerComponent } from './item-manager.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ItemDataService } from 'src/app/services/item-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ItemModule } from '../item.module';
import * as fromItemState from '../store/reducers';
import { FormBuilder } from '@angular/forms';
import { Item, ItemAdapter } from 'src/app/models/item.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('ItemManagerComponent', () => {
  let component: ItemManagerComponent;
  let fixture: ComponentFixture<ItemManagerComponent>;
  let mockStore: MockStore<fromItemState.ItemState>;
  let dialogData = {
    dialogTitle: 'Test Dialog',
    item: new Item(null, null, null, null),
    mode: 'create'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ItemManagerComponent
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        provideMockStore(),
        ItemDataService,
        ItemAdapter
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagerComponent);
    mockStore = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init properties with value from MAT_DIALOG_DATA', () => {
    expect(component.dialogTitle).toEqual('Test Dialog');
    expect(component.mode).toEqual('create');
    expect(component.item).toBeTruthy();
  });

  it('should input data correctly', fakeAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let name = fixture.debugElement.query(By.css('#name'));
      expect(name.nativeElement.value).toBe('');
      name.nativeElement.value = 'Item1';
      name.nativeElement.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      expect(component.form.get('name').value).toBe('Item1');
    });
  }));
});
