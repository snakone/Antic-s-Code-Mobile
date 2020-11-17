import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { DetailPageRouting } from './detail.routing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { PageHeaderModule } from '@layout/page-header/page-header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DetailPageRouting,
    FormsModule,
    TranslateModule,
    PageHeaderModule,
    MarkdownModule.forChild()
  ],
  declarations: [DetailPage]
})

export class DetailPageModule {}
