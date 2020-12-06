import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfilePageRouting } from './profile.routing';
import { SharedModule } from '@shared/shared.module';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { UserHeaderModule } from '@layout/user-header/user-header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ProfilePageRouting,
    SharedModule,
    UserHeaderModule
  ],
  declarations: [
    ProfilePage,
    ProfileUserComponent,
    ProfileStatsComponent
  ]
})

export class ProfilePageModule {}
