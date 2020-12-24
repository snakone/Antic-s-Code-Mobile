import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { MailRoutingModule } from './mail.routing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MailHeaderModule } from '@layout/mail-header/mail-header.module';

import { MailPage } from './mail.page';
import { MailIntroComponent } from './components/mail-intro/mail-intro.component';
import { MailSearchComponent } from './components/mail-search/mail-search.component';
import { MailUserComponent } from './components/mail-user/mail-user.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MailPage,
    MailIntroComponent,
    MailSearchComponent,
    MailUserComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    IonicModule,
    TranslateModule,
    MailHeaderModule,
    RouterModule,
    PipesModule
  ]
})

export class MailPageModule { }
