import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { IonSlides, MenuController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { DraftForm, DraftSlides } from '@store/forms/forms.reducer';
import { FormsFacade } from '@store/forms/forms.facade';
import { StorageService } from '@services/storage/storage.service';

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
  draftForm$: Observable<FormGroupState<DraftForm>>;
  enums = DraftSlides;

  introValid$: Observable<boolean>;
  dataValid$: Observable<boolean>;
  titleValid$: Observable<boolean>;
  messageValid$: Observable<boolean>;

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
    private crafter: CrafterService,
    private formsFacade: FormsFacade,
    private ls: StorageService
  ) { }

  ngOnInit() {
    this.draftForm$ = this.formsFacade.form$;
    this.menuCtrl.swipeGesture(false);
    this.getValidators();
  }

  public get index(): number {
    return this._index;
  }

  public checkStorage(): void {
    const form: FormGroupState<DraftForm> = this.ls.get('draftForm');
    const loaded = this.formsFacade.formLoaded;
    if (form && !loaded) {
      const index = form.userDefinedProperties.slideIndex;
      if (index === (this.slidesLength - 1)) {
        this.ls.setKey('draftForm', null);
        return;
      }
      this.formsFacade.action('loadForm', form);
      this.slideToIndex(index);
      this.formsFacade.formLoaded = true;
    }
  }

  public async change(form: FormGroupState<DraftForm>): Promise<void> {
    this._index = await this.slides.getActiveIndex();
    this.formsFacade.action('slideIndex', this.index);

    form = {...form, userDefinedProperties: {
      ...form.userDefinedProperties,
      slideIndex: this.index }
    };

    this.ls.setKey('draftForm', form);

    if (this.index === (this.slidesLength - 1)) {
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

  private slideToIndex(index: number): void {
    this.slides.slideTo(index, 1000 + (index * 250));
  }

  public async showIndex(e: boolean): Promise<void> {
    this.userIndex = e;
    e ? this.slidesLength++ : this.slidesLength--;
    await this.slides.update();
  }

  private getValidators(): void {
    this.introValid$ = this.formsFacade.introValid$;
    this.dataValid$ = this.formsFacade.dataValid$;
    this.titleValid$ = this.formsFacade.titleValid$;
    this.messageValid$ = this.formsFacade.messageValid$;
  }

  ngOnDestroy() {
    this.menuCtrl.swipeGesture(true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

