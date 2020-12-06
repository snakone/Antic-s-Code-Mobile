import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from '@services/theme/theme.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserResponse, User, NotificationPayload } from '@shared/interfaces/interfaces';
import { AuthService } from '@services/login/auth.service';
import { PushService } from '@services/push/push.service';
import { NEW_USER_PUSH } from '@shared/data/push';
import firebase from 'firebase/app';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SocialLoginComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private nav: NavController,
    public theme: ThemeService,
    private userSrv: UserService,
    private authSrv: AuthService,
    private fire: AngularFireAuth,
    private sw: PushService,
  ) { }

  public google(): void {
    this.fire.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((res: firebase.auth.UserCredential) => {
      const authUser = this.createAuthUser(res.user);
      this.authSrv.signIn(authUser)
       .pipe(takeUntil(this.unsubscribe$))
       .subscribe((user: UserResponse) => this.handleSignIn(user));
    });
  }

  public github(): void {
    this.fire.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then((res: firebase.auth.UserCredential) => {
      const authUser = this.createAuthUser(res.user);
      this.authSrv.signIn(authUser)
       .pipe(takeUntil(this.unsubscribe$))
       .subscribe((user: UserResponse) => this.handleSignIn(user));
    });
  }

  private handleSignIn(data: UserResponse): void {
    this.userSrv.UserLogIn(data);
    this.nav.navigateRoot('home');
    if (data.message.indexOf('Created') > -1) {
      this.sw.send(
        this.setNotification(Object.assign({}, NEW_USER_PUSH), data.user.name)
      ).toPromise().then();
    }
  }

  private createAuthUser(user: firebase.User): User {
    const authUser: User = {
      name: user.displayName,
      email: user.email,
      profile: {
        avatar: user.photoURL
      }
    };

    return authUser;
  }

  private setNotification(payload: NotificationPayload,
                          name: string): NotificationPayload {
      payload.body = payload.body
      .concat(`.\n¡Bienvenido/a ${name}!`);
      return payload;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
