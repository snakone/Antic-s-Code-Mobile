import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeaderIcons } from '@shared/interfaces/interfaces';
import { MenuController, ModalController, PickerController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';
import { Router } from '@angular/router';

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
  @Input() showMenu = true;
  @Input() href = true;
  @Input() icons: HeaderIcons[];
  @Input() onDismiss: any;

  constructor(
    private menu: MenuController,
    private modalCtrl: ModalController,
    public menuSrv: MenuService,
    private pickerCtrl: PickerController,
    private router: Router
  ) { }

  public openMenu(): void {
    this.menu.toggle('main');
  }

  public async back(): Promise<void> {
    if (await this.pickerCtrl.getTop()) {
      this.pickerCtrl.dismiss();
    }
    
    if (await this.modalCtrl.getTop()) {
      this.modalCtrl.dismiss(this.onDismiss || undefined);
    }

    if (this.href) {
      this.router.navigateByUrl('/home');
    }
  }

}
