import { InjectionToken } from '@angular/core';
import { APP_CONSTANTS } from '../../../app.config';
import { FormGroupState } from 'ngrx-forms';
import { newForm } from '@store/forms/forms.reducer';
import { DraftForm } from '@shared/interfaces/interfaces';

export interface ModuleConfig {
  KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  LANGUAGE: string;
  THEME: string;
  REMEMBER: boolean;
  CREATE_TUTORIAL: boolean;
  INTRO_TUTORIAL: boolean;
  DRAFT_FORM: FormGroupState<DraftForm>;
  AUTO_LOGIN: boolean;
  SHOW_ONLINE: boolean;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'storage',
  THEME: 'light',
  LANGUAGE: APP_CONSTANTS.DEFAULT_LANGUAGE,
  REMEMBER: false,
  CREATE_TUTORIAL: true,
  INTRO_TUTORIAL: true,
  DRAFT_FORM: newForm(),
  AUTO_LOGIN: true,
  SHOW_ONLINE: true
};

export class Storage {
  lang = APP_CONSTANTS.DEFAULT_LANGUAGE;
  token = null;
  user = null;
  remember = STORAGE_CONSTANTS.REMEMBER;
  theme = STORAGE_CONSTANTS.THEME;
  createTutorial = STORAGE_CONSTANTS.CREATE_TUTORIAL;
  introTutorial = STORAGE_CONSTANTS.INTRO_TUTORIAL;
  draftForm = STORAGE_CONSTANTS.DRAFT_FORM;
  autoLogin = STORAGE_CONSTANTS.AUTO_LOGIN;
  showOnline = STORAGE_CONSTANTS.SHOW_ONLINE;
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
