import { Injectable } from '@angular/core';
import { CategoryList } from '@shared/interfaces/interfaces';
import { PickerController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormsFacade } from '@store/forms/forms.facade';
import { RandomizerPipe } from '@shared/pipes/randomizer/randomizer.pipe';
import { CrafterService } from '../crafter/crafter.service';
import { PickerColumnOption } from '@ionic/core';

@Injectable({providedIn: 'root'})

export class UtilsService {

  constructor(
    private pickerCtrl: PickerController,
    private translate: TranslateService,
    private formsFacade: FormsFacade,
    private crafter: CrafterService,
    private randomizer: RandomizerPipe
  ) { }

  public async pickerCategory(
    categories: CategoryList[]
  ): Promise<HTMLIonPickerElement> {
    return await this.pickerCtrl.create({
      columns: [
        { name: 'category',
          options: categories.map(c => (
            { text: this.translate.instant(c.name), value: c.category }))}],
          cssClass: 'picker',
          buttons: [
            { text: this.translate.instant('CANCEL'), role: 'cancel' },
            { text: this.translate.instant('ACCEPT'),
              handler: res => this.formsFacade.action('category', res.category.value)
            }
          ]
      });
  }

  public async pickerTags(
    tags: string[]
  ): Promise<HTMLIonPickerElement> {
    const column = (t: string): PickerColumnOption => (
      { text: this.translate.instant(t), value: t });
    return await this.pickerCtrl.create({
      columns: [
        { name: 'tags1',
          options: this.randomizer.transform(tags.map(t => (column(t))))},
        { name: 'tags2',
          cssClass: 'tags2',
          options: [...this.randomizer.transform([...tags.map(t => (column(t)))]),
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
  }

  public async pickerLevel(
    levels: string[]
  ) : Promise<HTMLIonPickerElement> {
    return await this.pickerCtrl.create({
      columns: [
        { name: 'levels',
          options: levels.map(l => (
          { text: this.translate.instant(l), value: l }))}],
      cssClass: 'picker',
      buttons: [
        { text: this.translate.instant('CANCEL'), role: 'cancel' },
        { text: this.translate.instant('ACCEPT'),
          handler: res => this.formsFacade.action('level', res.levels.value)
        }
      ]
    });
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
