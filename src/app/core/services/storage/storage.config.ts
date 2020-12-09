import { InjectionToken } from '@angular/core';
import { APP_CONSTANTS } from '../../../app.config';
import { FormGroupState } from 'ngrx-forms';
import { DraftForm, newForm } from '@app/core/ngrx/forms/forms.reducer';

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
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'storage',
  THEME: 'light',
  LANGUAGE: APP_CONSTANTS.DEFAULT_LANGUAGE,
  REMEMBER: false,
  CREATE_TUTORIAL: true,
  INTRO_TUTORIAL: true,
  DRAFT_FORM: newForm()
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
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
