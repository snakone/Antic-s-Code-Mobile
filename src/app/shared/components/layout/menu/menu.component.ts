import { Component } from '@angular/core';
import { MENU } from '@shared/shared.data';
import { MenuController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent {

  menuLink = MENU;

  constructor(
    private menu: MenuController,
    private menuSrv: MenuService
  ) { }

  public close(): void {
    this.menu.close('main');
  }

  public emitOpen(): void {
    this.menuSrv.setMenuState(true);
  }

  public emitClose(): void {
    this.menuSrv.setMenuState(false);
  }

}
