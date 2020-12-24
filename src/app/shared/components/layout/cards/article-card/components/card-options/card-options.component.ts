import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URI } from '@app/app.config';
import { PDFService } from '@core/native/services/pdf.service';
import { ShareService } from '@core/native/services/share.service';
import { CrafterService } from '@services/crafter/crafter.service';
import { Article } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-card-options',
  templateUrl: './card-options.component.html',
  styleUrls: ['./card-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardOptionsComponent implements OnInit {

  @Input() article: Article;

  constructor(
    private router: Router,
    private crafter: CrafterService,
    private shareSrv: ShareService,
    private pdfMaker: PDFService
  ) { }

  ngOnInit() {}

  public goTo(option: string): void {
    switch(option) {
      case 'detail': this.detail()
       break;
      case 'share': this.share()
       break;
      case 'pdf': this.pdf()
       break;
    }
    this.crafter.close();
  }

  private detail(): void {
    this.router.navigateByUrl('/detail/' + this.article.slug);
  }

  private async share(): Promise<void> {
    const data: ShareData = {
      title: this.article.title,
      url: `${URI}/article/${this.article.slug}`,
      text: 'Antic\'s Code - ' + this.article.title 
    }
    await this.shareSrv.share(data);
  }

  private async pdf(): Promise<void> {
    await this.crafter.loader();
    this.pdfMaker.createPDF(this.article);
  }

}
