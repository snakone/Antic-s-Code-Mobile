import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { FormsFacade } from '@store/forms/forms.facade';

@Component({
  selector: 'app-form-create-preview',
  templateUrl: './form-create-preview.component.html',
  styleUrls: ['./form-create-preview.component.scss'],
})

export class FormCreatePreviewComponent implements OnInit {

  @Input() saved: boolean;

  constructor(
    private nav: NavController,
    private formsFacade: FormsFacade,
    private ls: StorageService
  ) { }

  ngOnInit() {
  }

  public back(): void {
    this.formsFacade.action('reset', true);
    this.ls.setKey('draftForm', null);
    this.nav.navigateRoot('/home');
  }

}
