import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PreviewComponent } from '@shared/components/modals/preview/preview.component';
import { CrafterService } from '@services/crafter/crafter.service';
import { DraftForm } from '@shared/interfaces/interfaces';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-form-create-message',
  templateUrl: './form-create-message.component.html',
  styleUrls: ['./form-create-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateMessageComponent implements OnInit {

  @Input() draftForm: FormGroupState<DraftForm>;

  constructor(private crafter: CrafterService) { }

  ngOnInit() {}

  public get message() { return this.draftForm.controls.message; }

  public openTooltip(): void {
    this.crafter.alert('TOOLTIP.MESSAGE', false);
  }

  public preview(): void {
    this.crafter.modal(PreviewComponent, { message: this.message.value });
  }

}
