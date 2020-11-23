import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create-message',
  templateUrl: './form-create-message.component.html',
  styleUrls: ['./form-create-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
