import * as fromCategories from './categories/category.reducer';
import * as fromMail from './mail/mail.reducer';

export interface CategoriesPartialState {
  categories: fromCategories.CategoryState;
}

export interface MailPartialState {
  mail: fromMail.MailState;
}

