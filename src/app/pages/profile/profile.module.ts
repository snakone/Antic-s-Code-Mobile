import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfilePageRouting } from './profile.routing';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ProfilePageRouting,
    SharedModule,
    LayoutModule,
    PageHeaderModule
  ],
  declarations: [
    ProfilePage,
    ProfileUserComponent,
    ProfileStatsComponent
  ]
})

export class ProfilePageModule {}
