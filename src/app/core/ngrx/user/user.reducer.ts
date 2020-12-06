import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '@shared/interfaces/interfaces';

export interface UserState {
  user: User;
  loaded: boolean;
}

export const initialState: UserState = {
  user: null,
  loaded: false
};

const featureReducer = createReducer(
  initialState,
  // SET USER
  on(UserActions.set, (state, { user }) => (
    { ...state, user, loaded: true, error: null }
  )),
  // USER LOG OUT
  on(UserActions.userLogOut, (state) => (
    { ...state, error: null, user: null }
  )),
);

export function reducer(state: UserState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const get = (state: UserState) => state.user;
export const getLoaded = (state: UserState) => state.loaded;
