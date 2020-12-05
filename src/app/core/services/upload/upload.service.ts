import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root'})

export class UploadService {

  private readonly IMAGEBB_URI = 'https://api.imgbb.com/1/upload';

  constructor(private http: HttpService) { }

  public uploadImage(image: string): Observable<any> {
    return this.http.post(
      this.IMAGEBB_URI + '?key=' + environment.imageBB, { image });
  }
}
