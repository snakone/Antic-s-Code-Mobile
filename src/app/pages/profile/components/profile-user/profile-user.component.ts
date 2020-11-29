import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/shared/interfaces/interfaces';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})

export class ProfileUserComponent implements OnInit {

  @Input() user: User;

  constructor(public userSrv: UserService) { }

  ngOnInit() {}

}
