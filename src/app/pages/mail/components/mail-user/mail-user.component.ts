import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mail } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MailFacade } from '@store/mail/mail.facade';
import { CrafterService } from '@services/crafter/crafter.service';
import { NewMessageComponent } from '../new-message/new-message.component';

@Component({
  selector: 'app-mail-user',
  templateUrl: './mail-user.component.html',
  styleUrls: ['./mail-user.component.scss'],
})

export class MailUserComponent {

  mail$: Observable<Mail[]>;
  private unsubscribe$ = new Subject<void>();
  friend: string;
  image: string;

  constructor(
    private route: ActivatedRoute,
    private mailFacade: MailFacade,
    private crafter: CrafterService
  ) { }

  ionViewDidEnter() {
    this.mail$ = this.mailFacade.byFriend$;
    this.getMailByFriend();
  }
  
  private getMailByFriend(): void {
    this.route.params
     .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.friend = params.id;
        this.mailFacade.getByFriend(params.id);
     });
  }

  public async send(): Promise<void> {
    await this.crafter.modal(NewMessageComponent, { friend: this.friend});
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
