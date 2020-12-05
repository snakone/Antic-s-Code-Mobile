import { Component, OnInit } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { CameraService } from '@core/native/services/camera.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent implements OnInit {

  picture: string;

  constructor(
    private cameraSrv: CameraService,
    private crafter: CrafterService
  ) { }

  ngOnInit() {}

  public async upload(): Promise<void> {
    this.picture = null;
    const pic = await this.cameraSrv.openSource();
    this.crafter.loaderOff();
    if (pic && pic.length / 1024 > 120) {
      this.crafter.toast('MAX.LENGTH');
      this.picture = null;
      return;
    } else {
      this.picture = pic;
    }
  }

}
