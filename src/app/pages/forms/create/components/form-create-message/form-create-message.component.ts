import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PreviewComponent } from '@shared/components/modals/preview/preview.component';
import { CrafterService } from '@services/crafter/crafter.service';

@Component({
  selector: 'app-form-create-message',
  templateUrl: './form-create-message.component.html',
  styleUrls: ['./form-create-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreateMessageComponent implements OnInit {

  message: string;

  constructor(private crafter: CrafterService) { }

  ngOnInit() {}

  public openTooltip(): void {
    this.crafter.alert('TOOLTIP.MESSAGE', false);
  }

  public preview(): void {
    this.crafter.modal(PreviewComponent, { message: this.message });
  }

}
