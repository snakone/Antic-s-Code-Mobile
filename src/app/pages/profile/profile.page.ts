import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { PROFILE_HEADER } from '@shared/shared.data';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePage {

  header = PROFILE_HEADER;

  constructor() {}

}
