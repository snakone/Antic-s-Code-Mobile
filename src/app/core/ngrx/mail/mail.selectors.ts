import { createSelector } from '@ngrx/store';

import * as fromMail from './mail.reducer';
import { getMailPartialState } from '../ngrx.index';
import { MailPartialState } from '../ngrx.config';

export const getMailState = createSelector(
  getMailPartialState,
  (state: MailPartialState) => state.mail
);

export const getMail = createSelector(
  getMailState, fromMail.getMail
);

export const getLoaded = createSelector(
  getMailState, fromMail.getMailLoaded
);

export const getFiltered = createSelector(
  getMailState, fromMail.getFiltered
);

export const getSelected = createSelector(
  getMailState, fromMail.getSelected
);

export const getUnread = createSelector(
  getMailState, fromMail.getUnread
);

export const getByFriend = createSelector(
  getMailState, fromMail.getByFriend
);

export const getByFriendLoaded = createSelector(
  getMailState, fromMail.getByFriendLoaded
);
