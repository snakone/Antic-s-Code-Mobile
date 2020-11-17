import { props, createAction } from '@ngrx/store';
import { Article, UserContent } from '@shared/interfaces/interfaces';

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

// GET CONTENT
export const resetBySlug =
  createAction('[Content API] Reset By Slug');
