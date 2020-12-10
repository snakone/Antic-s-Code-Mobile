import { Action, createReducer } from '@ngrx/store';
import { DraftForm, Index, Link } from '@shared/interfaces/interfaces';
import { FormGroupState, onNgrxForms, SetValueAction, updateGroup, validate } from 'ngrx-forms';
import { createFormGroupState, onNgrxFormsAction } from 'ngrx-forms';
import { maxLength, minLength, required, requiredTrue } from 'ngrx-forms/validation';

export enum DraftSlides {
  INTRO = 0,
  DATA = 1,
  TITLE = 2,
  INDEX = 3,
  MESSAGE = 4,
  LINKS = 5,
  END = 6
}

export const inititalDraftFormState =
  createFormGroupState<DraftForm>('FORMS', {
  markdown: false,
  accept: false,
  title: '',
  summary: '',
  message: '',
});

const initialUserProperties = (
  state: FormGroupState<DraftForm>
): FormGroupState<DraftForm> => {
  return {
    ...state,
    userDefinedProperties: {
      cover: '',
      category: '',
      tags: [],
      level: '',
      index: [],
      links: [],
      slideIndex: 0
    }
  };
};

export function reducer(state: FormGroupState<DraftForm>, action: Action) {
  return featureReducer(state, action);
}

export const newForm = (): FormGroupState<DraftForm> => {
  return {
  ...inititalDraftFormState,
  ...initialUserProperties(inititalDraftFormState)
  };
};

const featureReducer = createReducer(
  newForm(),
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state, action) => {
    state = validateInputs(state);
    switch (action.controlId) {
      case 'slideIndex': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            slideIndex: action.value as number
          }
        };
      }
      case 'cover': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            cover: action.value
          }
        };
      }
      case 'category': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            category: action.value as string
          }
        };
      }
      case 'tags': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            tags: action.value as string[]
          }
        };
      }
      case 'level': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            level: action.value as string
          }
        };
      }
      case 'index': {
        return {
          ...state,
          controls: {
            ...state.controls,
            message: {
              ...state.controls.message,
              value: convertMessage(state, action.value as Index)
            }
          },
          userDefinedProperties: {
            ...state.userDefinedProperties,
            index: [
              ...state.userDefinedProperties.index,
              action.value as Index
            ]
          },
        };
      }
      case 'deleteIndex': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            index: []
          }
        };
      }
      case 'links': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            links: [
              ...state.userDefinedProperties.links,
              action.value as Link
            ]
          },
          
        };
      }
      case 'deleteLinks': {
        return {
          ...state,
          userDefinedProperties: {
            ...state.userDefinedProperties,
            links: []
          }
        };
      }
      case 'loadForm': {
        return {
          ...action.value as FormGroupState<DraftForm>
        };
      }
      case 'reset': {
        return {
          ...newForm()
        };
      }
      default: return { ...state};
    }
  })
);

export const validateInputs = updateGroup<DraftForm>({
  markdown: validate(requiredTrue),
  accept: validate(requiredTrue),
  title: validate(required, minLength(10), maxLength(35)),
  summary: validate(required, minLength(100), maxLength(600)),
  message: validate(required, minLength(100))
});

export const getForm = (state: FormGroupState<DraftForm>) => state;

export const getIntroValid = (state: FormGroupState<DraftForm>): boolean =>
  (
    !!state.controls.markdown.value &&
    !!state.controls.accept.value &&
    (state.userDefinedProperties.slideIndex) === DraftSlides.INTRO
);

export const getDataValid = (state: FormGroupState<DraftForm>): boolean =>
  (
    !!state.userDefinedProperties.cover &&
    !!state.userDefinedProperties.category &&
    state.userDefinedProperties.tags.length > 0 &&
    !!state.userDefinedProperties.level &&
    (state.userDefinedProperties.slideIndex) === DraftSlides.DATA
);

export const getTitleValid = (state: FormGroupState<DraftForm>): boolean =>
(
  !state.controls.title.isInvalid &&
  !state.controls.summary.isInvalid &&
  (state.userDefinedProperties.slideIndex) === DraftSlides.TITLE
);

export const getMessageValid = (state: FormGroupState<DraftForm>): boolean =>
(
  !state.controls.message.isInvalid &&
  (state.userDefinedProperties.slideIndex) === DraftSlides.MESSAGE
);

const convertMessage = (
  state: FormGroupState<DraftForm>,
  index: Index
): string => {
  let msg = state.controls.message.value;
  msg = msg ? msg + '\n\n' : '';
  return `${msg}## ${index.title}`;
}

