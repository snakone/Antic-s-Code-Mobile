import { NgModule } from '@angular/core';
import { UploadService } from '../services/upload/upload.service';
import { CameraService } from './services/camera.service';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [],
  providers: [
    CameraService,
    UploadService,
    Camera
  ]
})

export class NativeModule { }