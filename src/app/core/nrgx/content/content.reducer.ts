import { createReducer, on, Action } from '@ngrx/store';
import * as ContentActions from './content.actions';
import { Article } from '@shared/interfaces/interfaces';

export interface ContentState {
  content: Article[];
  contentLoaded: boolean;
  bySlug: Article;
  bySlugLoaded: boolean;
}

export const initialState: ContentState = {
  content: [],
  contentLoaded: false,
  bySlug: null,
  bySlugLoaded: false
};

const featureReducer = createReducer(
  initialState,
  // GET CONTENT
  on(ContentActions.get, state => (
    { ...state, error: null }
  )),
  on(ContentActions.getSuccess, (state, { content }) => (
    {
      ...state,
      articlesLoaded: true,
      content,
      error: null
    }
  )),
  on(ContentActions.getFailure, (state, { error }) => (
    { ...state, contentLoaded: false, error }
  )),
  // GET BY SLUG
  on(ContentActions.getBySlug, state => (
    { ...state, error: null }
  )),
  on(ContentActions.getBySlugSuccess, (state, { article }) => (
    {
      ...state,
      bySlug: article,
      bySlugLoaded: true,
      error: null
    }
  )),
  on(ContentActions.getBySlugFailure, (state, { error }) => (
    { ...state, bySlugLoaded: false, error }
  )),
  // RESET BY SLUG
  on(ContentActions.resetBySlug, (state) => (
    { ...state, bySlugLoaded: false, bySlug: null }
  )),
);

export function reducer(state: ContentState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const get = (state: ContentState) => state.content;
export const getLoaded = (state: ContentState) => state.contentLoaded;
export const getBySlug = (state: ContentState) => state.bySlug;
export const getBySlugLoaded = (state: ContentState) => state.bySlugLoaded;
