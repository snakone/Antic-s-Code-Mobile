import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FriendsPageRouting } from './friends.routing';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { OnlineAccessModule } from '@store/online/data-access/online-access.module';
import { FriendsPage } from './friends.page';

@NgModule({
  declarations: [
    FriendsPage
  ],
  imports: [
    CommonModule,
    FriendsPageRouting,
    IonicModule,
    TranslateModule,
    PageHeaderModule,
    OnlineAccessModule
  ]
})

export class FriendsPageModule { }
