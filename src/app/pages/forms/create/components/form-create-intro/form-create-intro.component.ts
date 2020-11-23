import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FORM_CREATE_INTRO } from '@shared/shared.data';

@Component({
  selector: 'app-form-create-intro',
  templateUrl: './form-create-intro.component.html',
  styleUrls: ['./form-create-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateIntroComponent implements OnInit {

  intro = FORM_CREATE_INTRO;

  constructor() { }

  ngOnInit() {}

}
