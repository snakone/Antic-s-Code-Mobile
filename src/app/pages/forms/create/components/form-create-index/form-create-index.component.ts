import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { Index } from '@shared/interfaces/interfaces';
import { IndexComponent } from '@modals/index/index.component';

@Component({
  selector: 'app-form-create-index',
  templateUrl: './form-create-index.component.html',
  styleUrls: ['./form-create-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateIndexComponent implements OnInit {

  index: Index[] = [];

  constructor(private crafter: CrafterService) { }

  ngOnInit() {}

  public addIndex(t, s): void {
    this.index.push({
      title: t.value,
      subtitle: s.value,
      id: slugify(t.value)
    });
    this.crafter.toast('INDEX.ADDED');
    t.value = '';
    s.value = '';
  }

  public openIndex(): void {
    this.crafter.modal(IndexComponent, {index: this.index});
  }

  public openTooltip(): void {
    this.crafter.alert('TOOLTIP.INDEX.USAGE', false);
  }

}

const slugify = ( text: string ) => {
  return text
  .toString()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace('.', '-')
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-');
};
