import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        component: ArticlesListComponent
      },
      {
        path: 'drafts',
        component: DraftListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomePageRouting {}
