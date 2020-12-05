import { Injectable } from '@angular/core';
import { UploadService } from '@services/upload/upload.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
    private uploadSrv: UploadService
  ) { }

  public openSource() {
    this.camera.getPicture(this.sourceOpts)
     .then(async (data: string) => {
      const image = 'data:image/jpg;base64,' + data;
      this.uploadSrv.uploadImage(image)
       .subscribe(res => console.log(res));
    }, (err) => {
      console.log(err);
    });
  }
}
