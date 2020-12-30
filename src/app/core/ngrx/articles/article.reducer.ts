import { createReducer, on, Action } from '@ngrx/store';
import * as ArticleActions from './article.actions';
import { Article } from '@shared/interfaces/interfaces';

export interface ArticleState {
  articles: Article[];
  loaded: boolean;
  full: boolean;
  error: string;
}

export const inititalState: ArticleState = {
  articles: [],
  loaded: false,
  full: false,
  error: null,
};

const featureReducer = createReducer(
  inititalState,
  // GET ARTICLES
  on(ArticleActions.get, state => (
    { ...state, error: null }
  )),
  on(ArticleActions.getSuccess, (state, { articles, id }) => (
    {
      ...state,
      loaded: true,
      articles: [...state.articles, ...articles].filter(a => a.user !== id),
      error: null,
      full: completed(articles)
    }
  )),
  on(ArticleActions.getFailure, (state, { error }) => (
    { ...state, loaded: false, error }
  )),
  // RESET
  on(ArticleActions.reset, (state) => (
    {
      ...state,
      loaded: false,
      error: null,
      articles: [],
      full: false
    }
  ))
);

export function reducer(state: ArticleState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getArticles = (state: ArticleState) => state.articles;
export const getArticlesLoaded = (state: ArticleState) => state.loaded;
export const getFull = (state: ArticleState) => state.full;

function completed(articles: Article[]): boolean {
  return articles.length === 0;
}
