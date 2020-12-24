import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '@shared/interfaces/interfaces';

export interface UserState {
  user: User;
  users: User[];
  filtered: User[];
  usersLoaded: boolean;
  public: User;
  publicLoaded: boolean;
}

export const initialState: UserState = {
  user: null,
  users: [],
  filtered: [],
  usersLoaded: false,
  public: null,
  publicLoaded: false
};

const featureReducer = createReducer(
  initialState,
  // SET USER
  on(UserActions.set, (state, { user }) => (
    { ...state, user, loaded: true, error: null }
  )),
  // GET ALL USERS
  on(UserActions.getUsers, (state) => (
    { ...state, loaded: false, error: null }
  )),
  on(UserActions.getUsersSuccess, (state, { users }) => (
    {
      ...state,
      usersLoaded: true,
      error: null,
      users,
      filtered: users
    }
  )),
  on(UserActions.getUsersFailure, (state, { error }) => (
    { ...state, loaded: false, error, users: null }
  )),
  // GET USER BY NAME
  on(UserActions.getByName, (state, { name }) => (
    { ...state, publicLoaded: false, error: null }
  )),
  on(UserActions.getByNameSuccess, (state, { user }) => (
    {
      ...state,
      publicLoaded: true,
      error: null,
      public: user
    }
  )),
  on(UserActions.getByNameFailure, (state, { error }) => (
    { ...state, publicLoaded: false, error }
  )),
  // FILTER USERS
  on(UserActions.search, (state, { value }) => (
    {
      ...state,
      filtered: [...[...state.users].filter(u => u.name.match(new RegExp(value, 'i')))],
      error: null
    }
  )),
  // USER LOG OUT
  on(UserActions.userLogOut, (state) => (
    { ...state, error: null, user: null }
  )),
  // RESET
  on(UserActions.resetByName, (state) => (
    {
      ...state,
      publicLoaded: false,
      error: null,
      public: null
    }
  ))
);

export function reducer(state: UserState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const get = (state: UserState) => state.user;
export const getUsers = (state: UserState) => state.users;
export const getFiltered = (state: UserState) => state.filtered;
export const getPublic = (state: UserState) => state.public;
export const getByName = (state: UserState) => state.public;
export const getUsersLoaded = (state: UserState) => state.usersLoaded;
export const getPublicLoaded = (state: UserState) => state.publicLoaded;
