import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-data',
  templateUrl: './form-create-data.component.html',
  styleUrls: ['./form-create-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
