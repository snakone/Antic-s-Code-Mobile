import { createReducer, on, Action } from '@ngrx/store';
import * as MailActions from './mail.actions';
import { Mail } from '@shared/interfaces/interfaces';

export interface MailState {
  mail: Mail[];
  mailLoaded: boolean;
  filtered: Mail[];
  selected: Mail;
  unread: number;
  friend: Mail[];
  friendLoaded: boolean;
}

export const inititalState: MailState = {
  mail: [],
  mailLoaded: false,
  filtered: [],
  selected: null,
  unread: 0,
  friend: [],
  friendLoaded: false
};

const featureReducer = createReducer(
  inititalState,
  // GET MAIL
  on(MailActions.get, (state) => (
    { ...state, error: null, filtered: [] }
  )),
  on(MailActions.getSuccess, (state, { mail }) => (
    {
      ...state,
      error: null,
      mail,
      filtered: mail,
      mailLoaded: true,
      unread: [...mail].reduce((acc, curr) => acc + (curr.last.read ? 0 : 1), 0)
    }
  )),
  on(MailActions.getFailure, (state, { error }) => (
    { ...state, mailLoaded: false, error }
  )),
  // GET BY FRIEND
  on(MailActions.getByFriend, (state) => (
    { ...state, error: null, mail: [] }
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
  on(MailActions.set, (state) => (
    { ...state, error: null, selected: null }
  )),
  on(MailActions.setSuccess, (state, { selected }) => (
    {
      ...state,
      error: null,
      selected
    }
  )),
  on(MailActions.setFailure, (state, { error }) => (
    { ...state, selected: null, error }
  )),
  // MARK UNREAD
  on(MailActions.markUnread, (state, { id, mark }) => (
    {
      ...state,
      mail: [...state.mail].map(i => i.last._id === id ? (i.last.read = mark, i) : i),
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
  ))
);

export const getMail = (state: MailState) => state.mail;
export const getMailLoaded = (state: MailState) => state.mailLoaded;
export const getFiltered = (state: MailState) => state.filtered;
export const getSelected = (state: MailState) => state.selected;
export const getUnread = (state: MailState) => state.unread;
export const getByFriend = (state: MailState) => state.friend;
export const getByFriendLoaded = (state: MailState) => state.friendLoaded;

export function reducer(state: MailState | undefined, action: Action) {
  return featureReducer(state, action);
}




