import { Component, OnInit } from '@angular/core';
import { MailFacade } from '@store/mail/mail.facade';
import { forkJoin, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserFacade } from '@store/user/user.facade';
import { OnlineFacade } from '@store/online/online.facade';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})

export class MailPage implements OnInit {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private mailFacade: MailFacade,
    private userFacade: UserFacade,
    private onlineFacade: OnlineFacade
  ) { }

  ngOnInit() {
    this.checkData();
  }

  private checkData(): void {
    this.mailFacade.mailLoaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.mailFacade.get());

    this.userFacade.friendsLoaded$
    .pipe(
      filter(res => !res),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.userFacade.getFriends());

    this.onlineFacade.loaded$
    .pipe(
      filter(res => !res),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.onlineFacade.get());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
