import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailHeaderComponent } from './mail-header.component';
import { IonicModule } from '@ionic/angular';
import { UserSlidesComponent } from './components/user-slides/user-slides.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MailHeaderComponent,
    UserSlidesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule,
    RouterModule
  ],
  exports: [MailHeaderComponent]
})

export class MailHeaderModule { }
