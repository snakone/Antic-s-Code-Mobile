import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContentFacade } from '@store/content/content.facade';
import { ThemeService } from '@services/theme/theme.service';
import { Article } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil,  } from 'rxjs/operators';
import { IonInfiniteScroll } from '@ionic/angular';
import { HOME_HEADER } from '@shared/shared.data';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticlesListComponent implements OnInit, OnDestroy {

  articles$: Observable<Article[]>;
  private unsubscribe$ = new Subject<void>();
  isDark: boolean;
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;
  header = HOME_HEADER;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    zoom: false,
    speed: 300,
    centeredSlides: true,
    pagination: {
      dynamicBullets: true
    }
  };

  constructor(
    private contentFacade: ContentFacade,
    private router: Router,
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.checkData();
    this.articles$ = this.contentFacade.articles$;
    this.isDark = this.theme.isDark();
  }

  private checkData(): void {
    this.contentFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.contentFacade.get());

    this.contentFacade.full$
     .pipe(
       filter(res => !!res),
       takeUntil(this.unsubscribe$)
     )
     .subscribe(_ => this.scroll.disabled = true);
  }

  public load(e: any): void {
    e.target.complete();
    this.contentFacade.get();
  }

  public navigate(article: Article): void {
    this.router.navigateByUrl('detail/' + article.slug);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
