import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { UserService } from '@core/services/user/user.service';

@Injectable()

export class UserEffects {

  constructor(
    private actions: Actions,
    private userSrv: UserService
  ) { }

  // GET ALL USER
  getUsersEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getUsers),
    concatMap(() =>
      this.userSrv.getUsers()
      .pipe(
        map(users => UserActions.getUsersSuccess({ users })),
          catchError(error =>
              of(UserActions.getUsersFailure({ error: error.message }))
    ))))
  );

  // SET USER
  setUserEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.set),
    map((action) => UserActions.setSuccess({ user: action.user })),
      catchError(error =>
        of(UserActions.setFailure({ error: error.message }))
    ))
  );

  // GET USER BY NAME
  getUserByNameEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getByName),
    concatMap((action) =>
    this.userSrv.getByName(action.name)
      .pipe(
        map(res => UserActions.getByNameSuccess({ res })),
        catchError(error =>
            of(UserActions.getByNameFailure({ error: error.message }))
    ))))
  );

  // GET USER FRIENDS
  getFriendsEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(UserActions.getFriends),
    concatMap(() =>
      this.userSrv.getFriends()
      .pipe(
        map(friends => UserActions.getFriendsSuccess({ friends })),
          catchError(error =>
              of(UserActions.getFriendsFailure({ error: error.message }))
    ))))
  );

}
