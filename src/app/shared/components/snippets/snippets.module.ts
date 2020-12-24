import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideArrowsComponent } from './slide-arrows/slide-arrows.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgrxFormErrorComponent } from './ngrx-form-error/ngrx-form-error.component';
import { FormErrorComponent } from './form-error/form-error.component';

@NgModule({
  declarations: [
    SlideArrowsComponent,
    NgrxFormErrorComponent,
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    SlideArrowsComponent,
    NgrxFormErrorComponent,
    FormErrorComponent
  ]
})

export class SnippetsModule { }
