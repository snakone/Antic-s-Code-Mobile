import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DraftForm } from '@shared/interfaces/interfaces';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-form-create-title',
  templateUrl: './form-create-title.component.html',
  styleUrls: ['./form-create-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateTitleComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;

  constructor() { }

  public get title() { return this.draftForm.controls.title; }
  public get summary() { return this.draftForm.controls.summary; }

  ngOnInit() {}

}
