import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { DraftForm, Index } from '@shared/interfaces/interfaces';
import { IndexComponent } from '@modals/index/index.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsFacade } from '@store/forms/forms.facade';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-form-create-index',
  templateUrl: './form-create-index.component.html',
  styleUrls: ['./form-create-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateIndexComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;
  form: FormGroup;

  constructor(
    private crafter: CrafterService,
    private formsFacade: FormsFacade
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get properties() { return this.draftForm.userDefinedProperties; }
  get title() { return this.form.get('title'); }
  get subtitle() { return this.form.get('subtitle'); }

  private createForm(): void {
    this.form = new FormGroup({
       title: new FormControl('', [
         Validators.minLength(5),
         Validators.maxLength(35)
       ]),
      subtitle: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(25)
    ])});
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }
    const { title, subtitle } = this.form.value;
    const index: Index = {
      title,
      subtitle,
      id: slugify(title)
    };
    this.formsFacade.action('index', index);
    this.crafter.toast('INDEX.ADDED');
    this.form.patchValue({title: '', subtitle: ''});
    this.title.setErrors(null);
    this.subtitle.setErrors(null);
  }

  public openIndex(): void {
    this.crafter.modal(IndexComponent, {
      index: this.properties.index
    });
  }

  public openTooltip(): void {
    this.crafter.alert('TOOLTIP.INDEX.USAGE', false);
  }

  public delete(): void {
    this.formsFacade.action('deleteIndex', true);
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
