import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleReducers } from '../../ngrx.index';
import { ArticleEffects } from '../article.effects';
import { ArticlesFacade } from '../article.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('ArticleState', articleReducers),
    EffectsModule.forFeature([
      ArticleEffects
    ]),
  ],
  providers: [ArticlesFacade]
})

export class ArticlesAccessModule { }
