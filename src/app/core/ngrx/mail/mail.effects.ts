import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MailActions from './mail.actions';
import { map, concatMap, catchError } from 'rxjs/operators';
import { MailService } from '@core/services/mail/mail.service';

@Injectable()

export class MailEffects {

  constructor(
    private actions: Actions,
    private mailSrv: MailService
  ) { }

  // GET BY FRIEND
  getByFriendEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(MailActions.getByFriend),
      concatMap((action) => this.mailSrv.getByFriend(action.friend)
        .pipe(
          map(mail => MailActions.getByFriendSuccess({mail})),
          catchError(error =>
              of(MailActions.getByFriendFailure({ error: error.message }))
    ))))
  );

  // SEND MAIL
  sendMailEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(MailActions.send),
      concatMap((action) => this.mailSrv.send(action.message)
        .pipe(
          map(result => MailActions.sendSuccess({result})),
          catchError(error =>
              of(MailActions.sendFailure({ error: error.message }))
    ))))
  );

  // MARK UNREAD
  markUnreadEffect$ = createEffect(() => this.actions
    .pipe(
      ofType(MailActions.markUnread),
      concatMap((action) => this.mailSrv.markUnread(action.id, action.mark)
        .pipe(
          map(_ => MailActions.markUnreadSuccess()),
          catchError(error =>
              of(MailActions.markUnreadFailure({ error: error.message }))
    ))))
  );

}
