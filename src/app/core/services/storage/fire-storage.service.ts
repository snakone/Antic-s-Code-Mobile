import { Injectable } from '@angular/core';

import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

@Injectable({providedIn: 'root'})

export class FireStorageService {

  private readonly path = 'covers/';

  constructor(
    private storage: AngularFireStorage
  ) { }

  public upload(name: string, file: any): AngularFireUploadTask {
    return this.storage.upload(this.path + name, file);
  }

  public ref(name: string): AngularFireStorageReference {
    return this.storage.ref(this.path + name);
  }


}
