import { createSelector } from '@ngrx/store';

import * as fromOnline from './online.reducer';
import { getOnlinePartialState } from '../ngrx.index';
import { OnlinePartialState } from '../ngrx.config';

export const getOnlineState = createSelector(
  getOnlinePartialState,
  (state: OnlinePartialState) => state.online
);

export const get = createSelector(
  getOnlineState, fromOnline.getOnline
);

export const getLoaded = createSelector(
  getOnlineState, fromOnline.getOnlineLoaded
);

