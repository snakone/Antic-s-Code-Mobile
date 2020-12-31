import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserFacade } from '@store/user/user.facade';
import { User } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-footer',
  templateUrl: './profile-footer.component.html',
  styleUrls: ['./profile-footer.component.scss'],
})

export class ProfileFooterComponent implements OnInit, OnDestroy {

  @Input() user: User;
  friends$: Observable<User[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private userFacade: UserFacade) { }

  ngOnInit() {
    this.checkData();
    this.friends$ = this.userFacade.friends$;
  }

  private checkData(): void {
    this.userFacade.friendsLoaded$
    .pipe(
      filter(res => !res),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.userFacade.getFriends());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
