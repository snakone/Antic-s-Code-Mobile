import { Component, OnInit } from '@angular/core';
import { MenuService } from '@services/menu/menu.service';
import { MenuController } from '@ionic/angular';
import { UserService } from '@services/user/user.service';
import { User } from '@shared/interfaces/interfaces';
import { MAIL_HEADER } from '@shared/data/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.scss'],
})

export class MailHeaderComponent implements OnInit {

  user: User;
  icons = MAIL_HEADER;

  constructor(
    public menuSrv: MenuService,
    private menu: MenuController,
    private userSrv: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userSrv.getUser();
  }

  public navigate(id: string): void {
    this.router.navigateByUrl('mail/user/' + id);
  }

  public openMenu(): void {
    this.menu.toggle('main');
  }

}
