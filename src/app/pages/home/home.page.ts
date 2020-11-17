import { Component, OnInit } from '@angular/core';
import { DraftsService } from '@services/drafts/drafts.service';
import { Router } from '@angular/router';
import { CrafterService } from '@services/crafter/crafter.service';
import { MenuController } from '@ionic/angular';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {

  exist: boolean;
  open$: Observable<boolean>;

  constructor(
    public draftSrv: DraftsService,
    private router: Router,
    private crafter: CrafterService,
    public menu: MenuController
  ) {}

  ngOnInit() {
    this.open$ = from(this.menu.isOpen());
  }

  public async create(): Promise<void> {
    if (this.exist) {
      const confirm = this.crafter.confirm('OVERWRITE', 'ARTICLE.EXIST');
      confirm.then(async res => { if (!res.role) {
        this.router.navigateByUrl('create');
      }});
    } else { this.router.navigateByUrl('create'); }
  }

}
