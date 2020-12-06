import { Component, Input, OnInit } from '@angular/core';
import { LOREM } from '@shared/data/create';
import { Index } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})

export class IndexComponent implements OnInit {

  @Input() index: Index[];
  markdown: string;
  lorem = LOREM;

  constructor() { }

  ngOnInit() {
    this.createMarkdown();
  }

  private createMarkdown(): void {
    this.markdown = this.index.map(
      i => '## ' + i.title + ' \n' + this.lorem + ' \n')
    .join('');
  }

}
