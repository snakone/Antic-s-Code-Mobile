import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@shared/interfaces/interfaces';
import { UserService } from '@services/user/user.service';

@Pipe({name: 'friends'})

export class FriendsPipe implements PipeTransform {

  user = this.userSrv.getUser();

  constructor(private userSrv: UserService) { }

  transform(value: User[], args?: User[]): User[] {
    if (!value) { return []; }
    return value.filter(user => !args.some(f => f._id === user._id));
  }
}
