import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { CrafterService } from '@services/crafter/crafter.service';
import { StorageService } from '@services/storage/storage.service';
import { LanguageService } from '@core/language/services/language.service';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { LANGS, YESNOT } from '@shared/data/app';
import { User } from '@shared/interfaces/interfaces';
import { OnlineService } from '@core/services/online/online.service';

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
  online: boolean;

  lang = LANGS;
  mail = YESNOT;
  user: User;

  constructor(
    private userSrv: UserService,
    private crafter: CrafterService,
    private ls: StorageService,
    private languageSrv: LanguageService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private nav: NavController,
    private onlineSrv: OnlineService
  ) { }

  ngOnInit() {
    this.user = this.userSrv.getUser();
    this.getLocalData();
  }

  private getLocalData(): void {
    this.theme = this.ls.get('theme');
    this.language = this.ls.get('lang');
    this.remember = this.ls.get('remember');
    this.create = this.ls.get('createTutorial');
    this.intro = this.ls.get('introTutorial');
    this.login = this.ls.get('autoLogin');
    this.online = this.user.showOnline;
  }

  public change(key: string, value: boolean) {
    this.ls.setKey(key, value);
    switch(key) {
      case 'theme': document.body.classList.toggle('dark');
       break;
      case 'lang': this.languageSrv.change(String(value));
       break;
      case 'online': this.onlineSrv.setShowOnline(value).toPromise().then();
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
        this.nav.navigateRoot('/login');
      }
    });
  }

  public close(): void {
    this.modalCtrl.dismiss();
  }

}
