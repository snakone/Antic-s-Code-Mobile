import { Injectable } from '@angular/core';
import {
  AlertController,
  ToastController,
  PopoverController,
  ModalController,
  LoadingController
} from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';
import { ComponentRef } from '@ionic/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class CrafterService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private popCtrl: PopoverController,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private loading: LoadingController
  ) { }

  public async alert(message: string, header = true): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: header ? 'Antic\'s Code Mobile' : null,
      mode: 'ios',
      message: this.translateMsg(message),
      buttons: ['OK']
    });
    return alert.present();
  }

  public async confirm(message: string, header: string): Promise<any> {
    const alert = await this.alertCtrl.create({
      header: this.translateMsg(header),
      message: this.translateMsg(message),
      mode: 'ios',
      buttons: [
        {
          text: this.translateMsg('CANCEL'),
          role: 'cancel',
        },
        { text: 'OK' }
      ]
    });

    alert.present();
    return alert.onDidDismiss();
  }

  public async toast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: this.translateMsg(message),
      duration: 3000,
      color: 'light',
      position: 'top',
      cssClass: 'toast-sheet'
    });
    return toast.present();
  }

  public async modal(component: ComponentRef, data?: any): Promise<void> {
    if (await this.modalCtrl.getTop()) { return; }
    const modal = await this.modalCtrl.create({
      component,
      componentProps: data
    });
    return modal.present();
  }

  public async loader(): Promise<void> {
    const loading = await this.loading.create({
      message: this.translateMsg('LOADING')
    });
    return loading.present();
  }

  public async loaderOff(): Promise<void> {
    await this.loading.dismiss();
  }

  public async pop<T>(
    component: ComponentRef,
    data?: any,
    cssClass?: string,
    event?: any
  ): Promise<void> {
    const popover = await this.popCtrl.create({
      component,
      componentProps: data,
      event,
      cssClass,
      mode: 'ios'
    });
    return popover.present();
  }

  public async handleError(err: HttpErrorResponse): Promise<void> {
    if (await this.alertCtrl.getTop()) { return; }
    switch (err.status) {
      case 0: this.alert('ERRORS.WEB.MESSAGE');
              break;
      case 400: case 406:
                this.alert('ERRORS.REQUEST.MESSAGE');
                break;
      case 401: return null;
      case 403: this.alert('ERRORS.ACCESS.MESSAGE');
                break;
      case 409: this.alert('ERRORS.USER_ALREADY.MESSAGE');
                break;
      case 500: this.alert('ERRORS.SERVER.MESSAGE');
                break;
      default: this.alert('ERRORS.UNKNOWN.MESSAGE');
    }
  }

  private translateMsg(msg: string): string {
    return this.translate.instant(msg);
  }

  public close(): void {
    this.popCtrl.dismiss();
  }

}
