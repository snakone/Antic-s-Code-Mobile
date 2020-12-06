import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CrafterService } from '@app/core/services/crafter/crafter.service';
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
  userIndex = true;
  saved = false;

  slideOpts = {
    allowTouchMove: false,
    centeredSlides: true,
    slidesPerView: 1,
    initialSlide: 0,
    pagination: {
      type: 'progressbar',
      el: '.swiper-pagination'
    }
  };

  constructor(
    private menuCtrl: MenuController,
    private crafter: CrafterService
  ) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.slideToIndex();
  }

  public get index(): number {
    return this._index;
  }

  public async change(): Promise<void> {
    this._index = await this.slides.getActiveIndex();

    if (this.index === this.slidesLength - 1) {
      this.crafter.loader('SAVING.DRAFT');
      setTimeout(() => {
        this.crafter.loaderOff();
        this.saved = true;
      }, 3000);
    }
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

  public async showIndex(e: boolean): Promise<void> {
    this.userIndex = e;
    e ? this.slidesLength++ : this.slidesLength--;
    await this.slides.update();
  }

  ngOnDestroy() {
    this.menuCtrl.swipeGesture(true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

