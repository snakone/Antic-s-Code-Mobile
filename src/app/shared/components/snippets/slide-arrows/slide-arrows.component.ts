import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme/theme.service';
import { MenuService } from '@services/menu/menu.service';

@Component({
  selector: 'app-slide-arrows',
  templateUrl: './slide-arrows.component.html',
  styleUrls: ['./slide-arrows.component.scss']
})

export class SlideArrowsComponent {

  @Input() index: number;
  @Input() length: number;
  @Input() marginArrows: boolean;

  constructor(
    public menuSrv: MenuService,
    public themeSrv: ThemeService
  ) { }


}
