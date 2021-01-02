import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SlideArrowsComponent } from './slide-arrows/slide-arrows.component';
import { NgrxFormErrorComponent } from './ngrx-form-error/ngrx-form-error.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component'

@NgModule({
  declarations: [
    SlideArrowsComponent,
    NgrxFormErrorComponent,
    FormErrorComponent,
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ],
  exports: [
    SlideArrowsComponent,
    NgrxFormErrorComponent,
    FormErrorComponent,
    UserAvatarComponent
  ]
})

export class SnippetsModule { }
