import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as MailActions from './mail.actions';
import * as fromMail from './mail.selectors';
import { MailPartialState } from '../ngrx.config';

import { MailMessage } from '@shared/interfaces/interfaces';

@Injectable()

export class MailFacade {

  selected$ = this.store.select(fromMail.getSelected);
  unread$ = this.store.select(fromMail.getUnread);
  single$ = this.store.select(fromMail.getSingle);
  byFriend$ = this.store.select(fromMail.getByFriend);

  constructor(private store: Store<MailPartialState>) { }

  public getByFriend(friend: string): void {
    this.store.dispatch(MailActions.getByFriend({friend}));
  }

  public set(subject: string): void {
    this.store.dispatch(MailActions.set({subject}));
  }

  public send(message: MailMessage): void {
    this.store.dispatch(MailActions.send({message}));
  }

  public markUnread(id: string, mark: boolean): void {
    this.store.dispatch(MailActions.markUnread({id, mark}));
  }

  public filter(value: string): void {
    this.store.dispatch(MailActions.filter({value}));
  }

  public reset(): void {
    this.store.dispatch(MailActions.reset());
  }
  
  public resetSingle(): void {
    this.store.dispatch(MailActions.resetSingle());
  }

}
