import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { StorageService } from '@services/storage/storage.service';
import { LanguageService } from '@core/language/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuController, ModalController } from '@ionic/angular';
import { LANGS, YESNOT } from '@shared/data/app';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent implements OnInit {

  theme: string;
  language: string;
  remember: boolean;
  create: boolean;
  intro: boolean;
  login: boolean;

  lang = LANGS;
  mail = YESNOT;
  user: User;

  constructor(
    private userSrv: UserService,
    private crafter: CrafterService,
    private router: Router,
    private ls: StorageService,
    private languageSrv: LanguageService,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.getLocalData();
    this.user = this.userSrv.getUser();
  }

  private getLocalData(): void {
    this.theme = this.ls.get('theme');
    this.language = this.ls.get('lang');
    this.remember = this.ls.get('remember');
    this.create = this.ls.get('createTutorial');
    this.intro = this.ls.get('introTutorial');
    this.login = this.ls.get('autoLogin');
  }

  public change(key: string, value: boolean) {
    this.ls.setKey(key, value);
    switch(key) {
      case 'theme': document.body.classList.toggle('dark');
       break;
      case 'lang': this.languageSrv.change(String(value));
       break;
    }
  }

  public logout(): void {
    const confirm = this.crafter.confirm('SURE.EXIT', 'LOGOUT');
    confirm.then(async res => {
      if (!res.role) {
        this.userSrv.logout();
        this.modalCtrl.dismiss();
        await this.menuCtrl.close();
        this.router.navigateByUrl('login');
      }
    });
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

}
