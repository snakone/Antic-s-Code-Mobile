import { Component, OnInit, Input } from '@angular/core';
import { Draft, Article } from '@shared/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})

export class MarkDownComponent implements OnInit {

  @Input() content$: Observable<Article | Draft>;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  public close(): void {
    this.modalCtrl.dismiss();
  }

}
