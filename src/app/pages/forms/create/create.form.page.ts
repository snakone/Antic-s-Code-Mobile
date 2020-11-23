import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Category } from '@app/shared/interfaces/interfaces';
import { IonSlides, MenuController } from '@ionic/angular';
import { CategoryFacade } from '@store/categories/category.facade';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ContentFacade } from '@store/content/content.facade';

@Component({
  selector: 'app-create.form',
  templateUrl: './create.form.page.html',
  styleUrls: ['./create.form.page.scss']
})

export class CreateFormPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;
  // tslint:disable-next-line:variable-name
  private _index = 0;
  slidesLength = 3;
  categories$: Observable<Category[]>;
  count$: Observable<number>;
  byCategoryCount$: Observable<object>;
  likes$: Observable<number>;
  private unsubscribe$ = new Subject<void>();
  obs$: Observable<any>;

  slideOpts = {
    allowTouchMove: false,
    pagination: {
      type: 'progressbar',
      el: '.swiper-pagination'
    }
  };

  constructor(
    private menuCtrl: MenuController,
    private categoryFacade: CategoryFacade,
    private contentFacade: ContentFacade
  ) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.checkData();
    this.obs$ = combineLatest([
      this.categoryFacade.categories$
        .pipe(map(res => res.filter(c => c.category !== 'Antic\'s'))),
      this.contentFacade.count$,
      this.contentFacade.byCategoryCount$,
      this.contentFacade.likes$
    ]);
  }

  private checkData(): void {
    this.categoryFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => {
       this.categoryFacade.get();
    });
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

  ngOnDestroy() {
    this.menuCtrl.swipeGesture(true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

