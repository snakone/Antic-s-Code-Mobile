import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromForms from './forms.selectors';
import { FormGroupState, SetValueAction } from 'ngrx-forms';
import { DraftForm } from './forms.reducer';

@Injectable({providedIn: 'root'})

export class FormsFacade {

  form$ = this.store.select(fromForms.getForm);
  introValid$ = this.store.select(fromForms.getIntroValid);
  dataValid$ = this.store.select(fromForms.getDataValid);
  titleValid$ = this.store.select(fromForms.getTitleValid);
  messageValid$ = this.store.select(fromForms.getMessageValid);

  private cover: File;
  formLoaded = false;

  constructor(private store: Store<FormGroupState<DraftForm>>) { }

  public action(control: string, value: any): void {
    this.store.dispatch(new SetValueAction(control, value));
  }

  public setCover(cover: File): void {
    this.cover = cover;
  }

  public getCover(): File {
    return this.cover;
  }

}