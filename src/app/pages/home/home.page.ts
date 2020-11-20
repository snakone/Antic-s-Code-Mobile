import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePage {

  exist: boolean;
  open$: Observable<boolean>;

  constructor(
    private router: Router,
    private crafter: CrafterService
  ) {}

  public async create(): Promise<void> {
    if (this.exist) {
      const confirm = this.crafter.confirm('OVERWRITE', 'ARTICLE.EXIST');
      confirm.then(async res => { if (!res.role) {
        this.router.navigateByUrl('create');
      }});
    } else { this.router.navigateByUrl('create'); }
  }

}
