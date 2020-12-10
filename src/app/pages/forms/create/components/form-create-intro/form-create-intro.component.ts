import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FORM_CREATE_INTRO } from '@shared/data/create';
import { FormGroupState } from 'ngrx-forms';
import { StorageService } from '@services/storage/storage.service';
import { DraftForm } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-form-create-intro',
  templateUrl: './form-create-intro.component.html',
  styleUrls: ['./form-create-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateIntroComponent implements OnInit, OnDestroy {

  @Input() draftForm: FormGroupState<DraftForm>;

  intro = FORM_CREATE_INTRO;

  constructor(private ls: StorageService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.ls.setKey('draftForm', this.draftForm);
  }


}
