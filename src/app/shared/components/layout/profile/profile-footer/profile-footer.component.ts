import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserFacade } from '@store/user/user.facade';
import { User } from '@shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-footer',
  templateUrl: './profile-footer.component.html',
  styleUrls: ['./profile-footer.component.scss'],
})

export class ProfileFooterComponent implements OnInit {

  @Input() user: User;
  @Input() public: boolean;
  @Input() friends: User[];
  @Input() count: number;

  constructor() { }

  ngOnInit() { }

}
