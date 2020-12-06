import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-title',
  templateUrl: './form-create-title.component.html',
  styleUrls: ['./form-create-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateTitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
