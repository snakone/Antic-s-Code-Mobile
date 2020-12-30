import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users.routing';
import { UsersPage } from './users.page';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    UsersPage
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    TranslateModule,
    IonicModule
  ]
})

export class UsersPageModule { }
