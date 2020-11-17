import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { timer } from 'rxjs';
import { APP_CONSTANTS } from './app.config';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@core/services/storage/storage.service';
import { Plugins } from '@capacitor/core';

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
      Plugins.SplashScreen.hide();
      timer(2000).subscribe(() => {
        this.showSplash = false;
      });
      if (this.platform.is('android')) {
        Plugins.StatusBar.setOverlaysWebView({overlay: true});
      }
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
