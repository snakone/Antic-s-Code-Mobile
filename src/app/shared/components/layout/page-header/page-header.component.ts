import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})

export class PageHeaderComponent {

  @Input() title: string;
  @Input() showBack = true;
  @Input() showButtons = true;

  constructor(
    private menu: MenuController,
    public menuSrv: MenuService
  ) { }

  public openMenu(): void {
    this.menu.toggle('main');
  }

}
