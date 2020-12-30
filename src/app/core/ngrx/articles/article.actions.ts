import { props, createAction } from '@ngrx/store';
import { Article } from '@shared/interfaces/interfaces';

// GET ARTICLES
export const get =
  createAction('[Articles API] Get Articles');

export const getSuccess =
  createAction('[Articles API] Get Articles Success',
  props<{ articles: Article[], id: string }>());

export const getFailure =
  createAction('[Articles API] Get Articles Failure',
  props<{ error: string }>());

// RESET ARTICLES
export const reset =
  createAction('[Articles API] Reset Articles');



