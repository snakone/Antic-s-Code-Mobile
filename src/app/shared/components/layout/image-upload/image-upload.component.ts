import { Component, OnDestroy, Input } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { CameraService } from '@core/native/services/camera.service';
import { Subject } from 'rxjs';
import { FormsFacade } from '@store/forms/forms.facade';
import { FormGroupState } from 'ngrx-forms';
import { DraftForm } from '@shared/interfaces/interfaces';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent implements OnDestroy {

  @Input() draftForm: FormGroupState<DraftForm>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cameraSrv: CameraService,
    private crafter: CrafterService,
    private formFacade: FormsFacade,
    private platform: Platform
  ) { }

  public get properties() { return this.draftForm.userDefinedProperties; }

  public async upload(): Promise<void> {
    if (this.platform.is('hybrid')) {
      const pic = await this.cameraSrv.openSource();
      this.crafter.loaderOff();
      this.checkLength(pic);
    }
  }

  private checkLength(pic: string): void {
    if (!pic) { return this.showError(); }
    pic && pic.length / 1024 > 120 ?
    this.crafter.toast('MAX.LENGTH') :
    this.formFacade.action('cover', pic);
  }

  private showError(): void {
    this.crafter.alert('ERROS.CAMERA.MESSAGE');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
