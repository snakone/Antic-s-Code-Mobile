import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ContentActions from '../content/content.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { ContentService } from '@core/services/content/content.service';

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
            content: [...content.drafts, ...content.articles]
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

}
