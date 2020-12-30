import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileFooterComponent } from './profile-footer/profile-footer.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

@NgModule({
  declarations: [
    ProfileUserComponent,
    ProfileStatsComponent,
    ProfileFooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    ProfileUserComponent,
    ProfileStatsComponent,
    ProfileFooterComponent
  ]
})

export class SharedProfileModule { }
