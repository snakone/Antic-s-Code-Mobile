import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/app.config';

import * as UserActions from './user.actions';
import * as fromUser from './user.selectors';
import { User } from '@shared/interfaces/interfaces';

@Injectable({providedIn: 'root'})

export class UserFacade {

  user$ = this.store.select(fromUser.get);
  loaded$ = this.store.select(fromUser.getUsersLoaded);
  users$ = this.store.select(fromUser.getUsers);
  filtered$ = this.store.select(fromUser.getFiltered);
  byName$ = this.store.select(fromUser.getByName);
  friends$ = this.store.select(fromUser.getFriends);
  filteredFriends$ = this.store.select(fromUser.getFilteredFriends);
  friendsLoaded$ = this.store.select(fromUser.getFriendsLoaded);
  friendsCount$ = this.store.select(fromUser.getFriendsCount);

  constructor(private store: Store<AppState>) { }

  public set(user: User): void {
    this.store.dispatch(UserActions.set({user}));
  }

  public getUsers(): void {
    this.store.dispatch(UserActions.getUsers());
  }

  public getFriends(): void {
    this.store.dispatch(UserActions.getFriends());
  }

  public addFriend(friend: User): void {
    this.store.dispatch(UserActions.addFriend({friend}));
  }

  public removeFriend(friend: User): void {
    this.store.dispatch(UserActions.removeFriend({friend}));
  }

  public getByName(name: string): void {
    this.store.dispatch(UserActions.getByName({name}));
  }

  public search(value: string): void {
    this.store.dispatch(UserActions.search({value}));
  }

  public searchFriends(value: string): void {
    this.store.dispatch(UserActions.searchFriends({value}));
  }

  public logOut(): void {
    this.store.dispatch(UserActions.userLogOut());
  }

  public resetByName(): void {
    this.store.dispatch(UserActions.resetByName());
  }

  public resetFriends(): void {
    this.store.dispatch(UserActions.resetFriends());
  }

}
