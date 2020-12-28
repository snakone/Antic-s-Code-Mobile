import { createReducer, on, Action } from '@ngrx/store';
import * as ContentActions from './content.actions';
import { Article } from '@shared/interfaces/interfaces';

export interface ContentState {
  articles: Article[];
  drafts: Article[];
  contentLoaded: boolean;
  bySlug: Article;
  bySlugLoaded: boolean;
  full: boolean;
  last: Article[];
  lastLoaded: boolean;
  liked: Article[];
  likedLoaded: boolean;
  viewed: Article[];
  viewedLoaded: boolean;
  count: number;
  countLoaded: boolean;
  categoryCount: object;
  categoryCountLoaded: boolean;
  likes: number;
}

export const initialState: ContentState = {
  articles: [],
  drafts: [],
  contentLoaded: false,
  bySlug: null,
  bySlugLoaded: false,
  full: false,
  last: [],
  lastLoaded: false,
  liked: [],
  likedLoaded: false,
  viewed: null,
  viewedLoaded: false,
  count: 0,
  countLoaded: false,
  categoryCount: {},
  categoryCountLoaded: false,
  likes: 0
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
      contentLoaded: true,
      articles: [...state.articles, ...content.articles],
      drafts: [...state.drafts, ...content.drafts],
      error: null,
      full: completed(content.articles)
    }
  )),
  on(ContentActions.getFailure, (state, { error }) => (
    { ...state, contentLoaded: false, error }
  )),
  // ADD NEW DRAFT
  on(ContentActions.addNewDraft, (state, { draft }) => (
    { 
      ...state, 
      drafts: [draft, ...state.drafts]
    }
  )),
  // REMOVE DRAFT
  on(ContentActions.removeDraft, (state, { draft }) => (
    { 
      ...state, 
      drafts: [...state.drafts].filter(d => d._id !== draft._id)
    }
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
  // SET BY SLUG
  on(ContentActions.setBySlug, (state, { article }) => (
    {
      ...state,
      bySlug: article,
      articles: [...state.articles].filter(a => a._id !== article._id),
      drafts: checkDraft(state, article),
      error: null
    }
  )),
  // GET ARTICLES DATA
  on(ContentActions.getData, state => (
    { ...state, error: null }
  )),
  on(ContentActions.getDataSuccess, (state, { res }) => (
    {
      ...state,
      last: res.lastArticles,
      lastLoaded: true,
      liked: res.likedArticles,
      likedLoaded: true,
      viewed: res.viewedArticles,
      viewedLoaded: true,
      count: res.articlesCount,
      countLoaded: true,
      categoryCount: res.categoryCount,
      categoryCountLoaded: true,
      likes: res.likes,
      error: null
    }
  )),
  on(ContentActions.getDataFailure, (state, { error }) => (
    { ...state, articlesLoaded: false, error }
  )),
  // RESET CONTENT
  on(ContentActions.resetContent, (state) => (
    { 
      ...state, 
      contentLoaded: false, 
      articles: [], 
      drafts: [], 
      full: false
    }
  )),
  // RESET BY SLUG
  on(ContentActions.resetBySlug, (state) => (
    { ...state, bySlugLoaded: false, bySlug: null }
  )),
);

export function reducer(state: ContentState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const getArticles = (state: ContentState) => state.articles;
export const getDrafts = (state: ContentState) => state.drafts;
export const getLoaded = (state: ContentState) => state.contentLoaded;
export const getBySlug = (state: ContentState) => state.bySlug;
export const getBySlugLoaded = (state: ContentState) => state.bySlugLoaded;
export const getFull = (state: ContentState) => state.full;
export const getMostLiked = (state: ContentState) => state.liked;
export const getMostLikedLoaded = (state: ContentState) => state.likedLoaded;
export const getMostViewed = (state: ContentState) => state.viewed;
export const getMostViewedLoaded = (state: ContentState) => state.viewedLoaded;
export const getCount = (state: ContentState) => state.count;
export const getCountLoaded = (state: ContentState) => state.countLoaded;
export const getCategoryCount = (state: ContentState) => state.categoryCount;
export const getCategoryCountLoaded = (state: ContentState) => state.categoryCountLoaded;
export const getTotalLikes = (state: ContentState) => state.likes;

export const getDataLoaded = (state: ContentState): boolean => {
  return state.lastLoaded &&
         state.countLoaded &&
         state.viewedLoaded &&
         state.likedLoaded &&
         state.categoryCountLoaded;
};

function completed(articles: Article[]): boolean {
  return articles.length === 0;
}

function checkDraft(state: ContentState, draft: Article): Article[] {
  const exist = [...state.drafts].find(d => d._id === draft._id);
  return exist ? [...state.drafts].map(d => d._id === draft._id ? draft : d) :
                 [...state.drafts, draft];
}

