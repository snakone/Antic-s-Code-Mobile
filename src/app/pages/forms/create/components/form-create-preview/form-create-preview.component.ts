import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-create-preview',
  templateUrl: './form-create-preview.component.html',
  styleUrls: ['./form-create-preview.component.scss'],
})

export class FormCreatePreviewComponent implements OnInit {

  @Input() saved: boolean;

  constructor(private nav: NavController) { }

  ngOnInit() {}

  public back(): void {
    this.nav.navigateRoot('/home');
  }

}
