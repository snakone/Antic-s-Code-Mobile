import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { User } from '@shared/interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-friend-options',
  templateUrl: './friend-options.component.html',
  styleUrls: ['./friend-options.component.scss'],
})

export class FriendOptionsComponent implements OnInit {

  @Input() friend: User;

  constructor(
    private crafter: CrafterService,
    private router: Router,
    private nav: NavController
  ) { }

  ngOnInit() {}

  public goTo(option: string): void {
    switch(option) {
      case 'profile': this.profile()
       break;
      case 'mail': this.mail()
       break;
    }
    this.crafter.close();
  }

  private profile(): void {
    this.router.navigateByUrl('/public/' + this.friend.name);
  }

  private mail(): void {
    this.nav.navigateRoot('/mail/user/' + this.friend._id);
  }

}
