import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ArticleActions from './article.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { ArticleService } from '@services/article/article.service';
import { UserService } from '@services/user/user.service';

@Injectable()

export class ArticleEffects {

  constructor(
    private actions: Actions,
    private articleSrv: ArticleService,
    private userSrv: UserService
  ) { }

  // GET ARTICLES
  loadArticlesEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(ArticleActions.get),
      concatMap(() =>
      this.articleSrv.get()
        .pipe(
          map(articles => ArticleActions.getSuccess(
            { articles, id: this.userSrv.getUser()._id 
          })),
          catchError(error =>
              of(ArticleActions.getFailure({ error: error.message }))
    ))))
  );

}
