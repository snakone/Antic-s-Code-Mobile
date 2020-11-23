import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ContentActions from '../content/content.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { ContentService } from '@services/content/content.service';

@Injectable()

export class ContentEffects {

  constructor(
    private actions: Actions,
    private contentSrv: ContentService
  ) { }

  // GET CONTENT
  getEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(ContentActions.get),
      concatMap(() =>
      this.contentSrv.get()
        .pipe(
          map(content => ContentActions.getSuccess({
            content: {articles: content.articles, drafts: content.drafts}
          })),
          catchError(error =>
              of(ContentActions.getFailure({ error: error.message }))
    ))))
  );

  // GET BY SLUG
  getBySlugEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(ContentActions.getBySlug),
      concatMap((action) =>
      this.contentSrv.getBySlug(action.slug)
        .pipe(
          map(article => ContentActions.getBySlugSuccess({article})),
          catchError(error =>
              of(ContentActions.getBySlugFailure({ error: error.message }))
    ))))
  );

  // GET ARTICLES DATA
  getArticlesDataEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(ContentActions.getData),
      concatMap(() =>
      this.contentSrv.getData()
        .pipe(
          map(res => ContentActions.getDataSuccess({ res })),
          catchError(error =>
              of(ContentActions.getDataFailure({ error: error.message }))
    ))))
  );

}
