import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { User, UserResponse } from '@shared/interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { StorageService } from '@services/storage/storage.service';
import { environment } from '@env/environment';
import { filter, tap, map } from 'rxjs/operators';
import { AuthService } from '@services/login/auth.service';
import { UserFacade } from '@store/user/user.facade';

@Injectable({providedIn: 'root'})

export class UserService {

  readonly API_USER = environment.api + 'user/';
  readonly API_TOKEN = environment.api + 'token/';
  private user: User;

  constructor(
    private http: HttpService,
    private ls: StorageService,
    private auth: AuthService,
    private userFacade: UserFacade
  ) { }

  public getUser(): User {
    return this.user || null;
  }

  public setUser(user: User): void {
    this.user = user;
    this.userFacade.set(user);
  }

  public getUserById(id: string): Observable<User> {
    return this.http
      .get<UserResponse>(this.API_USER + id)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.user)
      );
  }

  public refreshToken(id: string): Observable<User> {
    return this.http
      .post<UserResponse>(this.API_TOKEN + id, null)
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.UserLogIn(res)),
        map(res => res.user)
      );
  }

  public verifyToken(): Observable<User> {
    if (!this.ls.get('token')) { return of(null); }
    return this.http
      .get<UserResponse>(this.API_TOKEN)
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.UserLogIn(res)),
        map(res => res.user)
      );
  }

  public logout(): void {
    this.ls.setKey('token', null);
    this.user = null;
    this.auth.logOut();
    this.userFacade.logOut();
  }

  public UserLogIn(data: UserResponse): void {
    this.setUser(data.user);
    this.ls.setKey('token', data.token);
    this.ls.setKey('user', data.user._id);
  }

}


