import { Component, Input, OnInit } from '@angular/core';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile-footer',
  templateUrl: './profile-footer.component.html',
  styleUrls: ['./profile-footer.component.scss'],
})

export class ProfileFooterComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() { }

}
