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

export const getUsersLoaded = createSelector(
  getUserState, fromUser.getUsersLoaded
);

export const getUsers = createSelector(
  getUserState, fromUser.getUsers
);

export const getPublic = createSelector(
  getUserState, fromUser.getPublic
);

export const getPublicLoaded = createSelector(
  getUserState, fromUser.getPublicLoaded
);

export const getFiltered = createSelector(
  getUserState, fromUser.getFiltered
);

export const getByName = createSelector(
  getUserState, fromUser.getByName
);

export const getFriends = createSelector(
  getUserState, fromUser.getFriends
);

export const getFriendsLoaded = createSelector(
  getUserState, fromUser.getFriendsLoaded
);

export const getFriendsCount = createSelector(
  getUserState, fromUser.getFriendsCount
);


