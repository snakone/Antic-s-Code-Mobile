import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { StorageService } from '@services/storage/storage.service';
import { LanguageService } from '@core/language/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})

export class SettingsPage implements OnInit {

  theme: string;
  language: string;
  remember: boolean;

  lang = [
    { value: 'es', name: 'SPANISH' },
    { value: 'en', name: 'ENGLISH' }
  ];

  mail = [
    { value: true, name: 'YES' },
    { value: false, name: 'NO' }
  ];

  constructor(
    private userSrv: UserService,
    private crafter: CrafterService,
    private router: Router,
    private ls: StorageService,
    private languageSrv: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getLocalData();
  }

  private getLocalData(): void {
    this.theme = this.ls.get('theme');
    this.language = this.ls.get('lang');
    this.remember = this.ls.get('remember');
  }

  public themeChanged(value: string): void {
    document.body.classList.toggle('dark');
    this.ls.setKey('theme', value);
  }

  public languageChanged(value: string): void {
    this.ls.setKey('lang', value);
    this.languageSrv.change(value);
  }

  public rememberChanged(value: string): void {
    this.ls.setKey('remember', value);
  }

  public logout(): void {
    const confirm = this.crafter.confirm(
      this.translate.instant('SURE.EXIT'),
      this.translate.instant('LOGOUT')
    );
    confirm.then(res => {
      if (!res.role) {
        this.userSrv.logout();
        this.router.navigateByUrl('login');
      }
    });
  }

}
