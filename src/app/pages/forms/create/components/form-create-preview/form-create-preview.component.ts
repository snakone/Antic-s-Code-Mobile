import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { FormsFacade } from '@store/forms/forms.facade';
import { FormGroupState } from 'ngrx-forms';
import { CrafterService } from '@services/crafter/crafter.service';
import { DraftsService } from '@services/drafts/drafts.service';
import { Draft, DraftForm, DraftFormData } from '@shared/interfaces/interfaces';
import { UserService } from '@services/user/user.service';
import { Subject } from 'rxjs';
import { FireStorageService } from '@services/storage/fire-storage.service';
import { last, takeUntil, switchMap } from 'rxjs/operators';
import { ContentFacade } from '@store/content/content.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-preview',
  templateUrl: './form-create-preview.component.html',
  styleUrls: ['./form-create-preview.component.scss']
})

export class FormCreatePreviewComponent implements OnInit, OnDestroy {

  @Input() draftForm: FormGroupState<DraftForm>;
  private unsubscribe$ = new Subject<void>();
  added = false;
  newDraft: Draft;

  constructor(
    private nav: NavController,
    private formsFacade: FormsFacade,
    private ls: StorageService,
    private crafter: CrafterService,
    private draftSrv: DraftsService,
    private userSrv: UserService,
    private fire: FireStorageService,
    private contentFacade: ContentFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.listenFinish();
  }

  private listenFinish(): void {
    this.formsFacade.finish
     .pipe(takeUntil(this.unsubscribe$),
     switchMap(async _ => await this.convertDraft())
     ).subscribe();
  }

  public detail(): void {
    this.router.navigateByUrl('/detail/' + this.newDraft.slug);
  }

  public back(): void {
    this.nav.navigateRoot('/home');
  }

  private async convertDraft() {
    this.crafter.loader('SAVING.DRAFT');
    const form = this.draftForm.value;
    const data = this.draftForm.userDefinedProperties as DraftFormData;
    const user = this.userSrv.getUser();

    const draft: Draft = {
      title: form.title,
      author: user.name,
      user: user._id,
      cover: await this.uploadFile(data.cover, form.title),
      category: data.category,
      tags: data.tags,
      index: data.index,
      links: data.links,
      level: data.level,
      summary: form.summary,
      message: form.message,
      status: 'Pending',
      type: 'draft'
    };

    this.draftSrv.createDraft(draft)
    .pipe(takeUntil(this.unsubscribe$))
     .subscribe((res: Draft) => {
       this.contentFacade.addNewDraft(res);
       this.crafter.loaderOff();
       this.newDraft = res;
       this.ls.setKey('draftForm', null);
     }, () => this.crafter.loaderOff());
  }

  private uploadFile(file: string, name: string): Promise<string> {
    const ref = this.fire.ref(name);
    const task = ref.putString(file.split('base64,')[1], 'base64');

    return task.snapshotChanges()
    .pipe(
      last(),
      takeUntil(this.unsubscribe$),
      switchMap(() => ref.getDownloadURL())
    ).toPromise()
    .catch(async _ => ( await this.crafter.loaderOff(), this.showError()));
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
