import { NgModule } from '@angular/core';
import { LogoPipe } from './logo/logo.pipe';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ChipPipe } from './chip/chip.pipe';
import { BadgePipe } from './badge/badge.pipe';
import { ImagePipe } from './image/image.pipe';
import { RandomizerPipe } from './randomizer/randomizer.pipe';

@NgModule({
  declarations: [
    LogoPipe,
    SanitizerPipe,
    ChipPipe,
    ImagePipe,
    BadgePipe,
    RandomizerPipe
  ],
  exports: [
    LogoPipe,
    SanitizerPipe,
    ChipPipe,
    ImagePipe,
    BadgePipe,
    RandomizerPipe
  ]
})

export class PipesModule { }
