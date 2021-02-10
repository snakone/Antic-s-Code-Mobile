import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '@services/menu/menu.service';
import { MenuController } from '@ionic/angular';
import { User, UserOnline } from '@shared/interfaces/interfaces';
import { MAIL_HEADER } from '@shared/data/header';
import { Router } from '@angular/router';
import { UserFacade } from '@store/user/user.facade';
import { Observable } from 'rxjs';
import { OnlineFacade } from '@store/online/online.facade';

@Component({
  selector: 'app-mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.scss'],
})

export class MailHeaderComponent implements OnInit {

  friends$: Observable<User[]>;
  online$: Observable<UserOnline[]>;
  icons = MAIL_HEADER;
  @Input() params: string;

  constructor(
    public menuSrv: MenuService,
    private menu: MenuController,
    private userFacade: UserFacade,
    private router: Router,
    private onlineFacade: OnlineFacade
  ) { }

  ngOnInit() {
    this.friends$ = this.userFacade.friends$;
    this.online$ = this.onlineFacade.online$;
    this.listenOnline();
  }

  private listenOnline(): void {
    this.onlineFacade.listenOnline();
  }

  public navigate(id: string): void {
    this.router.navigateByUrl('mail/user/' + id, {replaceUrl: true});
  }

  public openMenu(): void {
    this.menu.toggle('main');
  }

}
