import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class MenuService {

  public isOpen: Subject<boolean> = new Subject<false>();

  public setMenuState(state: boolean): void {
    this.isOpen.next(state);
  }

}
