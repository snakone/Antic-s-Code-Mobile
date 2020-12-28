import { Component, OnInit } from '@angular/core';
import { MenuService } from '@services/menu/menu.service';
import { MenuController } from '@ionic/angular';
import { User } from '@shared/interfaces/interfaces';
import { MAIL_HEADER } from '@shared/data/header';
import { Router } from '@angular/router';
import { UserFacade } from '@store/user/user.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.scss'],
})

export class MailHeaderComponent implements OnInit {

  user$: Observable<User>;
  icons = MAIL_HEADER;

  constructor(
    public menuSrv: MenuService,
    private menu: MenuController,
    private userFacade: UserFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.user$;
  }

  public navigate(id: string): void {
    this.router.navigateByUrl('mail/user/' + id);
  }

  public openMenu(): void {
    this.menu.toggle('main');
  }

}
