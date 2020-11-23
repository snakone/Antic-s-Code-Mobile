import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { StorageService } from '@services/storage/storage.service';
import { LanguageService } from '@core/language/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuController, ModalController } from '@ionic/angular';
import { LANGS, YESNOT } from '@shared/shared.data';
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
  }

  public themeChanged(value: string): void {
    document.body.classList.toggle('dark');
    this.ls.setKey('theme', value);
  }

  public languageChanged(value: string): void {
    this.ls.setKey('lang', value);
    this.languageSrv.change(value);
  }

  public rememberChanged(value: boolean): void {
    this.ls.setKey('remember', value);
  }

  public createChanged(value: boolean): void {
    this.ls.setKey('createTutorial', value);
  }

  public introChanged(value: boolean): void {
    this.ls.setKey('introTutorial', value);
  }

  public logout(): void {
    const confirm = this.crafter.confirm(
      this.translate.instant('SURE.EXIT'),
      this.translate.instant('LOGOUT')
    );
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
