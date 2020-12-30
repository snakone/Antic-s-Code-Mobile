import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/app.config';
import * as fromContent from './content/content.reducer';
import * as fromUser from './user/user.reducer';

import { 
  ArticlesPartialState,
  CategoriesPartialState,
  MailPartialState,
  OnlinePartialState } from './ngrx.config';

import * as fromArticles from './articles/article.reducer';
import * as fromCategories from './categories/category.reducer';
import * as fromForms from './forms/forms.reducer';
import * as fromMail from './mail/mail.reducer';
import * as fromOnline from './online/online.reducer';

export const reducers: ActionReducerMap<AppState> = {
  content: fromContent.reducer,
  user: fromUser.reducer,
  forms: fromForms.reducer
};

export const articleReducers:
  ActionReducerMap<ArticlesPartialState> = {
    articles: fromArticles.reducer
};

export const categoryReducers:
  ActionReducerMap<CategoriesPartialState> = {
    categories: fromCategories.reducer
};

export const mailReducers:
  ActionReducerMap<MailPartialState> = {
    mail: fromMail.reducer
};

export const onlineReducers:
  ActionReducerMap<OnlinePartialState> = {
    online: fromOnline.reducer
};

export const getAppState = createFeatureSelector<AppState>('AppState');

export const getArticlesPartialState =
  createFeatureSelector<ArticlesPartialState>('ArticleState');

export const getCategoriesPartialState =
  createFeatureSelector<CategoriesPartialState>('CategoryState');

export const getMailPartialState =
  createFeatureSelector<MailPartialState>('MailState');

export const getOnlinePartialState =
  createFeatureSelector<OnlinePartialState>('OnlineState');

