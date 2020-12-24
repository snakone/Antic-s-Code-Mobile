import { Injectable } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';

import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

@Injectable({ providedIn: 'root'})

export class ShareService {

  constructor(private crafter: CrafterService) { }

  public async share(payload: ShareData): Promise<boolean | void> {
    try {
      await Share.share(payload);
    } catch (err) {
      this.crafter.alert('ERRORS.SHARE.MESSAGE');
      return await Promise.resolve(false);
    } 
  }

}

