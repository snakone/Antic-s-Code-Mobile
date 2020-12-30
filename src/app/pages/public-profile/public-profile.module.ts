import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicProfileRouting } from './public-profile.routing';
import { PublicProfilePage } from './public-profile.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { SharedProfileModule } from '@layout/profile/profile.module';
import { UserHeaderModule } from '@layout/user-header/user-header.module';

@NgModule({
  declarations: [
    PublicProfilePage
  ],
  imports: [
    IonicModule,
    CommonModule,
    PublicProfileRouting,
    SharedModule,
    SharedProfileModule,
    UserHeaderModule 
  ]
})

export class PublicProfilePageModule { }
