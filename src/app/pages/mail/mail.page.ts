import { Component, OnInit } from '@angular/core';
import { MailFacade } from '@store/mail/mail.facade';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})

export class MailPage implements OnInit {

  private unsubscribe$ = new Subject<void>();

  constructor(private mailFacade: MailFacade) { }

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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
