import { Component, OnInit, ViewChild } from '@angular/core';
import { flipOpts } from '@shared/swiper';
import { IonSlides, MenuController } from '@ionic/angular';
import { MenuService } from '@services/menu/menu.service';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage/storage.service';
import { CREATE_SLIDES } from '@shared/data/slides';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})

export class CreatePage implements OnInit {

  slides = CREATE_SLIDES;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private ls: StorageService
  ) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }

  public start(e: boolean): void {
    if (e) {
      this.ls.setKey('createTutorial', false);
    }
    this.router.navigateByUrl('/forms/create');
    this.menuCtrl.swipeGesture(true);
  }

}
