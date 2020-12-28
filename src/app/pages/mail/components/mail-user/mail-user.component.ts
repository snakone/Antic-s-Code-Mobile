import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mail } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MailFacade } from '@store/mail/mail.facade';

@Component({
  selector: 'app-mail-user',
  templateUrl: './mail-user.component.html',
  styleUrls: ['./mail-user.component.scss'],
})

export class MailUserComponent implements OnInit, OnDestroy {

  mail$: Observable<Mail[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private mailFacade: MailFacade,
  ) { }

  ngOnInit() {
    this.mail$ = this.mailFacade.byFriend$;
    this.getMailByFriend();
  }
  
  private getMailByFriend(): void {
    this.route.params
     .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => this.mailFacade.getByFriend(params.id));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
