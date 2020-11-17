import { createSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';
import { getAppState } from '../ngrx.index';
import { AppState } from '@app/app.config';

export const getUserState = createSelector(
  getAppState,
  (state: AppState) => state.user
);

export const get = createSelector(
  getUserState, fromUser.get
);

export const getLoaded = createSelector(
  getUserState, fromUser.getLoaded
);

