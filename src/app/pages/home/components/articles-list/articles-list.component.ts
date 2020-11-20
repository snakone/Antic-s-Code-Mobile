import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ContentFacade } from '@store/content/content.facade';
import { ThemeService } from '@services/theme/theme.service';
import { Article } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

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
  }

  public navigate(article: Article): void {
    this.router.navigateByUrl('detail/' + article.slug);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
