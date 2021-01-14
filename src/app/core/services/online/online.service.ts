import { Injectable } from '@angular/core';
import { UserOnline, OnlineResponse, UserResponse } from '@shared/interfaces/interfaces';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { SocketService } from '@core/sockets/services/socket.service';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})

export class OnlineService {

  readonly API_ONLINE = environment.api + 'online';

  constructor(
    private http: HttpService,
    private socket: SocketService,
    private userSrv: UserService
  ) { }

  public getUsersOnline(): Observable<UserOnline[]> {
    return this.http
      .get<OnlineResponse>(this.API_ONLINE)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.online)
      );
  }

  public setShowOnline(value: boolean): Observable<UserResponse> {
    return this.http
    .post<UserResponse>(this.API_ONLINE, {value})
    .pipe(
      filter(res => res && !!res.ok),
      tap(_ => this.userSrv.UserLogIn(_, true, false)),
      filter(res => res && !value),
      tap(_ => this.socket.emit('offline', _.user))
    );
  }

  public listenOnline(): Observable<UserOnline> {
    return this.socket.listen('new-online');
  }

  public listenOffline(): Observable<UserOnline> {
    return this.socket.listen('new-offline');
  }

}