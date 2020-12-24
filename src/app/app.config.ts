// APP_CONFIG: Injection token to hold application-wide configuration properties that can be injected into other
// application elements such as components or services.

import { InjectionToken } from '@angular/core';
import * as fromContent from '@store/content/content.reducer';
import * as fromUser from '@store/user/user.reducer';
import { FormGroupState } from 'ngrx-forms';
import { DraftForm } from './shared/interfaces/interfaces';

export const URI = 'https://anticscode.netlify.com';
export const APP_VERSION = '0.2.0';
export const ME = '5d7b56610d35cc0017f4ef9c';

export interface AppConfig {
  TITLE: string;
  DEFAULT_LANGUAGE: string;
  APP_VERSION: string;
  PLATFORM: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'Antic\'s Mobile',
  DEFAULT_LANGUAGE: 'es',
  PLATFORM: 'Mobile',
  APP_VERSION
};

export interface AppState {
  content: fromContent.ContentState;
  user: fromUser.UserState;
  forms: FormGroupState<DraftForm>;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
