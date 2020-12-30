import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailPage } from './mail.page';
import { MailIntroComponent } from './components/mail-intro/mail-intro.component';
import { MailSearchComponent } from './components/mail-search/mail-search.component';
import { MailUserComponent } from './components/mail-user/mail-user.component';

const routes: Routes = [
  {
    path: '',
    component: MailPage,
    children: [
      {
        path: '',
        component: MailIntroComponent
      },
      {
        path: 'search',
        component: MailSearchComponent
      },
      {
        path: 'user/:id',
        component: MailUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MailRoutingModule { }
