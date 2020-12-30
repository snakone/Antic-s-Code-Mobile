import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme/theme.service';
import { User } from '@app/shared/interfaces/interfaces';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})

export class ProfileUserComponent implements OnInit {

  @Input() user: User;

  constructor(public theme: ThemeService) { }

  ngOnInit() {}

}
