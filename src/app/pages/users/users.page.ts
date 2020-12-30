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

  constructor(private usersFacade: UserFacade) { }

  ngOnInit() {
    this.checkData();
    this.filtered$ = this.usersFacade.filtered$;
  }

  private checkData(): void {
    this.usersFacade.loaded$
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(res => !res)
      )
     .subscribe(_ => this.usersFacade.getUsers());
  }

  public search(e): void {
    this.usersFacade.search(e.detail.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
