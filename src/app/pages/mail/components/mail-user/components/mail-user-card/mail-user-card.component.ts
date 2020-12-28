import { Component, Input, OnInit } from '@angular/core';
import { MailMessage } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-mail-user-card',
  templateUrl: './mail-user-card.component.html',
  styleUrls: ['./mail-user-card.component.scss'],
})

export class MailUserCardComponent implements OnInit {

  @Input() mail: MailMessage;

  constructor() { }

  ngOnInit() {}

}
