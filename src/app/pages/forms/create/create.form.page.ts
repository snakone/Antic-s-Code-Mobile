import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create.form',
  templateUrl: './create.form.page.html',
  styleUrls: ['./create.form.page.scss']
})

export class CreateFormPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;
  // tslint:disable-next-line:variable-name
  private _index = 0;
  slidesLength = 7;
  private unsubscribe$ = new Subject<void>();

  slideOpts = {
    allowTouchMove: false,
    centeredSlides: true,
    slidesPerView: 1,
    pagination: {
      type: 'progressbar',
      el: '.swiper-pagination'
    }
  };

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.slideToIndex();
  }

  public get index(): number {
    return this._index;
  }

  public async change(): Promise<void> {
    this._index = await this.slides.getActiveIndex();
  }

  public next(): void {
    this.slides.slideNext();
  }

  public back(): void {
    this.slides.slidePrev();
  }

  private slideToIndex(): void {
    console.log('slide to index');
  }

  ngOnDestroy() {
    this.menuCtrl.swipeGesture(true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

