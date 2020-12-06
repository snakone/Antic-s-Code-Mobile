import { Component, OnInit } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { CameraService } from '@core/native/services/camera.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent implements OnInit {

  picture: string;

  constructor(
    private cameraSrv: CameraService,
    private crafter: CrafterService,
    private platform: Platform
  ) { }

  ngOnInit() {}

  public async upload(): Promise<void> {
    this.picture = null;
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
      const file = e.target.files[0];
      if (!file) { return; }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev: any) => {
        const pic = ev.target.result;
        this.checkLength(pic);
      };
    });
  }

  private checkLength(pic: string): void {
    pic && pic.length / 1024 > 120 ?
    (this.crafter.toast('MAX.LENGTH'), this.picture = null) :
    this.picture = pic;
  }

}
