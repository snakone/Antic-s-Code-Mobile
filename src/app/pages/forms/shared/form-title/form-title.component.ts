import { Component, Input, OnInit } from '@angular/core';
import { FormsFacade } from '@store/forms/forms.facade';
import { Article, Draft, DraftForm } from '@shared/interfaces/interfaces';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.scss'],
})
export class FormTitleComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;
  @Input() content: Article | Draft;
  @Input() editable: boolean;

  constructor(private formsFacade: FormsFacade) { }

  public get title() { return this.draftForm.controls.title; }
  public get summary() { return this.draftForm.controls.summary; }

  ngOnInit() {
    this.bySlugToForm();
  }

  private bySlugToForm(): void {
    if (!this.draftForm || !this.content || !this.editable) { return; }
    this.formsFacade.action('title', this.content.title);
    this.formsFacade.action('summary', this.content.summary);
  }

}
