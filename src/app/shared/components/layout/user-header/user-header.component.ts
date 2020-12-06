import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme/theme.service';
import { MenuService } from '@services/menu/menu.service';
import { User } from '@shared/interfaces/interfaces';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})

export class UserHeaderComponent implements OnInit {

  @Input() user: User;
  @Input() public: boolean;

  constructor(
    public menuSrv: MenuService,
    public themeSrv: ThemeService,
    private menu: MenuController
  ) { }

  ngOnInit() { }

  public openMenu(): void {
    this.menu.toggle('main');
  }

  public mail(): void {
    console.log('mail');
  }

  public stats(): void {
    this.public ? console.log('like') : console.log('stats');
  }

}
