import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormPage } from './create.form.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFormPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateFormPageRouting {}
