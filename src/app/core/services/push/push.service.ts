import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpService } from '../http/http.service';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationPayload, SWResponse } from '@shared/interfaces/interfaces';

@Injectable({providedIn: 'root'})

export class PushService {

  readonly API_SUBSCRIPTION = environment.api + 'subscription';
  readonly API_NOTIFICATION = environment.api + 'notification';
  readonly pushKey = environment.keys.push;

  constructor(private http: HttpService) { }

  public send(
    payload: NotificationPayload
  ): Observable<SWResponse> {
    return this.http
      .post<SWResponse>(this.API_NOTIFICATION, { payload })
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

}
