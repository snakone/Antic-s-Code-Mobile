import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { FriendsResponse, User, UserFriends, UserResponse } from '@shared/interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { StorageService } from '@services/storage/storage.service';
import { environment } from '@env/environment';
import { filter, tap, map } from 'rxjs/operators';
import { AuthService } from '@services/login/auth.service';
import { UserFacade } from '@store/user/user.facade';
import { ContentFacade } from '@store/content/content.facade';
import { ContentService } from '@services/content/content.service';
import { SocketService } from '@core/sockets/services/socket.service';

@Injectable({providedIn: 'root'})

export class UserService {

  readonly API_USER = environment.api + 'user/';
  readonly API_FRIENDS = environment.api + 'friends/';
  readonly API_USERS = environment.api + 'users/';
  readonly API_TOKEN = environment.api + 'token/';
  private user: User;

  constructor(
    private http: HttpService,
    private ls: StorageService,
    private auth: AuthService,
    private userFacade: UserFacade,
    private contentFacade: ContentFacade,
    private contentSrv: ContentService,
    private socket: SocketService
  ) { }

  public getUser(): User {
    return this.user || null;
  }

  public setUser(user: User): void {
    this.user = user;
    this.userFacade.set(user);
  }

  public getByName(name: string): Observable<User> {
    return this.http
      .get<UserResponse>(this.API_USERS + `public/${name}`)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.user)
      );
  }

  public getUsers(): Observable<User[]> {
    return this.http
      .get<UserResponse>(this.API_USERS)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.users)
      );
  }

  public getUserById(id: string): Observable<User> {
    return this.http
      .get<UserResponse>(this.API_USER + id)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.user)
      );
  }

  public getUserEmailById(id: string): Observable<string> {
    return this.http
      .get<UserResponse>(this.API_USER + 'email/' + id)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.user.email)
      );
  }

  public getFriends(): Observable<User[]> {
    return this.http
      .get<FriendsResponse>(this.API_FRIENDS)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.friends)
      );
  }

  public addUserAsFriend(id: string): Observable<User> {
    return this.http
      .post<FriendsResponse>(this.API_FRIENDS + 'add', {id})
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.friend)
      );
  }

  public removeUserAsFriend(id: string): Observable<User> {
    return this.http
      .delete<FriendsResponse>(this.API_FRIENDS + 'remove/' + id)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.friend)
      );
  }

  public refreshToken(id: string): Observable<User> {
    return this.http
      .post<UserResponse>(this.API_TOKEN + id, null)
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.UserLogIn(res, true)),
        map(res => res.user)
      );
  }

  public verifyToken(): Observable<User> {
    if (!this.ls.get('token')) { return of(null); }
    return this.http
      .get<UserResponse>(this.API_TOKEN)
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.UserLogIn(res, true)),
        map(res => res.user)
      );
  }

  public UserLogIn(data: UserResponse, emit: boolean): void {
    this.setUser(data.user);
    this.ls.setKey('token', data.token);
    this.ls.setKey('user', data.user._id);
    this.contentFacade.resetContent();
    if (emit) { this.socket.emit('online', data.user); }
  }

  public logout(): void {
    this.ls.setKey('token', null);
    this.ls.setKey('draftForm', null);
    this.socket.emit('offline', this.user);
    this.user = null;
    this.auth.logOut();
    this.userFacade.logOut();
    this.contentSrv.resetPage();
    
  }

}


