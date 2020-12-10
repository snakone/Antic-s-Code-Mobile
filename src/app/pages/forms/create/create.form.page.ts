import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { DraftSlides } from '@store/forms/forms.reducer';
import { DraftForm } from '@shared/interfaces/interfaces';
import { FormsFacade } from '@store/forms/forms.facade';
import { StorageService } from '@services/storage/storage.service';
import { CrafterService } from '@services/crafter/crafter.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create.form',
  templateUrl: './create.form.page.html',
  styleUrls: ['./create.form.page.scss']
})

export class CreateFormPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;
  private _index = 0;
  slidesLength = 7;
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
    private formsFacade: FormsFacade,
    private ls: StorageService,
    private crafter: CrafterService,
    private translate: TranslateService
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
    if (form) {
      const index = form.userDefinedProperties.slideIndex;
      if (index === (this.slidesLength - 1)) {
        this.ls.setKey('draftForm', null);
        return;
      }
      this.formsFacade.action('loadForm', form);
      this.slideToIndex(index);
    } else {
      this.slideToIndex(0);
    }
  }

  public async change(form: FormGroupState<DraftForm>): Promise<void> {
    this._index = await this.slides.getActiveIndex();
    this.formsFacade.action('slideIndex', this.index);

    form = {...form, userDefinedProperties: {
      ...form.userDefinedProperties,
      slideIndex: this.index }
    };

    if (this.index === (this.slidesLength - 1)) {
      this.formsFacade.finishForm(true);
    }

    this.ls.setKey('draftForm', form);
  }

  public next(): void {
    if (this.index + 1 === (this.slidesLength - 1)) {
      this.showConfirm();
      return;
    }
    this.slides.slideNext();
  }

  public back(): void {
    this.slides.slidePrev();
  }

  private slideToIndex(index: number): void {
    this.slides.slideTo(index, 0);
  }

  private getValidators(): void {
    this.introValid$ = this.formsFacade.introValid$;
    this.dataValid$ = this.formsFacade.dataValid$;
    this.titleValid$ = this.formsFacade.titleValid$;
    this.messageValid$ = this.formsFacade.messageValid$;
  }

  private showConfirm(): void {
    const confirm = this.crafter.confirm(
      this.translate.instant('DRAFT.CONTINUE'),
      this.translate.instant('SAVE.DRAFT')
    );
    confirm.then(async res => {
      if (!res.role) {
        this.slides.slideNext();
      }
    });
  }

  ngOnDestroy() {
    this.menuCtrl.swipeGesture(true);
  }

}

