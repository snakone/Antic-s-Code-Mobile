import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { DraftsService } from '@core/services/drafts/drafts.service';
import { ModalController } from '@ionic/angular';
import { EditComponent } from '@shared/components/modals/edit/edit.component';
import { MarkDownComponent } from '@shared/components/modals/markdown/markdown.component';
import { takeUntil } from 'rxjs/operators';
import { CrafterService } from '@services/crafter/crafter.service';
import { ContentFacade } from '@store/content/content.facade';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss']
})

export class DetailPage implements OnInit, OnDestroy {

  content$: Observable<Article>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private draftSrv: DraftsService,
    private modalCtrl: ModalController,
    private crafter: CrafterService,
    private contentFacade: ContentFacade
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.contentFacade.getBySlug(slug);
    this.content$ = this.contentFacade.bySlug$;
  }

  public async open(page: string): Promise<void> {
    if (page === 'edit') {
      const modal = await this.modalCtrl.create({
        component: EditComponent,
        componentProps: { content$: this.content$}
      });

      modal.present();
    } else if (page === 'markdown') {
      const modal = await this.modalCtrl.create({
        component: MarkDownComponent,
        componentProps: { content$: this.content$}
      });

      modal.present();
    }
  }

  public update(article: Article): void {
    const confirm = this.crafter.confirm('SAVE.NOW', 'SAVE.ARTICLE');
    confirm.then(res => {
      if (!res.role) {
        this.draftSrv.updateDraftMessage(
          article.message, article._id
        ).pipe(takeUntil(this.unsubscribe$))
         .subscribe(_ => this.crafter.alert('MESSAGE.UPDATED'));
      }
    });
  }

  ngOnDestroy() {
    this.contentFacade.resetBySlug();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
