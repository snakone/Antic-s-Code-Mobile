import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

import { SingleContentHeaderLeftComponent } from './components/single-content-header-left/single-content-header-left.component';
import { SingleContentHeaderRightComponent } from './components/single-content-header-right/single-content-header-right.component';
import { SingleContentHeaderComponent } from './single-content-header.component';

@NgModule({
  declarations: [
    SingleContentHeaderComponent,
    SingleContentHeaderLeftComponent,
    SingleContentHeaderRightComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    SingleContentHeaderComponent
  ]
})

export class SingleContentHeaderModule { }
