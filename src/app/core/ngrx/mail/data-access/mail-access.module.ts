import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { mailReducers } from '../../ngrx.index';
import { MailEffects } from '../mail.effects';
import { MailFacade } from '../mail.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('MailState', mailReducers),
    EffectsModule.forFeature([
      MailEffects
    ]),
  ],
  providers: [MailFacade]
})

export class MailAccessModule { }
