import { Component, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';
import { User, UserOnline, UserSlide } from '@shared/interfaces/interfaces';
import { IonSlides } from '@ionic/angular';
import { ThemeService } from '@services/theme/theme.service';
import { FRIENDS_SLIDES_OPTS } from '@shared/data/slides';

@Component({
  selector: 'app-friends-slides',
  templateUrl: './friends-slides.component.html',
  styleUrls: ['./friends-slides.component.scss'],
})

export class FriendsSlidesComponent implements OnChanges {

  @ViewChild('slider') slider: IonSlides;
  @Input() friends: User[];
  @Input() online: UserOnline[];
  @Output() selected = new EventEmitter<string>();
  @Input() params: string;
  slides: UserSlide[];
  slideOpts = FRIENDS_SLIDES_OPTS;
  index = 0;

  constructor(
    public themeSrv: ThemeService,
  ) { }

  ngOnChanges() {
    setTimeout(() => {
      this.createSlides();
    }, 666);
  }

  private createSlides(): void {
    this.slides = this.friends?.map((f, i) => (
                     {
                       user: f, 
                       selected: this.params === f._id ? 
                                 this.slideToIndex(i) : false, 
                       online: f.showOnline && (
                         this.online?.find(
                          o => o.user === f._id)?.online || false
                       )
                    })).sort(f => f.online ? -1 : 1) || [];
    this.didLoad();
  }

  public async didLoad(): Promise<void> {
    if (this.slider) { 
      await this.slider.update();
      this.params ? 
      this.slider.slideTo(this.index) :
      this.slider.slideTo(0);
    }
  }

  private slideToIndex(index: number): boolean {
    this.index = index;
    return true;
  }

  public pick(slide: UserSlide, index: number): void {
    this.slides.map(u => u.selected = false);
    slide.selected = true;
    this.slider.slideTo(index);
    this.selected.emit(slide.user._id);
  }

}
