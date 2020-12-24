import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-user-slides',
  templateUrl: './user-slides.component.html',
  styleUrls: ['./user-slides.component.scss'],
})

export class UserSlidesComponent implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  @Output() selected = new EventEmitter<string>();
  users = [
    {name: 'Allison', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false},
    {name: 'Rebeca', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false},
    {name: 'Evelyn', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: true},
    {name: 'Caitlyn', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false},
    {name: 'Garen', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: true},
    {name: 'Kassadin', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false},
    {name: 'Reiva', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false},
    {name: 'Amumu', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: true},
    {name: 'Tryndamere', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false},
    {name: 'Gragas', avatar: 'https://anticscode.netlify.app/assets/img/logo.png', selected: false, online: false}
  ];

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 5.3,
    zoom: false,
    speed: 300,
    spaceBetween: 8,
    centeredSlides: true,
    centeredSlidesBounds: true,
    breakpoints: {
      640: {
        slidesPerView: 7.3
      },
      900: {
        slidesPerView: 8.3
      },
      993: {
        slidesPerView: 10.3
      }
    }
  };

  constructor() { }

  ngOnInit() {}

  public pick(user:any, index: number): void {
    this.users.map(u => u.selected = false);
    user.selected = true;
    this.slider.slideTo(index);
    this.selected.emit(user.name);
  }

}
