import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Article, Draft, DraftForm, DraftFormData } from '@shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { CrafterService } from '@services/crafter/crafter.service';
import { last, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ContentService } from '@services/content/content.service';
import { FormGroupState } from 'ngrx-forms';
import { FormsFacade } from '@store/forms/forms.facade';
import { FireStorageService } from '@services/storage/fire-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit, OnDestroy {

  @Input() content$: Observable<Article | Draft>;
  draftForm: FormGroupState<DraftForm>;
  dataValid$: Observable<boolean>;
  titleValid$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private contentSrv: ContentService,
    private crafter: CrafterService,
    private formsFacade: FormsFacade,
    private fire: FireStorageService,
  ) { }

  ngOnInit() {
    this.getValidators();
  }

  private getValidators(): void {
    this.dataValid$ = this.formsFacade.dataValid$;
    this.titleValid$ = this.formsFacade.titleValid$;

    this.formsFacade.form$
    .pipe(takeUntil(this.unsubscribe$))
     .subscribe(res => this.draftForm = res);
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

  public onSubmit(content: Article | Draft): void {
    const confirm = content.type === 'article' ?
                    this.crafter.confirm('ARTICLE.SAVE', 'SAVE.ARTICLE') :
                    content.type === 'draft' ?
                    this.crafter.confirm('SAVE.NOW', 'SAVE.ARTICLE') :
                    this.crafter.alert('NO.EDITED');

    confirm.then(async res => {
      if (res && !res.role) {
        await this.crafter.loader();
        const update = await this.byFormToClass(content)
                          .catch(async _ => {
                            console.log(_)
                            await this.crafter.loaderOff();
                            this.showError();  
                          });
        if (update) {
          this.contentSrv.updateContent(update)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(async _ => {
              await this.crafter.loaderOff();
              await this.crafter.toast('CONTENT.UPDATED');
              this.modalCtrl.dismiss();
            });
        }
      }
    });
  }

  private async byFormToClass(
    content: Article | Draft
  ): Promise<Article | Draft> {
    const form = this.draftForm.value;
    const data = this.draftForm.userDefinedProperties as DraftFormData;

    content.title = form.title;
    content.summary = form.summary;
    content.cover = 
      content.cover === data.cover ? 
                        data.cover : 
                        await this.uploadFile(data.cover, content.title);
    content.category = data.category;
    content.tags = data.tags;
    content.level = data.level;

    return content;
  }

  private async uploadFile(
    file: string, 
    name: string
  ): Promise<string> {
    const ref = this.fire.ref(name);
    const task = ref.putString(file.split('base64,')[1], 'base64');

    return task.snapshotChanges()
     .pipe(
       last(),
       takeUntil(this.unsubscribe$),
       switchMap(() => ref.getDownloadURL())
     ).toPromise()
      .catch(async _ => {
        console.log(_);
        await this.crafter.loaderOff();
        this.showError();
    });
  }

  private showError(): void {
    this.crafter.alert('ERRORS.CAMERA.MESSAGE');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.formsFacade.action('reset', true);
  }
  

}
