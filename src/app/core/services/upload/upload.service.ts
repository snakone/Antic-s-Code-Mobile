import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root'})

export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  public uploadImage(image: string) {
    this.storage.ref('/images');
    const task = this.storage.upload('/images', image);
    task.snapshotChanges().subscribe(res => console.log(res));
  }
}
