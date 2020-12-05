import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CrafterService } from '@app/core/services/crafter/crafter.service';

@Injectable({providedIn: 'root'})

export class CameraService {

  sourceOpts: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  constructor(
    private camera: Camera,
    private crafter: CrafterService
  ) { }

  public async openSource(): Promise<string> {
    try {
      this.crafter.loader();
      return 'data:image/jpg;base64,' + await this.camera.getPicture(this.sourceOpts);
    } catch (err) {
      console.log(err);
      this.crafter.loaderOff();
    }
  }
}
