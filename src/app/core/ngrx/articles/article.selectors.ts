import { createSelector } from '@ngrx/store';

import * as fromArticles from './article.reducer';
import { getArticlesPartialState } from '../ngrx.index';
import { ArticlesPartialState } from '../ngrx.config';

export const getArticlesState = createSelector(
  getArticlesPartialState,
  (state: ArticlesPartialState) => state.articles
);

export const get = createSelector(
  getArticlesState, fromArticles.getArticles
);

export const getLoaded = createSelector(
  getArticlesState, fromArticles.getArticlesLoaded
);

export const getFull = createSelector(
  getArticlesState, fromArticles.getFull
);



