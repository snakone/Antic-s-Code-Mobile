import { props, createAction } from '@ngrx/store';
import { Mail, MailMessage } from '@shared/interfaces/interfaces';

// GET MAIL
export const get =
  createAction('[Mail API] Get Mail');

export const getSuccess =
  createAction('[Mail API] Get Mail Success',
  props<{ mail: Mail[] }>());

export const getFailure =
  createAction('[Mail API] Get Mail Failure',
  props<{ error: string }>());

// GET BY FRIEND
export const getByFriend =
  createAction('[Mail API] Get Mail By Friend',
  props<{ friend: string }>());

export const getByFriendSuccess =
  createAction('[Mail API] Get Mail By Friend Success',
  props<{ mail: Mail[] }>());

export const getByFriendFailure =
  createAction('[Mail API] Get Mail By Friend Failure',
  props<{ error: string }>());

// SEND MESSAGE
export const send =
  createAction('[Mail API] Send Mail',
  props<{ message: MailMessage }>());

export const sendSuccess =
  createAction('[Mail API] Send Mail Success',
  props<{ result: MailMessage }>());

export const sendFailure =
  createAction('[Mail API] Send Mail Failure',
  props<{ error: string }>());

// SET MAIL
export const set =
  createAction('[Mail API] Set Mail Message',
  props<{ mail: Mail }>());

export const setSuccess =
  createAction('[Mail API] Set Mail Success',
  props<{ selected: Mail }>());

export const setFailure =
  createAction('[Mail API] Set Mail Failure',
  props<{ error: string }>());

// FILTER MAIL
export const filter =
  createAction('[Mail API] Filter Mail Message',
  props<{ value: string }>());

// MARK UNREAD
export const markUnread =
  createAction('[Mail API] Mark Unread Message',
  props<{ id: string, mark: boolean }>());

export const markUnreadSuccess =
  createAction('[Mail API] Mark Unread Message Success');

export const markUnreadFailure =
  createAction('[Mail API] Mark Unread Message Failure',
  props<{ error: string }>());

// RELOAD MAIL
export const reload =
  createAction('[Mail API] Reload Mail');

// RESET MAIL
export const reset =
  createAction('[Mail API] Reset Mail');

