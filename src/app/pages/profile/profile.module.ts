import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfilePageRouting } from './profile.routing';
import { SharedModule } from '@shared/shared.module';
import { UserHeaderModule } from '@layout/user-header/user-header.module';
import { SharedProfileModule } from '@layout/profile/profile.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ProfilePageRouting,
    SharedModule,
    UserHeaderModule,
    SharedProfileModule
  ],
  declarations: [
    ProfilePage
  ]
})

export class ProfilePageModule {}
