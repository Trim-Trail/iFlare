import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

const AngularMaterialModules = [
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatIconModule,
  MatRadioModule
];

@NgModule({
  declarations: [],
  exports: [
    AngularMaterialModules
  ]
})
export class MaterialModule { }
