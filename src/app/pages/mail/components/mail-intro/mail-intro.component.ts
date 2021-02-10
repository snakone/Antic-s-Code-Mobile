import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-intro',
  templateUrl: './mail-intro.component.html',
  styleUrls: ['./mail-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MailIntroComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
