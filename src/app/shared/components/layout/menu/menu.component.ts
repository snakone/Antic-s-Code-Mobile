import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';
import { SettingsComponent } from '../../modals/settings/settings.component';
import { Router } from '@angular/router';
import { User } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { UserFacade } from '@store/user/user.facade';
import { MENU } from '@shared/data/app';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent implements OnInit {

  user$: Observable<User>;
  menu = MENU;

  constructor(
    private menuCtrl: MenuController,
    private menuSrv: MenuService,
    private modalCtrl: ModalController,
    private router: Router,
    private userFacade: UserFacade
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.user$;
  }

  public async open(route: string): Promise<void> {
    if (
      route === '/profile' || 
      route === '/home' ||
      route === '/mail' ||
      route === '/users') {
      this.menuCtrl.close();
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
