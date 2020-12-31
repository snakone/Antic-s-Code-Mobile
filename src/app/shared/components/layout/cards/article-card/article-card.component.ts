import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CrafterService } from '@services/crafter/crafter.service';
import { Article } from '@shared/interfaces/interfaces';
import { CardOptionsComponent } from './components/card-options/card-options.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticleCardComponent {

  @Input() article: Article;
  @Input() index: number;
  @Input() dark: boolean;
  @Input() public: boolean;

  constructor(private crafter: CrafterService) { }

  public options(): void {
    this.crafter.pop(CardOptionsComponent, {
      article: this.article
    }, 'card-options');
  }

}
