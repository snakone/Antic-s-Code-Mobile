import { props, createAction } from '@ngrx/store';
import { Article, ArticlesDataResponse, UserContent } from '@shared/interfaces/interfaces';

// GET CONTENT
export const get =
  createAction('[Content API] Get Content');

export const getSuccess =
  createAction('[Content API] Get Content Success',
  props<{ content: UserContent }>());

export const getFailure =
  createAction('[Articles API] Get Content Failure',
  props<{ error: string }>());

// GET CONTENT BY SLUG
export const getBySlug =
  createAction('[Content API] Get Content by Slug',
  props<{ slug: string }>());

export const getBySlugSuccess =
  createAction('[Content API] Get Content by Slug Success',
  props<{ article: Article }>());

export const getBySlugFailure =
  createAction('[Content API] Get Content by Slug Failure',
  props<{ error: string }>());

// RESET BY SLUG
export const resetBySlug =
  createAction('[Content API] Reset By Slug');

// GET ARTICLES DATA
export const getData =
  createAction('[Articles API] Get Articles Data');

export const getDataSuccess =
  createAction('[Articles API] Get Articles Data Success',
  props<{ res: ArticlesDataResponse }>());

export const getDataFailure =
  createAction('[Articles API] Get Articles Data Failure',
  props<{ error: string }>());
