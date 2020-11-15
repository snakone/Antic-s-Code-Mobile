import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { Error404Component } from './error404/error404.component';
import { IonicModule } from '@ionic/angular';
import { EditComponent } from './modals/edit/edit.component';
import { MarkDownComponent } from './modals/markdown/markdown.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CreateComponent } from './modals/create/create.component';

@NgModule({
  declarations: [
    Error404Component,
    EditComponent,
    MarkDownComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forChild()
  ],
  exports: [
    EditComponent,
    MarkDownComponent,
    CreateComponent
  ]
})

export class ComponentsModule { }
