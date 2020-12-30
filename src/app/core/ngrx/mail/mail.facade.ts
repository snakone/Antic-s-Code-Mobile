import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as MailActions from './mail.actions';
import * as fromMail from './mail.selectors';
import { MailPartialState } from '../ngrx.config';

import { Mail, MailMessage } from '@shared/interfaces/interfaces';

@Injectable()

export class MailFacade {

  mail$ = this.store.select(fromMail.getMail);
  mailLoaded$ = this.store.select(fromMail.getLoaded);
  filtered$ = this.store.select(fromMail.getFiltered);
  selected$ = this.store.select(fromMail.getSelected);
  unread$ = this.store.select(fromMail.getUnread);
  byFriend$ = this.store.select(fromMail.getByFriend);

  constructor(private store: Store<MailPartialState>) { }

  public get(): void {
    this.store.dispatch(MailActions.get());
  }

  public getByFriend(friend: string): void {
    this.store.dispatch(MailActions.getByFriend({friend}));
  }

  public set(mail: Mail): void {
    this.store.dispatch(MailActions.set({mail}));
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

}
