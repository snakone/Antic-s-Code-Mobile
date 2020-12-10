import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { CameraService } from '@core/native/services/camera.service';
import { Platform } from '@ionic/angular';
import { FireStorageService } from '@services/storage/fire-storage.service';
import { last, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsFacade } from '@store/forms/forms.facade';
import { FormGroupState } from 'ngrx-forms';
import { DraftForm } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent implements OnInit, OnDestroy {

  @Input() draftForm: FormGroupState<DraftForm>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cameraSrv: CameraService,
    private crafter: CrafterService,
    private platform: Platform,
    private formFacade: FormsFacade
  ) { }

  ngOnInit() {}

  public get properties() { return this.draftForm.userDefinedProperties; }

  public async upload(): Promise<void> {
    this.platform.is('cordova') ? this.isCordova() : this.notCordova();
  }

  private async isCordova(): Promise<void> {
    const pic = await this.cameraSrv.openSource();
    this.crafter.loaderOff();
    this.checkLength(pic);
  }

  private notCordova(): void {
    const el = document.getElementById('input');
    el.click();
    el.addEventListener('change', (e: any) => {
      const file: File = e.target.files[0];
      if (!file) { return; }
      this.setPicture(file);
    });
  }

  private setPicture(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev: any) => this.checkLength(ev.target.result);
  }

  private checkLength(pic: string): void {
    pic && pic.length / 1024 > 120 ?
    this.crafter.toast('MAX.LENGTH') :
    this.formFacade.action('cover', pic);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
