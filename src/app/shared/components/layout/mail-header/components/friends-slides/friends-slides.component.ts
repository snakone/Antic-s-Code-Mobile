import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User, UserSlide } from '@shared/interfaces/interfaces';
import { IonSlides } from '@ionic/angular';
import { ThemeService } from '@services/theme/theme.service';
import { FRIENDS_SLIDES_OPTS } from '@shared/data/slides';

@Component({
  selector: 'app-friends-slides',
  templateUrl: './friends-slides.component.html',
  styleUrls: ['./friends-slides.component.scss'],
})

export class FriendsSlidesComponent implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  @Input() user: User;
  @Output() selected = new EventEmitter<string>();
  slides: UserSlide[];
  slideOpts = FRIENDS_SLIDES_OPTS

  constructor(public themeSrv: ThemeService) { }

  ngOnInit() {
    this.slides = this.user.friends?.map(f => ({user: f, selected: false})) || [];
  }

  public didLoad(e): void {
    this.slider.update();
  }

  public pick(slide: UserSlide, index: number): void {
    this.slides.map(u => u.selected = false);
    slide.selected = true;
    this.slider.slideTo(index);
    this.selected.emit(slide.user.name);
  }

}
