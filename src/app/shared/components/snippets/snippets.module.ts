import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideArrowsComponent } from './slide-arrows/slide-arrows.component';

@NgModule({
  declarations: [
    SlideArrowsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlideArrowsComponent
  ]
})

export class SnippetsModule { }
