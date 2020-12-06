import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Link } from '@shared/interfaces/interfaces';
import { CrafterService } from '@services/crafter/crafter.service';
import { LinksComponent } from '@modals/links/links.component';

@Component({
  selector: 'app-form-create-links',
  templateUrl: './form-create-links.component.html',
  styleUrls: ['./form-create-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateLinksComponent implements OnInit {

  links: Link[] = [];

  constructor(private crafter: CrafterService) { }

  ngOnInit() {}

  public addLink(t, u): void {
    this.links.push({
      name: t.value,
      url: u.value,
    });
    this.crafter.toast('LINK.ADDED');
    t.value = '';
    u.value = '';
  }

  public openTooltip(): void {
    this.crafter.alert('TOOLTIP.LINKS', false);
  }

  public openLinks(): void {
    this.crafter.modal(LinksComponent, {links: this.links});
  }

}
