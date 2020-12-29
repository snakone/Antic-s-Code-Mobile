import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { onlineReducers } from '../../ngrx.index';
import { OnlineEffects } from '../online.effects';
import { OnlineFacade } from '../online.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('OnlineState', onlineReducers),
    EffectsModule.forFeature([
      OnlineEffects
    ]),
  ],
  providers: [OnlineFacade]
})

export class OnlineAccessModule { }
