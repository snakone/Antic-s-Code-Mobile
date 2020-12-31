import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.config';

import * as ArticleActions from './article.actions';
import * as fromArticles from './article.selectors';

@Injectable({providedIn: 'root'})

export class ArticlesFacade {

  articles$ = this.store.select(fromArticles.get);
  loaded$ = this.store.select(fromArticles.getLoaded);
  full$ = this.store.select(fromArticles.getFull);

  constructor(private store: Store<AppState>) { }

  public get(): void {
    this.store.dispatch(ArticleActions.get());
  }

  public reset(): void {
    this.store.dispatch(ArticleActions.reset());
  }

}
