import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailHeaderComponent } from './mail-header.component';
import { IonicModule } from '@ionic/angular';
import { FriendsSlidesComponent } from './components/friends-slides/friends-slides.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { OnlineAccessModule } from '@store/online/data-access/online-access.module';

@NgModule({
  declarations: [
    MailHeaderComponent,
    FriendsSlidesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    RouterModule,
    OnlineAccessModule
  ],
  exports: [MailHeaderComponent]
})

export class MailHeaderModule { }
