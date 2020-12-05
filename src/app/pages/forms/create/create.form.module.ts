import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormPageRouting } from './create.form.routing';
import { IonicModule } from '@ionic/angular';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CreateFormPage } from './create.form.page';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';
import { LayoutModule } from '@layout/layout.module';
import { RandomizerPipe } from '@shared/pipes/randomizer/randomizer.pipe';

import { FormCreateIntroComponent } from './components/form-create-intro/form-create-intro.component';
import { FormCreateDataComponent } from './components/form-create-data/form-create-data.component';
import { FormCreateMessageComponent } from './components/form-create-message/form-create-message.component';
import { FormCreateLinksComponent } from './components/form-create-links/form-create-links.component';
import { FormCreateTitleComponent } from './components/form-create-title/form-create-title.component';
import { FormCreateIndexComponent } from './components/form-create-index/form-create-index.component';
import { FormCreatePreviewComponent } from './components/form-create-preview/form-create-preview.component';

@NgModule({
  declarations: [
    CreateFormPage,
    FormCreateIntroComponent,
    FormCreateDataComponent,
    FormCreateMessageComponent,
    FormCreateLinksComponent,
    FormCreateTitleComponent,
    FormCreateIndexComponent,
    FormCreatePreviewComponent
  ],
  imports: [
    CommonModule,
    CreateFormPageRouting,
    FormsModule,
    IonicModule,
    TranslateModule,
    PageHeaderModule,
    PipesModule,
    LayoutModule
  ],
  providers: [
    RandomizerPipe
  ]
})

export class CreateFormPageModule { }
