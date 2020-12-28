import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { filter, map } from 'rxjs/operators';
import { Mail, MailMessage, MailResponse, ServerResponse } from '@shared/interfaces/interfaces';

@Injectable({ providedIn: 'root'})

export class MailService {

  readonly API_MAIL = environment.api + 'mail/';

  constructor(private http: HttpService) { }

  public send(
    message: MailMessage
  ): Observable<ServerResponse> {
    return this.http
      .post<ServerResponse>(this.API_MAIL, { message })
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

  public get(): Observable<Mail[]> {
    return this.http
      .get<MailResponse>(this.API_MAIL)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.mail)
      );
  }

  public getByFriend(id: string): Observable<Mail[]> {
    return this.http
      .get<MailResponse>(this.API_MAIL + id)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.mail)
      );
  }

  public markUnread(
    id: string, mark: boolean
  ): Observable<ServerResponse> {
    return this.http
      .post<ServerResponse>(this.API_MAIL + 'mark', {id, mark})
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

}

