import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { MailRoutingModule } from './mail.routing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MailHeaderModule } from '@layout/mail-header/mail-header.module';
import { MailAccessModule } from '@store/mail/data-access/mail-access.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { SnippetsModule } from '@shared/components/snippets/snippets.module';

import { MailPage } from './mail.page';
import { MailIntroComponent } from './components/mail-intro/mail-intro.component';
import { MailSearchComponent } from './components/mail-search/mail-search.component';
import { MailUserComponent } from './components/mail-user/mail-user.component';
import { MailUserCardComponent } from './components/mail-user/components/mail-user-card/mail-user-card.component';

@NgModule({
  declarations: [
    MailPage,
    MailIntroComponent,
    MailSearchComponent,
    MailUserComponent,
    MailUserCardComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    IonicModule,
    TranslateModule,
    MailHeaderModule,
    RouterModule,
    PipesModule,
    MailAccessModule,
    SnippetsModule
  ]
})

export class MailPageModule { }
