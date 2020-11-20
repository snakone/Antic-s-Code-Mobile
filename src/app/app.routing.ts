import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { UserGuard } from '@core/guards/user.guard';
import { TutorialGuard } from './core/guards/tutorial.guard';
import { Error404Component } from './shared/components/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
    .then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
    .then(m => m.HomePageModule),
    canLoad: [UserGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module')
    .then(m => m.CreatePageModule),
    canLoad: [UserGuard, TutorialGuard]
  },
  {
    path: 'detail/:slug',
    loadChildren: () => import('./pages/detail/detail.module')
    .then(m => m.DetailPageModule),
    canLoad: [UserGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module')
    .then(m => m.ProfilePageModule),
    canLoad: [UserGuard]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
