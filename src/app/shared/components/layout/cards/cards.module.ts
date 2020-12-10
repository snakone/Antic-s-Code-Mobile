import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card/article-card.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MarkdownModule } from 'ngx-markdown';
import { CardOptionsComponent } from './article-card/components/card-options/card-options.component';

@NgModule({
  declarations: [
    ArticleCardComponent,
    CardOptionsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule,
    PipesModule,
    MarkdownModule.forChild()
  ],
  exports: [
    ArticleCardComponent
  ]
})

export class CardsModule { }
