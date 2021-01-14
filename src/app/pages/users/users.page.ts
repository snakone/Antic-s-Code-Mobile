import { Component, OnInit } from '@angular/core';
import { UserFacade } from '@store/user/user.facade';
import { User } from '@shared/interfaces/interfaces';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit {

  private unsubscribe$ = new Subject<void>();
  filtered$: Observable<User[]>;

  constructor(private userFacade: UserFacade) { }

  ngOnInit() {
    this.checkData();
    this.filtered$ = this.userFacade.filtered$;
  }

  private checkData(): void {
    this.userFacade.loaded$
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(res => !res)
      )
     .subscribe(_ => this.userFacade.getUsers());
  }

  public search(e): void {
    this.userFacade.search(e.detail.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
