import { InjectionToken } from '@angular/core';
import { APP_CONSTANTS } from '../../../app.config';

export interface ModuleConfig {
  KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  LANGUAGE: string;
  THEME: string;
  REMEMBER: boolean;
  CREATE_TUTORIAL: boolean;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'storage',
  THEME: 'light',
  LANGUAGE: APP_CONSTANTS.DEFAULT_LANGUAGE,
  REMEMBER: false,
  CREATE_TUTORIAL: true
};

export class Storage {
  lang = APP_CONSTANTS.DEFAULT_LANGUAGE;
  token = null;
  user = null;
  remember = STORAGE_CONSTANTS.REMEMBER;
  theme = STORAGE_CONSTANTS.THEME;
  createTutorial = STORAGE_CONSTANTS.CREATE_TUTORIAL;
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
