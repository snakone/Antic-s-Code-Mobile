import { Component, OnInit, ViewChild, Renderer2, Input, OnDestroy } from '@angular/core';
import { Category, CategoryAvatar } from '@shared/interfaces/interfaces';
import { CATEGORY_AVATARS,  } from '@shared/shared.data';
import { ThemeService } from '@services/theme/theme.service';
import { IonSlides } from '@ionic/angular';
import { ContentService } from '@services/content/content.service';

@Component({
  selector: 'app-form-create-category',
  templateUrl: './form-create-category.component.html',
  styleUrls: ['./form-create-category.component.scss']
})

export class FormCreateCategoryComponent implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;
  @Input() categories: Category[];
  @Input() count: number;
  @Input() categoryCount: object;
  @Input() likes: number;
  @Input() foo: any[];
  avatars = CATEGORY_AVATARS;
  selected: CategoryAvatar;
  desc: Element;

  sliderOpts = {
    zoom: false,
    slidesPerView: 5.5,
    spaceBetween: 16,
    centeredSlides: true,
    centeredSlidesBounds: true
  };

  constructor(
    public themeSrv: ThemeService,
    private render: Renderer2,
    private contentSrv: ContentService
  ) { }

  ngOnInit() {
    this.desc = document.querySelector('.cat-description');
    setTimeout(() => {
      this.setAvatar();
    }, 1000);
  }

  public async pick(
    category: CategoryAvatar,
    index: number
  ): Promise<void> {
    if (this.selected) {
      if (index === this.selected.index) { return; }
      index < this.selected.index ? this.fadeBack() : this.fadeNext();
    } else { this.fadeNext(); }
    this.avatars.forEach(x => x.selected = false);
    category.selected = true;
    this.slides.slideTo(index, 200);
    setTimeout(() => {
      this.selected = category;
      this.contentSrv.selected = category;
    }, 200);
  }

  private setAvatar(): void {
    if (!this.contentSrv.selected) { return; }
    this.avatars.forEach(x => {
      if (x.name === this.contentSrv.selected.name) {
        x.selected = true;
        this.selected = x;
        this.slides.slideTo(x.index - 1);
      } else { x.selected = false; }
    });
  }

  private fadeNext(): void {
    this.render.removeClass(this.desc, 'fadeInLeft');
    this.render.removeClass(this.desc, 'fadeInRight');
    this.render.addClass(this.desc, 'fadeOutLeft');
    setTimeout(() => {
      this.render.removeClass(this.desc, 'fadeOutLeft');
      this.render.addClass(this.desc, 'fadeInRight');
    }, 200);
  }

  private fadeBack(): void {
    this.render.removeClass(this.desc, 'fadeInLeft');
    this.render.removeClass(this.desc, 'fadeInRight');
    this.render.addClass(this.desc, 'fadeOutRight');
    setTimeout(() => {
      this.render.removeClass(this.desc, 'fadeOutRight');
      this.render.addClass(this.desc, 'fadeInLeft');
    }, 200);
  }

  ngOnDestroy() {
    this.avatars.forEach(x => x.selected = false);
  }


}
