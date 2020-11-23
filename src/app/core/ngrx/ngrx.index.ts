import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/app.config';
import * as fromContent from './content/content.reducer';
import * as fromUser from './user/user.reducer';
import { CategoriesPartialState } from './ngrx.config';
import * as fromCategories from './categories/category.reducer';

export const reducers: ActionReducerMap<AppState> = {
  content: fromContent.reducer,
  user: fromUser.reducer
};

export const categoryReducers:
  ActionReducerMap<CategoriesPartialState> = {
    categories: fromCategories.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');

export const getCategoriesPartialState =
  createFeatureSelector<CategoriesPartialState>('CategoryState');
