import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CustomSlide } from '@shared/interfaces/interfaces';
import { flipOpts } from '@shared/swiper';
import { MenuService } from '@services/menu/menu.service';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-slides',
  templateUrl: './custom-slides.component.html',
  styleUrls: ['./custom-slides.component.scss'],
})

export class CustomSlidesComponent {

  @ViewChild('slider') slider: IonSlides;
  @Input() slides: CustomSlide[];
  @Output() emitStart = new EventEmitter<boolean>();
  index = 0;
  hideTutorial = false;

  @Input() textButton: string;
  @Input() checkBox: boolean;
  @Input() closeButton: boolean;
  @Input() centeredImage: boolean;

  slideOpts = {
    ...flipOpts,
    initialSlide: 0,
    effect: 'flip',
    zoom: false,
    speed: 300,
    centeredSlides: true
  };

  constructor(
    public menuSrv: MenuService,
    private modalCtrl: ModalController
  ) { }

  public async slideDidLoad() {
    await this.slider.update();
  }

  public async getIndex(): Promise<void> {
    this.index = await this.slider.getActiveIndex();
  }

  public start(): void {
    this.emitStart.emit(this.hideTutorial);
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

}
