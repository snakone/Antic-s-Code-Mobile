import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';

@Injectable({providedIn: 'root'})

export class TutorialGuard implements CanActivate {

  constructor(
    private ls: StorageService,
    private nav: NavController
  ) {}

  canActivate(): boolean {
    return this.ls.get('createTutorial') ? true :
           (this.nav.navigateForward('/forms/create'), false);
  }
}
