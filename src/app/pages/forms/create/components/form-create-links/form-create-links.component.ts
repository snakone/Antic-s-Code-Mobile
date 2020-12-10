import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Link } from '@shared/interfaces/interfaces';
import { CrafterService } from '@services/crafter/crafter.service';
import { LinksComponent } from '@modals/links/links.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsFacade } from '@store/forms/forms.facade';
import { DraftForm } from '@shared/interfaces/interfaces';
import { FormGroupState } from 'ngrx-forms';
import { URL_PATTERN } from '@shared/data/patterns';

@Component({
  selector: 'app-form-create-links',
  templateUrl: './form-create-links.component.html',
  styleUrls: ['./form-create-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateLinksComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;
  form: FormGroup;
  urlPattern = URL_PATTERN;

  constructor(
    private crafter: CrafterService,
    private formsFacade: FormsFacade
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get properties() { return this.draftForm.userDefinedProperties; }
  get name() { return this.form.get('name'); }
  get url() { return this.form.get('url'); }

  private createForm(): void {
    this.form = new FormGroup({
       name: new FormControl('', [
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(35)
       ]),
      url: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.urlPattern)
    ])});
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }
    const { name, url } = this.form.value;
    const link: Link = { name, url };
    this.formsFacade.action('links', link);
    this.crafter.toast('LINK.ADDED');
    this.form.patchValue({name: '', url: ''});
    this.name.setErrors(null);
    this.url.setErrors(null);
  }

  public openTooltip(): void {
    this.crafter.alert('TOOLTIP.LINKS', false);
  }

  public openLinks(): void {
    this.crafter.modal(LinksComponent, {
      links: this.properties.links
    });
  }

  public delete(): void {
    this.formsFacade.action('deleteLinks', true);
  }

}
