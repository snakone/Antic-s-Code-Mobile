import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.config';

import * as ContentActions from './content.actions';
import * as fromContent from './content.selectors';
import { Article } from '@shared/interfaces/interfaces';

@Injectable({providedIn: 'root'})

export class ContentFacade {

  articles$ = this.store.select(fromContent.getArticles);
  drafts$ = this.store.select(fromContent.getDrafts);
  loaded$ = this.store.select(fromContent.getLoaded);
  bySlug$ = this.store.select(fromContent.getBySlug);
  bySlugLoaded$ = this.store.select(fromContent.getBySlugLoaded);
  full$ = this.store.select(fromContent.getFull);
  dataLoaded$ = this.store.select(fromContent.getDataLoaded);
  count$ = this.store.select(fromContent.getCount);
  mostLiked$ = this.store.select(fromContent.getMostLiked);
  mostViewed$ = this.store.select(fromContent.getMostViewed);
  mostViewedLoaded$ = this.store.select(fromContent.getMostViewedLoaded);
  byCategoryCount$ = this.store.select(fromContent.getByCategoryCount);
  byCategoryCountLoaded$ = this.store.select(fromContent.getCategoryCountLoaded);
  likes$ = this.store.select(fromContent.getTotalLikes);

  constructor(private store: Store<AppState>) { }

  public get(): void {
    this.store.dispatch(ContentActions.get());
  }

  public getBySlug(slug: string): void {
    this.store.dispatch(ContentActions.getBySlug({slug}));
  }

  public setBySlug(article: Article): void {
    this.store.dispatch(ContentActions.setBySlug({article}));
  }

  public resetBySlug(): void {
    this.store.dispatch(ContentActions.resetBySlug());
  }

  public getData(): void {
    this.store.dispatch(ContentActions.getData());
  }

}
