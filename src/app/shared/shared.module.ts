import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ImgPlaceholderDirective } from './directives/img-placeholder.directive';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ImgPlaceholderDirective
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    ImgPlaceholderDirective
  ]
})
export class SharedModule { }
