import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from '@services/theme/theme.service';
import { NavController } from '@ionic/angular';
import { UserResponse, User, NotificationPayload } from '@shared/interfaces/interfaces';
import { AuthService } from '@services/login/auth.service';
import { PushService } from '@services/push/push.service';
import { NEW_USER_PUSH } from '@shared/data/push';
import { CrafterService } from '@services/crafter/crafter.service';
import { UserService } from '@services/user/user.service';

import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { SocketService } from '@app/core/sockets/services/socket.service';


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
    private sw: PushService,
    private crafter: CrafterService,
    private socket: SocketService
  ) { }

  public async google(): Promise<void> {
    try {
      const user = await Plugins.GoogleAuth.signIn() as any;
      const authUser: User = {
        name: user.displayName,
        email: user.email,
        profile: {
          avatar: user.imageUrl
        }
      };
  
      this.authSrv.signIn(authUser)
        .pipe(takeUntil(this.unsubscribe$))
         .subscribe((user: UserResponse) => this.handleSignIn(user));
    } catch (err) {
      console.log(err);
      this.crafter.alert('ERRORS.REQUEST.MESSAGE');
    }
  }

  private handleSignIn(data: UserResponse): void {
    this.userSrv.UserLogIn(data, true);
    this.nav.navigateRoot('home');
    if (data.message.indexOf('Created') > -1) {
      this.sw.send(
        this.setNotification(Object.assign({}, NEW_USER_PUSH), data.user.name)
      ).toPromise().then();
    }
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
