import { Component } from '@angular/core';
import { INTRO_SLIDES } from '@shared/data/slides';
import { StorageService } from '@services/storage/storage.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})

export class HelpComponent {

  slides = INTRO_SLIDES;

  constructor(
    private ls: StorageService,
    private modalCtrl: ModalController
  ) { }

  public start(e: boolean): void {
    this.ls.setKey('introTutorial', !e);
    this.modalCtrl.dismiss();
  }

}
