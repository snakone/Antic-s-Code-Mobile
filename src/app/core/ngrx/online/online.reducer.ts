import { Action, createReducer, on } from "@ngrx/store";
import { UserOnline } from "@shared/interfaces/interfaces";
import * as OnlineActions from './online.actions';

export interface OnlineState {
  online: UserOnline[];
  loaded: boolean;
}

export const inititalState: OnlineState = {
  online: [],
  loaded: false
};

const featureReducer = createReducer(
  inititalState,
  // GET ONLINE
  on(OnlineActions.get, (state) => (
    { ...state, error: null, filtered: [] }
  )),
  on(OnlineActions.getSuccess, (state, { online }) => (
    {
      ...state,
      error: null,
      online,
      loaded: true
    }
  )),
  on(OnlineActions.getFailure, (state, { error }) => (
    { ...state, loaded: false, error }
  )),
  // USER ONLINE
  on(OnlineActions.listenOnline, (state) => (
    { ...state, error: null }
  )),
  on(OnlineActions.listenOnlineSuccess, (state, { online }) => (
    {
      ...state,
      error: null,
      online: online.online ? 
              [online, ...state.online] : 
              [...state.online].filter(o => o.socketID !== online.socketID)
    }
  )),
  on(OnlineActions.listenOnlineFailure, (state, { error }) => (
    { ...state, loaded: false, error }
  ))
);

export const getOnline = (state: OnlineState) => state.online;
export const getOnlineLoaded = (state: OnlineState) => state.loaded;

export function reducer(state: OnlineState | undefined, action: Action) {
  return featureReducer(state, action);
}
