import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@shared/interfaces/interfaces';
import { UserService } from '@services/user/user.service';
import { UserFacade } from '@app/core/ngrx/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePage implements OnInit {

  user: User;
  friends$: Observable<User[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public userSrv: UserService,
    private userFacade: UserFacade
  ) { }

  ngOnInit() {
    this.user = this.userSrv.getUser();
    this.friends$ = this.userFacade.friends$;
    this.checkData();
  }

  private checkData(): void {
    this.userFacade.friendsLoaded$
    .pipe(
      filter(res => !res),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.userFacade.getFriends());
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
