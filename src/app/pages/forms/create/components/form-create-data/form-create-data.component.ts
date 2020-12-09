import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CATEGORIES } from '@shared/data/categories';
import { CrafterService } from '@services/crafter/crafter.service';
import { TranslateService } from '@ngx-translate/core';
import { TAGS, LEVELS } from '@app/shared/data/article';
import { PickerController } from '@ionic/angular';
import { PickerColumnOption } from '@ionic/core';
import { RandomizerPipe } from '@shared/pipes/randomizer/randomizer.pipe';
import { DraftForm } from '@core/ngrx/forms/forms.reducer';
import { FormGroupState } from 'ngrx-forms';
import { FormsFacade } from '@store/forms/forms.facade';

@Component({
  selector: 'app-form-create-data',
  templateUrl: './form-create-data.component.html',
  styleUrls: ['./form-create-data.component.scss']
})

export class FormCreateDataComponent implements OnInit {

  @Output() index = new EventEmitter<boolean>();
  @Input() draftForm: FormGroupState<DraftForm>;
  categories = CATEGORIES;
  tags = TAGS;
  levels = LEVELS;
  showed = false;
  showIndex = true;

  constructor(
    private translate: TranslateService,
    private crafter: CrafterService,
    private pickerCtrl: PickerController,
    private randomizer: RandomizerPipe,
    private formsFacade: FormsFacade
  ) { }

  ngOnInit(): void { }

  public get properties() { return this.draftForm.userDefinedProperties; }

  public async openTooltip(type: string): Promise<void> {
    this.crafter.alert(this.getMessage(type), false);
  }

  private getMessage(type: string): string {
    switch (type) {
      case 'category': return this.translate.instant('TOOLTIP.CATEGORY');
      case 'tags': return this.translate.instant('TOOLTIP.TAGS');
      case 'levels': return this.translate.instant('TOOLTIP.LEVELS');
      case 'index': return this.translate.instant('TOOLTIP.INDEX');
    }
  }

  public async pick(type: string) {
    switch (type) {
      case 'category': {
        const picker = await this.pickerCtrl.create({
          columns: [
            { name: 'category',
              options: this.categories.map(c => (
              { text: this.translate.instant(c.name), value: c.category }))}],
          cssClass: 'picker',
          buttons: [
            { text: this.translate.instant('CANCEL'), role: 'cancel' },
            { text: this.translate.instant('ACCEPT'),
              handler: res => this.formsFacade.action('category', res.category.value)
            }
          ]
        });
        picker.present();
      }
                       break;
      case 'tags': {
        const column = (t: string): PickerColumnOption => (
          { text: this.translate.instant(t), value: t });

        const picker = await this.pickerCtrl.create({
          columns: [
            { name: 'tags1',
              options: this.randomizer.transform(this.tags.map(t => (column(t))))},
            { name: 'tags2',
              cssClass: 'tags2',
              options: [...this.randomizer.transform([...this.tags.map(t => (column(t)))]),
                { text: this.translate.instant('NONE'), value: null }]}],
          cssClass: 'picker',
          buttons: [
            { text: this.translate.instant('CANCEL'), role: 'cancel' },
            { text: this.translate.instant('ACCEPT'),
              handler: (res: CustomColumnS) => {
                const arr = Object.entries(res).map(c => c[1].value);
                arr.reduce((a, c) =>  a === c ? this.crafter.alert('TAG.REPEAT', false) : a);
                const tags  = [...new Set(arr)].filter(x => x && !!x);
                this.formsFacade.action('tags', tags);
              }
            }
          ]
        });
        picker.present();
      }
                   break;
      case 'levels': {
        const picker = await this.pickerCtrl.create({
          columns: [
            { name: 'levels',
              options: this.levels.map(l => (
              { text: this.translate.instant(l), value: l }))}],
          cssClass: 'picker',
          buttons: [
            { text: this.translate.instant('CANCEL'), role: 'cancel' },
            { text: this.translate.instant('ACCEPT'),
              handler: res => this.formsFacade.action('level', res.levels.value)
            }
          ]
        });
        picker.present();
      }
    }
  }

  public changed(e: boolean): void {
    this.index.emit(e);
    if (this.showed) { return; }
    this.openTooltip('index');
    this.showed = true;
  }
}

interface CustomColumnS {
  tabs1: CustomColumn;
  tabs2: CustomColumn;
  tabs3: CustomColumn;
}

interface CustomColumn {
  text: string;
  value: string;
  columnIndex: number;
}
