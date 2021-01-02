import { Component, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';
import { User, UserOnline, UserSlide } from '@shared/interfaces/interfaces';
import { IonSlides } from '@ionic/angular';
import { ThemeService } from '@services/theme/theme.service';
import { FRIENDS_SLIDES_OPTS } from '@shared/data/slides';
import { StorageService } from '@services/storage/storage.service';
import { UserService } from '@services/user/user.service';

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
  slides: UserSlide[];
  slideOpts = FRIENDS_SLIDES_OPTS

  constructor(
    public themeSrv: ThemeService,
    private ls: StorageService,
    private userSrv: UserService
  ) { }

  ngOnChanges() {
    setTimeout(() => {
      this.createSlides();
    }, 2000);
  }

  private createSlides(): void {
    this.slides = this.friends?.map(f => (
                     {
                       user: f, 
                       selected: false, 
                       online: (
                         this.online?.find(
                          o => o.user === f._id)?.online || false
                         ) &&
                         (
                           this.userSrv.getUser()._id === f._id && 
                           this.ls.get('showOnline')
                         )
                    })).sort(f => f.online ? -1 : 1) || [];
    this.didLoad();
  }

  public didLoad(): void {
    if (this.slider) { this.slider.update(); }
  }

  public pick(slide: UserSlide, index: number): void {
    this.slides.map(u => u.selected = false);
    slide.selected = true;
    this.slider.slideTo(index);
    this.selected.emit(slide.user._id);
  }

}
