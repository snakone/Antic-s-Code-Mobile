import { Component, Input, OnInit } from '@angular/core';
import { FormsFacade } from '@store/forms/forms.facade';
import { CrafterService } from '@services/crafter/crafter.service';
import { UtilsService } from '@services/utils/utils.service';
import { TAGS, LEVELS } from '@shared/data/article';
import { CATEGORIES } from '@shared/data/categories';
import { Article, Draft, DraftForm, DraftFormData } from '@shared/interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss'],
})

export class DataPickerComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;
  @Input() content: Article | Draft;
  @Input() editable: boolean;
  categories = CATEGORIES;
  tags = TAGS;
  levels = LEVELS;

  constructor(
    private translate: TranslateService,
    private crafter: CrafterService,
    private formsFacade: FormsFacade,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.bySlugToForm();
  }

  public get properties() { return this.draftForm.userDefinedProperties as DraftFormData; }

  private bySlugToForm(): void {
    if (!this.draftForm || !this.content || !this.editable) { return; }
    this.properties.category = this.content.category;
    this.properties.tags = this.content.tags;
    this.properties.level = this.content.level;
    this.properties.cover = this.content.cover;
    this.formsFacade.action('loadForm', this.draftForm);
  }

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
        const picker = await this.utils.pickerCategory(this.categories);
        picker.present();
      }
       break;
      case 'tags': {
        const picker = await this.utils.pickerTags(this.tags);
        picker.present();
      }
       break;
      case 'levels': {
        const picker = await this.utils.pickerLevel(this.levels);
        picker.present();
      }
       break;
    }
  }

  public reset(input: string): void {
    this.formsFacade.action(input, '');
  }

}
