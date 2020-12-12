import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { timer } from 'rxjs';
import { APP_CONSTANTS } from './app.config';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@core/services/storage/storage.service';
import { Plugins } from '@capacitor/core';

import { registerWebPlugin } from "@capacitor/core";
import { FileSharer } from '@byteowls/capacitor-filesharer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private ls: StorageService,
  ) {
    this.initializeApp();
    this.checkTheme();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        Plugins.SplashScreen.hide();
        Plugins.StatusBar.setOverlaysWebView({overlay: true});
        registerWebPlugin(FileSharer);
      }
      timer(2000).subscribe(() => {
        this.showSplash = false;
      });
    });
    this.translate.setDefaultLang(APP_CONSTANTS.DEFAULT_LANGUAGE);
    this.translate.use(APP_CONSTANTS.DEFAULT_LANGUAGE);
  }

  private checkTheme(): void {
    if (this.ls.get('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }

}
