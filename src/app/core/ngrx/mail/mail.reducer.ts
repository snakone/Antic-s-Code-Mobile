import { createReducer, on, Action } from '@ngrx/store';
import * as MailActions from './mail.actions';
import { Mail } from '@shared/interfaces/interfaces';

export interface MailState {
  selected: Mail;
  unread: number;
  single: Mail;
  friend: Mail[];
  friendLoaded: boolean;
}

export const inititalState: MailState = {
  selected: null,
  unread: 0,
  single: null,
  friend: [],
  friendLoaded: false
};

const featureReducer = createReducer(
  inititalState,
  // GET BY FRIEND
  on(MailActions.getByFriend, (state) => (
    { ...state, error: null }
  )),
  on(MailActions.getByFriendSuccess, (state, { mail }) => (
    {
      ...state,
      error: null,
      friend: mail,
      friendLoaded: true
    }
  )),
  on(MailActions.getByFriendFailure, (state, { error }) => (
    { ...state, friendLoaded: false, error }
  )),
  // SET MAIL MESSAGE
  on(MailActions.set, (state, { subject }) => (
    { 
      ...state, 
      error: null,
      single: [...state.friend].find(f => f.subject === subject)
    }
  )),
  // MARK UNREAD
  on(MailActions.markUnread, (state, { id, mark }) => (
    {
      ...state,
      mail: [...state.friend]
       .map(i => i.last._id === id ? (i.last.read = mark, i) : i),
      error: null
    }
  )),
  // RESET BY FRIEND
  on(MailActions.reset, (state) => (
    {
      ...state,
      friend: [],
      friendLoaded: false
    }
  )),
  // RESET SINGLE
  on(MailActions.resetSingle, (state) => (
    {
      ...state,
      single: null,
      error: null
    }
  ))
);

export const getSelected = (state: MailState) => state.selected;
export const getUnread = (state: MailState) => state.unread;
export const getByFriend = (state: MailState) => state.friend;
export const getSingle = (state: MailState) => state.single;
export const getByFriendLoaded = (state: MailState) => state.friendLoaded;

export function reducer(state: MailState | undefined, action: Action) {
  return featureReducer(state, action);
}




