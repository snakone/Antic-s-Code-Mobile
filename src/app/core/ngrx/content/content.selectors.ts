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

export const getFull = createSelector(
  getContentState, fromContent.getFull
);

export const getByCategoryCount = createSelector(
  getContentState, fromContent.getCategoryCount
);

export const getDataLoaded = createSelector(
  getContentState, fromContent.getDataLoaded
);

export const getMostViewedLoaded = createSelector(
  getContentState, fromContent.getMostViewedLoaded
);

export const getCategoryCountLoaded = createSelector(
  getContentState, fromContent.getCategoryCountLoaded
);

export const getMostLiked = createSelector(
  getContentState, fromContent.getMostLiked
);

export const getMostViewed = createSelector(
  getContentState, fromContent.getMostViewed
);

export const getCount = createSelector(
  getContentState, fromContent.getCount
);

export const getTotalLikes = createSelector(
  getContentState, fromContent.getTotalLikes
);


