import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';
import { SettingsComponent } from '../../modals/settings/settings.component';
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

    private userFacade: UserFacade
  ) { }

  ngOnInit() {
    this.user$ = this.userFacade.user$;
  }

  public close(): void {
    this.menuCtrl.close();
  }

  public async settings(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: this.selectComp('/settings') 
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
