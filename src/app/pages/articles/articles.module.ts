import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ArticlesRoutingModule } from './articles.routing';
import { ArticlesPage } from './articles.page';
import { CardsModule } from '@layout/cards/cards.module';
import { PageHeaderModule } from '@layout/page-header/page-header.module';
import { ArticlesAccessModule } from '@store/articles/data-access/articles-access.module';

@NgModule({
  declarations: [
    ArticlesPage
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    IonicModule,
    PageHeaderModule,
    TranslateModule,
    CardsModule,
    ArticlesAccessModule
  ]
})

export class ArticlesPageModule { }
