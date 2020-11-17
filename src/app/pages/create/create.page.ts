import { Component, OnInit } from '@angular/core';
import { flipOpts } from '@app/shared/swiper';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})

export class CreatePage implements OnInit {

  slideOpts = {
    effect: 'flip',
    ...flipOpts,
    flipEffect: {
      slideShadows: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
