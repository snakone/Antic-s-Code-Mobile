import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Article, Draft } from '@shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES, TAGS, BADGES, LEVELS } from '@shared/shared.data';
import { DraftsService } from '@core/services/drafts/drafts.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class EditComponent implements OnInit, OnDestroy {

  @Input() content$: Observable<Article | Draft>;
  editForm: FormGroup;
  categories = CATEGORIES;
  tags = TAGS;
  badges = BADGES;
  levels = LEVELS;
  imagePattern = '^.+\.(([pP][nN][gG])|([jJ][pP][gG]))$';  // Png, Jpg
  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private draftSrv: DraftsService,
    private crafter: CrafterService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.content$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.createArticleForm(res));
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

  private createArticleForm(article: Article): void {
    this.editForm = new FormGroup({
      title: new FormControl(article.title || null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(35)
      ]),
      category: new FormControl(article.category || null, [
        Validators.required
      ]),
      tags: new FormControl(article.tags || null, [
        Validators.required,
        this.selectValidator(3).bind(this)
      ]),
      badges: new FormControl(article.badges || null, [
        Validators.required,
        this.selectValidator(2).bind(this)
      ]),
      level: new FormControl(article.level || null, [
        Validators.required
      ]),
      summary: new FormControl(article.summary || null, [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(600)
      ]),
      cover: new FormControl(article.cover || null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.imagePattern)
      ])
    });
  }

  private selectValidator(limit: number) {
    return (control: FormControl) => {
      const c = control.value;
      if (c && c.length > limit) {
        return { error: true };
      }
      return null;
    };
  }

  public onSubmit(): void {
    const {
      title,
      cover,
      category,
      tags,
      badges,
      level,
      summary
    } = this.editForm.value;

    const article: Article = {
      title,
      cover,
      category,
      tags,
      badges,
      level,
      summary
    };

    this.draftSrv.updateDraft(article)
    .pipe(
      switchMap(_ => {
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/tabs/home');
      this.crafter.alert('ARTICLE.UPDATED');
      return this.draftSrv.getDraftsByUser();
    }), takeUntil(this.unsubscribe$)
    ).toPromise().then();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
