import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@NgModule({
  declarations: [],
  providers: [
    Camera,
    File,
    FileOpener
  ]
})

export class NativeModule { }
