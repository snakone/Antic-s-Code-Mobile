import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnippetsModule } from '../../snippets/snippets.module';
import { CustomSlidesComponent } from './custom-slides.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomSlidesComponent],
  imports: [
    CommonModule,
    IonicModule,
    SnippetsModule,
    TranslateModule,
    FormsModule
  ],
  exports: [CustomSlidesComponent]
})

export class CustomSlidesModule { }
