import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserFacade } from '@store/user/user.facade';
import { OnlineFacade } from '@store/online/online.facade';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})

export class MailPage implements OnInit {

  private unsubscribe$ = new Subject<void>();
  params: string;

  constructor(
    private userFacade: UserFacade,
    private onlineFacade: OnlineFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkData();
  }

  ionViewDidEnter() {
    this.params = this.route.snapshot.root._routerState.url.split('/')[3];
  }

  private checkData(): void {
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
