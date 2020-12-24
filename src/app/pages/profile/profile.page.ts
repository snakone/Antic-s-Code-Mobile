import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@shared/interfaces/interfaces';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePage implements OnInit {

  user: User;

  constructor(public userSrv: UserService) { }

  ngOnInit() {
    this.user = this.userSrv.getUser();
  }

}
