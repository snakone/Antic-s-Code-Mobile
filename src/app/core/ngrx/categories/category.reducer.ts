import { createReducer, on, Action } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from '@shared/interfaces/interfaces';

export interface CategoryState {
  category: Category;
  loaded: boolean;
  categories: Category[];
  categoriesLoaded: boolean;
  error: string;
}

export const inititalState: CategoryState = {
  category: null,
  loaded: false,
  categories: [],
  categoriesLoaded: false,
  error: null
};

const featureReducer = createReducer(
  inititalState,
  // GET CATEGORY BY NAME
  on(CategoryActions.getByName, (state) => (
    { ...state, loaded: false, error: null, category: null }
  )),
  on(CategoryActions.getByNameSuccess, (state, { category }) => (
    {
      ...state,
      loaded: true,
      category,
      error: null,
    }
  )),
  on(CategoryActions.getByNameFailure, (state, { error }) => (
    { ...state, loaded: false, error }
  )),
  // GET CATEGORIES
  on(CategoryActions.get, (state) => (
    { ...state, error: null }
  )),
  on(CategoryActions.getSuccess, (state, { categories }) => (
    {
      ...state,
      categoriesLoaded: true,
      categories,
      error: null,
    }
  )),
  on(CategoryActions.getFailure, (state, { error }) => (
    { ...state, categoriesLoaded: false, error }
  )),
  // RESET
  on(CategoryActions.reset, (state) => (
    { ...state, loaded: false, error: null, category: null }
  )),
);

export const getByName = (state: CategoryState) => state.category;
export const getByNameLoaded = (state: CategoryState) => state.loaded;
export const get = (state: CategoryState) => state.categories;
export const getLoaded = (state: CategoryState) => state.categoriesLoaded;

export function reducer(state: CategoryState | undefined, action: Action) {
  return featureReducer(state, action);
}
