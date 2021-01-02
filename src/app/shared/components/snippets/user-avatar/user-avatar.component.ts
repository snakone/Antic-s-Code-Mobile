import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '@services/theme/theme.service';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})

export class UserAvatarComponent implements OnInit {

  @Input() user: User;

  constructor(public themeSrv: ThemeService) { }

  ngOnInit() {}

}
