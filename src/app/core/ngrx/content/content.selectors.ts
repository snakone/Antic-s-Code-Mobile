import { createSelector } from '@ngrx/store';

import * as fromContent from './content.reducer';
import { getAppState } from '../ngrx.index';
import { AppState } from '@app/app.config';

export const getContentState = createSelector(
  getAppState,
  (state: AppState) => state.content
);

export const getArticles = createSelector(
  getContentState, fromContent.getArticles
);

export const getDrafts = createSelector(
  getContentState, fromContent.getDrafts
);

export const getLoaded = createSelector(
  getContentState, fromContent.getLoaded
);

export const getBySlug = createSelector(
  getContentState, fromContent.getBySlug
);

export const getBySlugLoaded = createSelector(
  getContentState, fromContent.getBySlugLoaded
);

