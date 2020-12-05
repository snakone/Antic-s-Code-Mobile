import { Component, OnInit } from '@angular/core';
import { CameraService } from '@core/native/services/camera.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})

export class ImageUploadComponent implements OnInit {

  constructor(private cameraSrv: CameraService) { }

  ngOnInit() {}

  public upload(): void {
    this.cameraSrv.openSource();
  }

}
