import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/app.config';
import * as fromContent from './content/content.reducer';

export const reducers: ActionReducerMap<AppState> = {
  content: fromContent.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');
