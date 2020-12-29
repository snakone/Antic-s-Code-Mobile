import { Injectable } from '@angular/core';
import { UserOnline, OnlineResponse } from '@shared/interfaces/interfaces';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { SocketService } from '@core/sockets/services/socket.service';

@Injectable({providedIn: 'root'})

export class OnlineService {

  readonly API_ONLINE = environment.api + 'online';

  constructor(
    private http: HttpService,
    private socket: SocketService
  ) { }

  public getUsersOnline(): Observable<UserOnline[]> {
    return this.http
      .get<OnlineResponse>(this.API_ONLINE)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.online)
      );
  }

  public listenOnline(): Observable<UserOnline> {
    return this.socket.listen('new-online');
  }

  public listenOffline(): Observable<UserOnline> {
    return this.socket.listen('new-offline');
  }

}