import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HelpComponent } from '@pages/login/components/help/help.component';
import { CrafterService } from '@services/crafter/crafter.service';
import { Article } from '@shared/interfaces/interfaces';

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

  constructor(private crafter: CrafterService) { }

  public options(e: any): void {
    this.crafter.pop(HelpComponent, null, 'share-pop', e);
  }

}
