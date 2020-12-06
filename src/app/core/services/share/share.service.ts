import { Injectable } from '@angular/core';
import { CrafterService } from '../crafter/crafter.service';

@Injectable({ providedIn: 'root'})

export class ShareService {

  constructor(private crafter: CrafterService) { }

  public share(payload: ShareData): Promise<boolean | void> {
    try {
      return navigator.share(payload);
    } catch (err) {
      this.crafter.alert('ERRORS.SHARE.MESSAGE');
      return Promise.resolve(false);
    }
  }

}

