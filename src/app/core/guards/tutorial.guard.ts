import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';

@Injectable({providedIn: 'root'})

export class TutorialGuard implements CanLoad {

  constructor(
    private ls: StorageService,
    private nav: NavController
  ) {}

  canLoad(): boolean {
    return this.ls.get('createTurotial') ? true :
           (this.nav.navigateForward('/forms/create'), false);
  }
}
