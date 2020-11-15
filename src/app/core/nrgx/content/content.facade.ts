import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.config';

import * as ContentActions from './content.actions';
import * as fromContent from './content.selectors';

@Injectable({providedIn: 'root'})

export class ContentFacade {

  content$ = this.store.select(fromContent.get);
  loaded$ = this.store.select(fromContent.getLoaded);
  bySlug$ = this.store.select(fromContent.getBySlug);
  bySlugLoaded$ = this.store.select(fromContent.getBySlugLoaded);

  constructor(private store: Store<AppState>) { }

  public get(): void {
    this.store.dispatch(ContentActions.get());
  }

  public getBySlug(slug: string): void {
    this.store.dispatch(ContentActions.getBySlug({slug}));
  }

  public resetBySlug(): void {
    this.store.dispatch(ContentActions.resetBySlug());
  }

}
