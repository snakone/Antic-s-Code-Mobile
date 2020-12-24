import { AppState } from '@app/app.config';
import { getAppState } from '../ngrx.index';
import { createSelector } from '@ngrx/store';
import * as fromForms from './forms.reducer';

export const getFormsState = createSelector(
  getAppState,
  (state: AppState) => state.forms
);

export const getForm = createSelector(
  getFormsState, fromForms.getForm
);

export const getIntroValid = createSelector(
  getFormsState, fromForms.getIntroValid
);

export const getDataValid = createSelector(
  getFormsState, fromForms.getDataValid
);

export const getTitleValid = createSelector(
  getFormsState, fromForms.getTitleValid
);

export const getMessageValid = createSelector(
  getFormsState, fromForms.getMessageValid
);

