import { CustomSlide, MenuLink, NotificationPayload } from './interfaces/interfaces';

export const CATEGORIES: string[] = [
 'HTML',
 'CSS',
 'Javascript',
 'Angular',
 'Nodejs',
 'MongoDB',
 'Android',
 'Design',
 'GO',
 'Python',
 'Git',
 'Antic\'s',
 'Deno',
 'PHP'
];

export const TAGS: string[] = [
 'Consola',
 'Desarrollo',
 'Diseño',
 'Material',
 'Frontend',
 'Backend',
 'Typescript',
 'Database',
 'Mobile',
 'Ionic',
 'Config',
 'Git',
 'Antic\'s'
];

export const LEVELS: string[] = [
 'LEVEL.BASIC',
 'LEVEL.MEDIUM',
 'LEVEL.ADVANCED'
];

export const BADGES: string[] = [
 'BADGE.NEW',
 'BADGE.PRO',
 'BADGE.HOT'
];

export const NEW_USER_PUSH: NotificationPayload = {
  body: 'Nuevo Usuario Registrado',
  requireInteraction: false,
  actions: [
    { action: 'explore', title: 'Aceptar' }
  ],
  broadcast: true,
  admin: false,
};

export const MENU: MenuLink[] = [
  {
    title: 'PROFILE',
    icon: 'person-circle-outline',
    route: '/profile'
  },
  {
    title: 'SETTINGS',
    icon: 'settings-outline',
    route: '/settings'
  }
];

export const CREATE_SLIDES: CustomSlide[] = [
  {
    image: 'assets/img/slides/slide1.svg',
    message: 'SLIDES.CREATE.FIRST'
  },
  {
    image: 'assets/img/slides/slide2.svg',
    message: 'SLIDES.CREATE.SECOND'
  },
  {
    image: 'assets/img/slides/slide3.svg',
    message: 'SLIDES.CREATE.THIRD'
  },
  {
    image: 'assets/img/slides/slide4.svg',
    message: 'SLIDES.CREATE.FOURTH'
  },
  {
    image: 'assets/img/slides/slide5.svg',
    message: 'SLIDES.CREATE.FIFTH'
  },
  {
    image: 'assets/img/slides/slide6.svg',
    message: 'SLIDES.CREATE.SIXTH'
  }
];

