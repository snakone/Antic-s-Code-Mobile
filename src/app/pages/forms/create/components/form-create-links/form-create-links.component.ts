import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-links',
  templateUrl: './form-create-links.component.html',
  styleUrls: ['./form-create-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateLinksComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
