import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  exports: [
    ImageUploadComponent
  ]
})

export class LayoutModule { }
