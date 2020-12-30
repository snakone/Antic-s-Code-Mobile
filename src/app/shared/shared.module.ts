import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModule } from '@core/language/language.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
    TranslateModule,
    LanguageModule
  ],
  exports: [
    PipesModule,
    TranslateModule,
    LanguageModule
  ],
  providers: [],
})

export class SharedModule { }
