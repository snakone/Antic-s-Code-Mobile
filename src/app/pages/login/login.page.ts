import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '@shared/interfaces/interfaces';
import { Subject } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { takeUntil, finalize, tap } from 'rxjs/operators';
import { LoginService } from '@services/login/login.service';
import { StorageService } from '@services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { HelpComponent } from './components/help/help.component';
import { MenuService } from '@services/menu/menu.service';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  remember: boolean;
  private unsubscribe$ = new Subject<void>();
  open: boolean;

  constructor(
    private crafter: CrafterService,
    private userSrv: UserService,
    private loginSrv: LoginService,
    private ls: StorageService,
    private nav: NavController,
    public menuSrv: MenuService,
    public themeSrv: ThemeService
  ) {}

  ngOnInit() {
    this.checkToken();
    this.createForm();
    this.rememberMe();
    this.watchMenu();
    this.remember = this.ls.get('remember');
  }

  private async checkToken(): Promise<void> {
    if (!this.ls.get('token')) { return; }
    await this.crafter.loader();

    this.userSrv.verifyToken()
    .pipe(
      takeUntil(this.unsubscribe$),
      finalize(() => this.crafter.loaderOff())
    )
    .subscribe(_ => this.nav.navigateRoot('home'));
  }

  private createForm(): void {
    this.form = new FormGroup({
       email: new FormControl('', [
         Validators.required,
         Validators.email,
         Validators.minLength(5),
         Validators.maxLength(35)
       ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
    ])});
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }
    const { email, password } = this.form.value;
    this.signIn(email, password);
  }

  private async signIn(e: string, p: string): Promise<void> {
    await this.crafter.loader();
    this.loginSrv.signIn(e, p).pipe(
      takeUntil(this.unsubscribe$),
      finalize(() => this.crafter.loaderOff())
    )
    .subscribe(_ => {
      this.ls.setKey('remember', this.remember);
      this.nav.navigateRoot('home');
    });
  }

  private rememberMe(): void {
    const id = this.ls.get('user');
    const re = this.ls.get('remember');

    if ( re && id) {
      this.userSrv.getUserById(id)
       .pipe(takeUntil(this.unsubscribe$))
       .subscribe((res: User) => {
          this.form.controls.email
          .setValue(res.email);
          this.remember = true;
      });
    }
  }

  public async openHelp(): Promise<void> {
    await this.crafter.pop(HelpComponent);
  }

  private watchMenu(): void {
    this.menuSrv.isOpen$
     .subscribe(res => this.open = res);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
