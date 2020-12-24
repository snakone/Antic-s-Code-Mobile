import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { User } from '@shared/interfaces/interfaces';
import { UserFacade } from '@store/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mail-search',
  templateUrl: './mail-search.component.html',
  styleUrls: ['./mail-search.component.scss'],
})

export class MailSearchComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  filtered$: Observable<User[]>;

  constructor(
    private usersFacade: UserFacade,
    private crafter: CrafterService
  ) { }

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
