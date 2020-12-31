import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesFacade } from '@store/articles/article.facade';
import { ThemeService } from '@services/theme/theme.service';
import { Article } from '@shared/interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})

export class ArticlesPage implements OnInit {

  articles$: Observable<Article[]>;
  private unsubscribe$ = new Subject<void>();
  isDark: boolean;
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;
  disabled = false;

  constructor(
    private articlesFacade: ArticlesFacade,
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.checkData();
    this.articles$ = this.articlesFacade.articles$
      .pipe(tap(res => {
        if (res.length === 1) {
          this.articlesFacade.get();
        }
      }));
    this.isDark = this.theme.isDark();
  }

  private checkData(): void {
    this.articlesFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.articlesFacade.get());

    this.articlesFacade.full$
     .pipe(
       filter(res => !!res),
       takeUntil(this.unsubscribe$)
     )
     .subscribe(_ => this.disabled = true);
  }

  public load(e: any): void {
    e.target.complete();
    this.articlesFacade.get();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
