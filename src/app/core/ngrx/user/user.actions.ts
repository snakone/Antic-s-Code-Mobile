import { User } from '@shared/interfaces/interfaces';
import { createAction, props } from '@ngrx/store';

export const set =
  createAction('[User API] Set User',
  props<{ user: User }>());

// USER LOGOUT
export const userLogOut =
  createAction('[Users API] User Log Out');
