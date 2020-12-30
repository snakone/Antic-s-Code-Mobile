import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as OnlineActions from './online.actions';
import * as fromOnline from './online.selectors';

import { AppState } from '@app/app.config';

@Injectable()

export class OnlineFacade {

  online$ = this.store.select(fromOnline.get);
  loaded$ = this.store.select(fromOnline.getLoaded);

  constructor(private store: Store<AppState>) { }

  public get(): void {
    this.store.dispatch(OnlineActions.get());
  }

  public listenOnline(): void {
    this.store.dispatch(OnlineActions.listenOnline());
    this.store.dispatch(OnlineActions.listenOffline());
  }

}
