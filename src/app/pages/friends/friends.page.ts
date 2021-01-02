import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserOnline } from '@shared/interfaces/interfaces';
import { OnlineFacade } from '@store/online/online.facade';
import { UserFacade } from '@store/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})

export class FriendsPage implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  friends$: Observable<User[]>;
  online$: Observable<UserOnline[]>;

  constructor(
    private userFacade: UserFacade,
    private onlineFacade: OnlineFacade
  ) { }

  ngOnInit() {
    this.friends$ = this.userFacade.friends$;
    this.online$ = this.onlineFacade.online$;
    this.checkData();
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
