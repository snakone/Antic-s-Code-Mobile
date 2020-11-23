import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeaderIcons } from '@shared/interfaces/interfaces';
import { MenuController, ModalController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent {

  @Input() title: string;
  @Input() showBack = true;
  @Input() showButtons = true;
  @Input() href = true;
  @Input() icons: HeaderIcons[];

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    public menuSrv: MenuService
  ) { }

  public openMenu(): void {
    this.menu.toggle('main');
  }

  public async back(): Promise<void> {
    if (await this.modalCtrl.getTop()) {
      this.modalCtrl.dismiss();
    }
  }

}
