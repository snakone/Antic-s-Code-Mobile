import { Component } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage {

  constructor(public userSrv: UserService) {}

}
