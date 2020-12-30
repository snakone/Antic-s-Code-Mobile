import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '@services/menu/menu.service';
import { MenuController } from '@ionic/angular';
import { User, UserOnline } from '@shared/interfaces/interfaces';
import { MAIL_HEADER } from '@shared/data/header';
import { Router } from '@angular/router';
import { UserFacade } from '@store/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { OnlineFacade } from '@store/online/online.facade';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.scss'],
})

export class MailHeaderComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  online$: Observable<UserOnline[]>;
  icons = MAIL_HEADER;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public menuSrv: MenuService,
    private menu: MenuController,
    private userFacade: UserFacade,
    private router: Router,
    private onlineFacade: OnlineFacade
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.user$;
    this.online$ = this.onlineFacade.online$;
    this.checkData();
    this.listenOnline();
  }

  private checkData(): void {
    this.onlineFacade.loaded$
    .pipe(
      filter(res => !res),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.onlineFacade.get());
  }

  private listenOnline(): void {
    this.onlineFacade.listenOnline();
  }

  public navigate(id: string): void {
    this.router.navigateByUrl('mail/user/' + id);
  }

  public openMenu(): void {
    this.menu.toggle('main');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
