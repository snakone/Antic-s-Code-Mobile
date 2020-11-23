import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-cover',
  templateUrl: './form-create-cover.component.html',
  styleUrls: ['./form-create-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateCoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
