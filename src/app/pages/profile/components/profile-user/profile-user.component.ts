import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})

export class ProfileUserComponent implements OnInit {

  constructor(public userSrv: UserService) { }

  ngOnInit() {}

}
