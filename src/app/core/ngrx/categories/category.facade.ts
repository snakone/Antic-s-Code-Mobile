import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CategoryActions from './category.actions';
import * as fromCategories from './category.selectors';
import { CategoriesPartialState } from '../ngrx.config';

@Injectable()

export class CategoryFacade {

  byName$ = this.store.select(fromCategories.getByName);
  categories$ = this.store.select(fromCategories.get);
  loaded$ = this.store.select(fromCategories.getLoaded);

  constructor(private store: Store<CategoriesPartialState>) { }

  public get(): void {
    this.store.dispatch(CategoryActions.get());
  }

  public getByName(name: string): void {
    this.store.dispatch(CategoryActions.getByName({name}));
  }

  public reset(): void {
    this.store.dispatch(CategoryActions.reset());
  }

}
