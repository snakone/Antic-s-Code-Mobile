import { UserOnline } from "@shared/interfaces/interfaces";
import { createAction, props } from "@ngrx/store";

// GET ONLINE USERS
export const get =
  createAction('[Online API] Get Online Users');

export const getSuccess =
  createAction('[Online API] Get Online Users Success',
  props<{ online: UserOnline[] }>());

export const getFailure =
  createAction('[Online API] Get Online Users Failure',
  props<{ error: string }>());

// LISTEN ONLINE
export const listenOnline =
  createAction('[Online API] Listen Online');

export const listenOnlineSuccess =
  createAction('[Online API] Listen Online Success',
  props<{ online: UserOnline }>());

export const listenOnlineFailure =
  createAction('[Online API] Listen Online Failure',
  props<{ error: string }>());

// LISTEN OFFLINE
export const listenOffline =
  createAction('[Online API] Listen Online');