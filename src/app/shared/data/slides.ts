import { CustomSlide } from '../interfaces/interfaces';

export const CREATE_SLIDES: CustomSlide[] = [
  {
    image: 'assets/img/slides/create/slide1.svg',
    message: 'SLIDES.CREATE.FIRST'
  },
  {
    image: 'assets/img/slides/create/slide2.svg',
    message: 'SLIDES.CREATE.SECOND'
  },
  {
    image: 'assets/img/slides/create/slide3.svg',
    message: 'SLIDES.CREATE.THIRD'
  },
  {
    image: 'assets/img/slides/create/slide4.svg',
    message: 'SLIDES.CREATE.FOURTH'
  },
  {
    image: 'assets/img/slides/create/slide5.svg',
    message: 'SLIDES.CREATE.FIFTH'
  },
  {
    image: 'assets/img/slides/create/slide6.svg',
    message: 'SLIDES.CREATE.SIXTH'
  }
];

export const INTRO_SLIDES: CustomSlide[] = [ 
  {
    image: 'assets/img/slides/create/slide1.svg',
    message: 'SLIDES.INTRO.FIRST'
  },
  {
    image: 'assets/img/slides/intro/slide1.svg',
    message: 'SLIDES.INTRO.SECOND'
  },
  {
    image: 'assets/img/slides/create/slide3.svg',
    message: 'SLIDES.INTRO.THIRD'
  },
  {
    image: 'assets/img/slides/intro/slide2.svg',
    message: 'SLIDES.INTRO.FOURTH'
  },
  {
    image: 'assets/img/slides/intro/slide3.svg',
    message: 'SLIDES.INTRO.FIFTH'
  },
  {
    image: 'assets/img/slides/create/slide5.svg',
    message: 'SLIDES.INTRO.SIXTH'
  }
];

export const FRIENDS_SLIDES_OPTS = {
  initialSlide: 0,
  slidesPerView: 5.3,
  zoom: false,
  speed: 300,
  spaceBetween: 8,
  centeredSlides: true,
  centeredSlidesBounds: true,
  breakpoints: {
    400: {
      slidesPerView: 5.8
    },
    500: {
      slidesPerView: 6.7
    },
    640: {
      slidesPerView: 7.3
    },
    750: {
      slidesPerView: 8.6
    },
    900: {
      slidesPerView: 10.3
    },
    993: {
      slidesPerView: 12.3
    }
  }
};

