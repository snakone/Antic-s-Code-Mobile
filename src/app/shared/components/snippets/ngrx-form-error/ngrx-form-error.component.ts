import { Component, Input } from '@angular/core';
import { FormControlState } from 'ngrx-forms';

@Component({
  selector: 'app-ngrx-form-error',
  templateUrl: './ngrx-form-error.component.html',
  styleUrls: ['./ngrx-form-error.component.scss']
})

export class NgrxFormErrorComponent {

  @Input() control: FormControlState<any>;
  @Input() position: string;

  constructor() { }

}
