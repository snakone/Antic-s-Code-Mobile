import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CreatePageRouting } from './create.routing';
import { CreatePage } from './create.page';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { SnippetsModule } from '@shared/components/snippets/snippets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRouting,
    TranslateModule,
    PageHeaderModule,
    SnippetsModule
  ],
  declarations: [CreatePage]
})

export class CreatePageModule {}
