import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacade } from '@store/user/user.facade';
import { User } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile.page.html',
  styleUrls: ['./public-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PublicProfilePage implements OnInit, OnDestroy {

  user$: Observable<User>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private userFacade: UserFacade,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.byName$;
    this.getUserByName();
  }

  private getUserByName(): void {
    this.route.params
     .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => this.userFacade.getByName(params.name));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.userFacade.resetByName();
  }

}
