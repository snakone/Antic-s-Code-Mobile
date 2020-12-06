import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentFacade } from '@app/core/ngrx/content/content.facade';
import { CrafterService } from '@services/crafter/crafter.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePage implements OnInit, OnDestroy {

  exist: boolean;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private crafter: CrafterService,
    private contentFacade: ContentFacade
  ) {}

  ngOnInit() {
    this.checkData();
  }

  private checkData(): void {
    this.contentFacade.dataLoaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => {
       this.contentFacade.getData();
    });
  }

  public async create(): Promise<void> {
    if (this.exist) {
      const confirm = this.crafter.confirm('OVERWRITE', 'ARTICLE.EXIST');
      confirm.then(async res => { if (!res.role) {
        this.router.navigateByUrl('/create');
      }});
    } else { this.router.navigateByUrl('/create'); }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
