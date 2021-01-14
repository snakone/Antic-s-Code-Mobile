import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as OnlineActions from '../online/online.actions';
import { User } from '@shared/interfaces/interfaces';

export interface UserState {
  user: User;
  users: User[];
  filtered: User[];
  usersLoaded: boolean;
  public: User;
  publicLoaded: boolean;
  friends: User[];
  filteredFriends: User[];
  friendsLoaded: boolean;
  friendsCount: number;
}

export const initialState: UserState = {
  user: null,
  users: [],
  filtered: [],
  usersLoaded: false,
  public: null,
  publicLoaded: false,
  friends: [],
  filteredFriends: [],
  friendsLoaded: false,
  friendsCount: 0
};

const featureReducer = createReducer(
  initialState,
  // SET USER
  on(UserActions.set, (state) => (
    { ...state, user: null, error: null }
  )),
  on(UserActions.setSuccess, (state, { user }) => (
    { ...state, user, error: null }
  )),
  on(UserActions.setFailure, (state, { error }) => (
    { ...state, loaded: false, error, user: null }
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
      users: users.filter(u => u._id !== state.user._id),
      filtered: users.filter(u => u._id !== state.user._id)
    }
  )),
  on(UserActions.getUsersFailure, (state, { error }) => (
    { ...state, loaded: false, error, users: null }
  )),
  // GET FRIENDS
  on(UserActions.getFriends, (state) => (
    { ...state, loaded: false, error: null }
  )),
  on(UserActions.getFriendsSuccess, (state, { friends }) => (
    {
      ...state,
      friends,
      filteredFriends: friends,
      friendsLoaded: true,
      error: null,
    }
  )),
  on(UserActions.getFriendsFailure, (state, { error }) => (
    { ...state, friendsLoaded: false, error, friends: null }
  )),
  // GET USER BY NAME
  on(UserActions.getByName, (state) => (
    { ...state, publicLoaded: false, error: null }
  )),
  on(UserActions.getByNameSuccess, (state, { res }) => (
    {
      ...state,
      publicLoaded: true,
      error: null,
      public: res.user,
      friendsCount: res.friends || 0
    }
  )),
  on(UserActions.getByNameFailure, (state, { error }) => (
    { ...state, publicLoaded: false, error }
  )),
  // FILTER USERS
  on(UserActions.search, (state, { value }) => (
    {
      ...state,
      filtered: [...[...state.users]
                  .filter(u => u.name.match(new RegExp(value, 'i')))],
      error: null
    }
  )),
  // FILTER FRIENDS
  on(UserActions.searchFriends, (state, { value }) => (
    {
      ...state,
      filteredFriends: [...[...state.friends]
                  .filter(f => f.name.match(new RegExp(value, 'i')))],
      error: null
    }
  )),
  // ADD FRIEND
  on(UserActions.addFriend, (state, {friend}) => (
    { 
      ...state, 
      error: null, 
      friends: [friend, ...state.friends],
      filteredFriends: [friend, ...state.friends]
    }
  )),
  // REMOVE FRIEND
  on(UserActions.removeFriend, (state, {friend}) => (
    { 
      ...state, 
      error: null, 
      friends: [...state.friends].filter(f => f._id !== friend._id),
      filteredFriends: [...state.friends].filter(f => f._id !== friend._id)
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
  )),
  // RESET FRIENDS
  on(UserActions.resetFriends, (state) => (
    {
      ...state,
      friends: [],
      friendsLoaded: false
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
export const getFriends = (state: UserState) => state.friends;
export const getFilteredFriends = (state: UserState) => state.filteredFriends;
export const getFriendsLoaded = (state: UserState) => state.friendsLoaded;
export const getFriendsCount = (state: UserState) => state.friendsCount;
