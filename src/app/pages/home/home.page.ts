import { Component, OnInit, OnDestroy } from '@angular/core';
import { DraftsService } from '@services/drafts/drafts.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { CreateComponent } from '@shared/components/modals/create/create.component';
import { CrafterService } from '@services/crafter/crafter.service';
import { Article } from '@shared/interfaces/interfaces';
import { ContentFacade } from '@core/nrgx/content/content.facade';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit, OnDestroy {

  content$: Observable<Article[]>;
  private unsubscribe$ = new Subject<void>();
  exist: boolean;

  constructor(
    public draftSrv: DraftsService,
    private router: Router,
    private modalCtrl: ModalController,
    private crafter: CrafterService,
    private contentFacade: ContentFacade,
    public theme: ThemeService
  ) {}

  ngOnInit() {
    this.checkData();
    this.content$ = this.contentFacade.content$
     .pipe(tap(res => res.forEach(d => {
      if (d.status === 'Draft') { this.exist = true; }})
    ));
  }

  public async navigate(article: Article): Promise<void> {
    this.router.navigateByUrl('detail/' + article.slug);
  }

  private checkData(): void {
    this.contentFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.contentFacade.get());
  }

  public async create(): Promise<void> {
    if (this.exist) {
      const confirm = this.crafter.confirm('OVERWRITE', 'ARTICLE.EXIST');
      confirm.then(async res => { if (!res.role) { this.showModal(); }});
    } else { this.showModal(); }
  }

  private async showModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreateComponent
    });
    modal.present();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
