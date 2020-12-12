import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Draft } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { EditComponent } from '@shared/components/modals/edit/edit.component';
import { MarkDownComponent } from '@shared/components/modals/markdown/markdown.component';
import { takeUntil } from 'rxjs/operators';
import { CrafterService } from '@services/crafter/crafter.service';
import { ContentFacade } from '@store/content/content.facade';
import { ContentService } from '@services/content/content.service';
import { DraftsService } from '@services/drafts/drafts.service';
import { TranslateService } from '@ngx-translate/core';
import { PDFService } from '@core/native/services/pdf.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss']
})

export class DetailPage implements OnInit, OnDestroy {

  content$: Observable<Article>;
  private unsubscribe$ = new Subject<void>();
  edited = false;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private crafter: CrafterService,
    private contentFacade: ContentFacade,
    private contentSrv: ContentService,
    private draftSrv: DraftsService,
    private translate: TranslateService,
    private router: Router,
    private pdfMaker: PDFService
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
      const edited = await modal.onDidDismiss();
      if (edited.data) { this.edited = true; }
    }
  }

  public update(article: Article): void {
    const confirm = this.edited && article.type === 'article' ?
                    this.crafter.confirm('ARTICLE.SAVE', 'SAVE.ARTICLE') :
                    this.edited && article.type === 'draft' ?
                    this.crafter.confirm('SAVE.NOW', 'SAVE.ARTICLE') :
                    this.crafter.alert('NO.EDITED');
    confirm.then(res => {
      if (res && !res.role) {
        this.contentSrv.updateContentMessage(article)
        .pipe(takeUntil(this.unsubscribe$))
         .subscribe(result => {
           this.contentFacade.setBySlug(result);
           this.crafter.toast('CONTENT.UPDATED');
        });
      }
    });
  }

  public delete(draft: Draft): void {
    const confirm = this.crafter.confirm(
      this.translate.instant('DELETE.SURE'),
      this.translate.instant('DELETE.DRAFT')
    );
    confirm.then(async res => {
      if (!res.role) {
        this.draftSrv.deleteDraftById(draft._id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: Draft) => {
          this.crafter.toast('DRAFT.DELETED');
          this.contentFacade.removeDraft(res);
          this.router.navigateByUrl('/home/drafts');
        });
      }
    });
  }

  public async pdf(article: Article): Promise<void> {
    await this.crafter.loader();
    this.pdfMaker.createPDF(article);
  }

  ngOnDestroy() {
    this.contentFacade.resetBySlug();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
