import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() user: User;
  @Input() online: UserOnline[];
  @Output() selected = new EventEmitter<string>();
  slides: UserSlide[];
  slideOpts = FRIENDS_SLIDES_OPTS

  constructor(public themeSrv: ThemeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.online.currentValue?.length > 0) {
      this.createSlides();
    }
  }

  private createSlides(): void {
    this.slides = this.user.
                   friends?.map(f => (
                     {
                       user: f, 
                       selected: false, 
                       online: this.online?.find(
                         o => o.user === f._id)?.online || false
                    })).sort(f => f.online ? -1 : 1) || [];
    this.didLoad();
  }

  public didLoad(): void {
    this.slider.update();
  }

  public pick(slide: UserSlide, index: number): void {
    this.slides.map(u => u.selected = false);
    slide.selected = true;
    this.slider.slideTo(index);
    this.selected.emit(slide.user._id);
  }

}
