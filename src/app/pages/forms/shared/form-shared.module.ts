import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPickerComponent } from './data-picker/data-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormTitleComponent } from './form-title/form-title.component';
import { LayoutModule } from '@layout/layout.module';
import { SnippetsModule } from '@shared/components/snippets/snippets.module';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
  declarations: [
    DataPickerComponent,
    FormTitleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    LayoutModule,
    SnippetsModule,
    NgrxFormsModule,
  ],
  exports: [
    DataPickerComponent,
    FormTitleComponent
  ]
})

export class FormSharedModule { }
