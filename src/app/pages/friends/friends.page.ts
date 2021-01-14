import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrafterService } from '@app/core/services/crafter/crafter.service';
import { User, UserOnline } from '@shared/interfaces/interfaces';
import { OnlineFacade } from '@store/online/online.facade';
import { UserFacade } from '@store/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FriendOptionsComponent } from './components/friend-options/friend-options.component';


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
    private onlineFacade: OnlineFacade,
    private crafter: CrafterService
  ) { }

  ngOnInit() {
    this.friends$ = this.userFacade.filteredFriends$;
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

  public options(friend: User, e): void {
    this.crafter.pop(FriendOptionsComponent, {
      friend,
    }, 'options', e);
  }

  public search(e): void {
    this.userFacade.searchFriends(e.detail.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
