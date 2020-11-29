import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoPipe } from './logo/logo.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ChipPipe } from './chip/chip.pipe';
import { BadgePipe } from './badge/badge.pipe';
import { ImagePipe } from './image/image.pipe';

@NgModule({
  declarations: [
    LogoPipe,
    SanitizerPipe,
    ChipPipe,
    ImagePipe,
    BadgePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoPipe,
    SanitizerPipe,
    ChipPipe,
    ImagePipe,
    BadgePipe
  ]
})

export class PipesModule { }
