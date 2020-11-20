import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MENU } from '@shared/shared.data';
import { MenuController, ModalController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';
import { SettingsComponent } from '../../modals/settings/settings.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent {

  menuLink = MENU;

  constructor(
    private menuCtrl: MenuController,
    private menuSrv: MenuService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  public async open(route: string): Promise<void> {
    if (route === '/profile') {
      this.menuCtrl.close();
      this.router.navigateByUrl(route);
      return;
    }
    const modal = await this.modalCtrl.create({
      component: this.selectComp(route)
    });

    modal.present();
  }

  public emit(state: boolean): void {
    if (state) { this.menuCtrl.swipeGesture(state); }
    this.menuSrv.setMenuState(state);
  }

  private selectComp<T>(route: string): typeof SettingsComponent {
    switch (route) {
      case '/settings': return SettingsComponent;
    }
  }

}
