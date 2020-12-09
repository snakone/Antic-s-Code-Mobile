import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DraftForm } from '@app/core/ngrx/forms/forms.reducer';
import { FORM_CREATE_INTRO } from '@shared/data/create';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-form-create-intro',
  templateUrl: './form-create-intro.component.html',
  styleUrls: ['./form-create-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateIntroComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;

  intro = FORM_CREATE_INTRO;

  constructor() { }

  ngOnInit() { }


}
