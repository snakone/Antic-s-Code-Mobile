import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-index',
  templateUrl: './form-create-index.component.html',
  styleUrls: ['./form-create-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
