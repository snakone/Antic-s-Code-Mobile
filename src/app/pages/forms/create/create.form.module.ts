import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormPageRouting } from './create.form.routing';
import { IonicModule } from '@ionic/angular';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CreateFormPage } from './create.form.page';
import { CategoryAccessModule } from '@store/categories/data-access/category-access.module';

import { FormCreateIntroComponent } from './components/form-create-intro/form-create-intro.component';
import { FormCreateCategoryComponent } from './components/form-create-category/form-create-category.component';
import { FormCreateDataComponent } from './components/form-create-data/form-create-data.component';
import { FormCreateMessageComponent } from './components/form-create-message/form-create-message.component';
import { FormCreateLinksComponent } from './components/form-create-links/form-create-links.component';
import { FormCreateCoverComponent } from './components/form-create-cover/form-create-cover.component';
import { FormCreateSummaryComponent } from './components/form-create-summary/form-create-summary.component';

@NgModule({
  declarations: [
    CreateFormPage,
    FormCreateIntroComponent,
    FormCreateCategoryComponent,
    FormCreateDataComponent,
    FormCreateMessageComponent,
    FormCreateLinksComponent,
    FormCreateCoverComponent,
    FormCreateSummaryComponent
  ],
  imports: [
    CommonModule,
    CreateFormPageRouting,
    IonicModule,
    TranslateModule,
    PageHeaderModule,
    CategoryAccessModule
  ]
})

export class CreateFormPageModule { }
