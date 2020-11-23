import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-summary',
  templateUrl: './form-create-summary.component.html',
  styleUrls: ['./form-create-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
