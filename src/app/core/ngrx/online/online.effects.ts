import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as OnlineActions from './online.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { OnlineService } from '@core/services/online/online.service';

@Injectable()

export class OnlineEffects {

  constructor(
    private actions: Actions,
    private onlineSrv: OnlineService
  ) { }

  // GET USERS ONLINE
  getOnlineEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(OnlineActions.get),
      concatMap(() => this.onlineSrv.getUsersOnline()
        .pipe(
          map(online => OnlineActions.getSuccess({online})),
          catchError(error =>
              of(OnlineActions.getFailure({ error: error.message }))
    ))))
  );

  // LISTEN ONLINE
  listenOnlineEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(OnlineActions.listenOnline),
    concatMap(_ => this.onlineSrv.listenOnline()
      .pipe(
        map(online => OnlineActions.listenOnlineSuccess({ online })),
        catchError(error =>
            of(OnlineActions.listenOnlineFailure({ error: error.message }))
    ))))
  );

  // LISTEN OFFLINE
  listenOfflineEffect$ = createEffect(() => this.actions
  .pipe(
    ofType(OnlineActions.listenOffline),
    concatMap(_ => this.onlineSrv.listenOffline()
      .pipe(
        map(online => OnlineActions.listenOnlineSuccess({ online })),
        catchError(error =>
            of(OnlineActions.listenOnlineFailure({ error: error.message }))
    ))))
  );

}
