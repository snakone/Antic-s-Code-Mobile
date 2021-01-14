import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as OnlineActions from './online.actions';
import { map, concatMap, catchError, switchMap } from 'rxjs/operators';
import { OnlineService } from '@core/services/online/online.service';
import { UserFacade } from '@store/user/user.facade';

@Injectable()

export class OnlineEffects {

  constructor(
    private actions: Actions,
    private onlineSrv: OnlineService,
    private userFacade: UserFacade
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

  // SHOW ONLINE
  showOnlineEffect$ = createEffect(() => this.actions
   .pipe(
     ofType(OnlineActions.listenOnlineSuccess),
     map(() => this.userFacade.getFriends())
   ), { dispatch: false }
  );

}
