import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.config';

import * as UserActions from './user.actions';
import * as fromUser from './user.selectors';
import { User } from '@shared/interfaces/interfaces';

@Injectable({providedIn: 'root'})

export class UserFacade {

  user$ = this.store.select(fromUser.get);
  loaded$ = this.store.select(fromUser.getLoaded);

  constructor(private store: Store<AppState>) { }

  public set(user: User): void {
    this.store.dispatch(UserActions.set({user}));
  }

}
