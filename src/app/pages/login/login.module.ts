import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPage } from './login.page';
import { LoginPageRouting } from './login.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomSlidesModule } from '@layout/custom-slides/custom-slides.module';

import { SocialLoginComponent } from './components/social-login/social-login.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LoginPageRouting,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    CustomSlidesModule
  ],
  declarations: [
    LoginPage,
    SocialLoginComponent,
    HelpComponent
  ]
})

export class LoginPageModule {}
