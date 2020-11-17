import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { PageHeaderComponent } from './page-header.component';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule
  ],
  exports: [PageHeaderComponent]
})

export class PageHeaderModule { }
