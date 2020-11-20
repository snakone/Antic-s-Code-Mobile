import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { map, concatMap, catchError, delay } from 'rxjs/operators';
import { UserService } from '@core/services/user/user.service';

@Injectable()

export class UserEffects {

  constructor(
    private actions: Actions,
    private userSrv: UserService
  ) { }


}
