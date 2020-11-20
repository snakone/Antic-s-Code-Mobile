import { Component, OnInit, ViewChild } from '@angular/core';
import { CREATE_SLIDES } from '@shared/shared.data';
import { flipOpts } from '@shared/swiper';
import { IonSlides, MenuController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage/storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})

export class CreatePage implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  slides = CREATE_SLIDES;
  index: number;
  hideTutorial = false;

  slideOpts = {
    ...flipOpts,
    initialSlide: 0,
    effect: 'flip',
    zoom: false,
    speed: 300,
    centeredSlides: true
  };

  constructor(
    private menuCtrl: MenuController,
    public menuSrv: MenuService,
    private router: Router,
    private ls: StorageService
  ) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }

  public async getIndex(): Promise<void> {
    this.index = await this.slider.getActiveIndex();
  }

  public start(): void {
    if (this.hideTutorial) { this.ls.setKey('createTutorial', false); }
  }

}
