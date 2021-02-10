import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailMessage } from '@shared/interfaces/interfaces';
import { MailFacade } from '@store/mail/mail.facade';

@Component({
  selector: 'app-mail-user-card',
  templateUrl: './mail-user-card.component.html',
  styleUrls: ['./mail-user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MailUserCardComponent implements OnInit {

  @Input() mail: MailMessage;

  constructor(
    private router: Router,
    private mailFacade: MailFacade
  ) { }

  ngOnInit() { }

  public detail(): void {
    this.mailFacade.set(this.mail.subject);
    this.router.navigateByUrl('/mail/chat');
  }

}
