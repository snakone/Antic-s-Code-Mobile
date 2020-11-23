import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_HEADER } from '@shared/shared.data';
import { ThemeService } from '@services/theme/theme.service';
import { Article } from '@shared/interfaces/interfaces';
import { ContentFacade } from '@store/content/content.facade';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftListComponent implements OnInit, OnDestroy {

  drafts$: Observable<Article[]>;
  private unsubscribe$ = new Subject<void>();
  isDark: boolean;
  header = HOME_HEADER;

  constructor(
    private router: Router,
    private contentFacade: ContentFacade,
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.checkData();
    this.drafts$ = this.contentFacade.drafts$;
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
