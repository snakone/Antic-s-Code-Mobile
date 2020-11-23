import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoPipe } from './logo/logo.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ChipPipe } from './chip/chip.pipe';

@NgModule({
  declarations: [
    LogoPipe,
    SanitizerPipe,
    ChipPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoPipe,
    SanitizerPipe,
    ChipPipe
  ]
})

export class PipesModule { }
