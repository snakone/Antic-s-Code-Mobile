import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacade } from '@store/user/user.facade';
import { User } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PublicProfilePage implements OnInit {

  user$: Observable<User>;
  private unsubscribe$ = new Subject<void>();
  friendsCount$: Observable<number>;

  constructor(
    private userFacade: UserFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.byName$;
    this.friendsCount$ = this.userFacade.friendsCount$;
    this.getUserByName();
    this.checkData();
  }

  private getUserByName(): void {
    this.route.params
     .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => this.userFacade.getByName(params.name));
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
    this.userFacade.resetByName();
  }

}
