import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as CategoryActions from './category.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { CategoryService } from '@core/services/category/category.service';

@Injectable()

export class CategoryEffects {

  constructor(
    private actions: Actions,
    private categorySrv: CategoryService
  ) { }

  // GET CATEGORIES
  getCategoriesEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(CategoryActions.get),
      concatMap((action) =>
      this.categorySrv.get()
        .pipe(
          map(categories => CategoryActions.getSuccess({ categories })),
          catchError(error =>
              of(CategoryActions.getFailure({ error: error.message }))
    ))))
  );

  // GET CATEGORY BY NAME
  loadCategoryByNameEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(CategoryActions.getByName),
      concatMap((action) =>
      this.categorySrv.getByName(action.name)
        .pipe(
          map(category => CategoryActions.getByNameSuccess({ category })),
          catchError(error =>
              of(CategoryActions.getByNameFailure({ error: error.message }))
    ))))
  );
}
