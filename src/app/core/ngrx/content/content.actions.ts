import { props, createAction } from '@ngrx/store';
import { Article, ArticlesDataResponse, Draft, UserContent } from '@shared/interfaces/interfaces';

// GET CONTENT
export const get =
  createAction('[Content API] Get Content');

export const getSuccess =
  createAction('[Content API] Get Content Success',
  props<{ content: UserContent }>());

export const getFailure =
  createAction('[Content API] Get Content Failure',
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

// SET CONTENT BY SLUG
export const setBySlug =
  createAction('[Content API] Set Content by Slug',
  props<{ article: Article }>());

// RESET BY SLUG
export const resetBySlug =
  createAction('[Content API] Reset By Slug');

// GET ARTICLES DATA
export const getData =
  createAction('[Content API] Get Articles Data');

export const getDataSuccess =
  createAction('[Content API] Get Articles Data Success',
  props<{ res: ArticlesDataResponse }>());

export const getDataFailure =
  createAction('[Content API] Get Articles Data Failure',
  props<{ error: string }>());

// ADD NEW DRAFT
export const addNewDraft =
  createAction('[Content API] Add New Draft',
  props<{ draft: Draft }>());

// REMOVE DRAFT
export const removeDraft =
  createAction('[Content API] Remove Draft',
  props<{ draft: Draft }>());

// RESET CONTENT
export const resetContent =
  createAction('[Content API] Reset Content');
