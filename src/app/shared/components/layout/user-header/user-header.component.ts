import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme/theme.service';
import { MenuService } from '@services/menu/menu.service';
import { User } from '@shared/interfaces/interfaces';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@services/user/user.service';
import { Observable, Subject } from 'rxjs';
import { UserFacade } from '@store/user/user.facade';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserHeaderComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() public: boolean;
  @Input() showBack: boolean;
  friends$: Observable<User[]>;
  myself: boolean;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public menuSrv: MenuService,
    public themeSrv: ThemeService,
    private menu: MenuController,
    private router: Router,
    private crafter: CrafterService,
    private translate: TranslateService,
    private userSrv: UserService,
    private userFacade: UserFacade
  ) { }

  ngOnInit() { 
    this.friends$ = this.userFacade.friends$;
    this.myself = this.userSrv.getUser()._id === this.user._id;
  }

  public openMenu(): void {
    this.menu.toggle('main');
  }

  public mail(): void {
    this.public ? this.addFriend() : this.router.navigateByUrl('mail');
  }

  public stats(): void {
    this.public ? console.log('like') : console.log('stats');
  }

  private addFriend(): void {
    const message = this.translate.instant(
      'FRIEND.ADD', 
      {friend: this.user.name}
    );

    const toast = this.translate.instant(
      'FRIEND.ADDED', 
      {friend: this.user.name}
    );

    const confirm = this.crafter.confirm(message, 'ADD.FRIEND');

    confirm.then(async res => {
      if (!res.role) {
        this.userSrv.addUserAsFriend(this.user._id)
        .pipe(takeUntil(this.unsubscribe$))
         .subscribe(_ => {
           this.crafter.toast(toast);
           this.userFacade.addFriend(_);
        });
      }
    });
  }

  public removeFriend(): void {
    const message = this.translate.instant(
      'FRIEND.REMOVE', 
      {friend: this.user.name}
    );

    const toast = this.translate.instant(
      'FRIEND.REMOVED', 
      {friend: this.user.name}
    );

    const confirm = this.crafter.confirm(message, 'REMOVE.FRIEND');

    confirm.then(async res => {
      if (!res.role) {
        this.userSrv.removeUserAsFriend(this.user._id)
        .pipe(takeUntil(this.unsubscribe$))
         .subscribe(_ => {
           this.crafter.toast(toast);
           this.userFacade.removeFriend(_);
        });
      }
    });
  }

  public isAdded(friends: User[]): boolean {
    return friends.some(f => f._id === this.user._id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
