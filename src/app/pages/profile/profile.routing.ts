import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: '',
        component: ProfileUserComponent
      },
      {
        path: 'stats',
        component: ProfileStatsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfilePageRouting {}
