import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuService } from '@services/menu/menu.service';
import { User } from '@shared/interfaces/interfaces';
import { MenuController } from '@ionic/angular';
import { UserService } from '@services/user/user.service';
import { PROFILE_HEADER } from '@shared/shared.data';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePage implements OnInit {

  header = PROFILE_HEADER;
  user: User;

  constructor(public userSrv: UserService) { }

  ngOnInit() {
    this.user = this.userSrv.getUser();
  }

}
