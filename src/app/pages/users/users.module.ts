import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UsersRoutingModule } from './users.routing';
import { UsersPage } from './users.page';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { SnippetsModule } from '@shared/components/snippets/snippets.module';

@NgModule({
  declarations: [
    UsersPage
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    TranslateModule,
    IonicModule,
    SnippetsModule
  ]
})

export class UsersPageModule { }
