import { User, UserResponse } from '@shared/interfaces/interfaces';
import { createAction, props } from '@ngrx/store';

// GET ALL USERS
export const getUsers =
  createAction('[Users API] Get All Users');

export const getUsersSuccess =
  createAction('[Users API] Get All Users Success',
  props<{ users: User[] }>());

export const getUsersFailure =
  createAction('[Users API] Get All Users Failure',
  props<{ error: string }>());

// GET USER BY NAME
export const getByName =
  createAction('[Users API] Get User By Name',
  props<{ name: string }>());

export const getByNameSuccess =
  createAction('[Users API] Get User By Name Success',
  props<{ res: UserResponse }>());

export const getByNameFailure =
  createAction('[Users API] Get User By Name Failure',
  props<{ error: string }>());

// SET USER
export const set =
  createAction('[User API] Set User',
  props<{ user: User }>());

export const setSuccess =
  createAction('[Users API] Set User Success',
  props<{ user: User }>());

export const setFailure =
  createAction('[Users API] Set User Failure',
  props<{ error: string }>());

// SEARCH USERS
export const search =
  createAction('[Users API] Search Users',
  props<{ value: string }>());

// USER LOGOUT
export const userLogOut =
  createAction('[Users API] User Log Out');

// GET FRIENDS
export const getFriends =
  createAction('[Users API] Get User Friends');

export const getFriendsSuccess =
  createAction('[Users API] Get User Friends Success',
  props<{ friends: User[] }>());

export const getFriendsFailure =
  createAction('[Users API] Get User Friends Failure',
  props<{ error: string }>());

// ADD FRIEND
export const addFriend =
  createAction('[User API] Add User Friend',
  props<{ friend: User }>());

// REMOVE FRIEND
export const removeFriend =
  createAction('[User API] Remove User Friend',
  props<{ friend: User }>());

// RESET BY NAME
export const resetByName =
  createAction('[Users API] Reset By User Name');
