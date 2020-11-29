import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Draft, Article } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarkDownComponent implements OnInit {

  @Input() content$: Observable<Article | Draft>;
  edited = false;

  constructor() { }

  ngOnInit() { }

  public changed(): void {
    if (this.edited) { return; }
    this.edited = true;
  }

}
