import * as fromCategories from './categories/category.reducer';
import * as fromMail from './mail/mail.reducer';
import * as fromOnline from './online/online.reducer';

export interface CategoriesPartialState {
  categories: fromCategories.CategoryState;
}

export interface MailPartialState {
  mail: fromMail.MailState;
}

export interface OnlinePartialState {
  online: fromOnline.OnlineState;
}

