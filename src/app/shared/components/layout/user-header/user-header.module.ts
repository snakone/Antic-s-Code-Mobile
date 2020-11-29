import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserHeaderComponent } from './user-header.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserHeaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TranslateModule
  ],
  exports: [UserHeaderComponent]
})

export class UserHeaderModule { }
