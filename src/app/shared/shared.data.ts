import { CategoryAvatar, CustomSlide, HeaderIcons, Item, MenuLink, NotificationPayload, Settings } from './interfaces/interfaces';

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
    title: 'MY.ARTICLES',
    icon: 'document-text-outline',
    route: '/home'
  },
  {
    title: 'PROFILE',
    icon: 'person-circle-outline',
    route: '/profile'
  }
];

export const HOME_HEADER: HeaderIcons[] = [
  { icon: 'document-text-outline', route: '/home' },
  { icon: 'file-tray-full-outline', route: '/home/drafts' }
];

export const PROFILE_HEADER: HeaderIcons[] = [
  { icon: 'logo-octocat', route: '/profile' },
  { icon: 'ribbon-outline', route: '/profile/stats' }
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

export const LANGS: Settings[] = [
  { value: 'es', name: 'SPANISH' },
  { value: 'en', name: 'ENGLISH' }
];

export const YESNOT: Settings[] = [
  { value: true, name: 'YES' },
  { value: false, name: 'NO' }
];

export const FORM_CREATE_INTRO: Item[] = [
  { title: 'FORMS.CREATE.INTRO.ONE', icon: 'code-slash-outline' },
  { title: 'FORMS.CREATE.INTRO.TWO', icon: 'server-outline' },
  { title: 'FORMS.CREATE.INTRO.THREE', icon: 'color-wand-outline' },
  { title: 'FORMS.CREATE.INTRO.FOUR', icon: 'help-circle-outline' },
  { title: 'FORMS.CREATE.INTRO.FIVE', icon: 'document-text-outline' }
];

export const CATEGORY_AVATARS: CategoryAvatar[] = [
  {
    name: 'Android',
    image: 'assets/img/logos/android-logo.png',
    selected: false,
    index: 0,
    message: 'CATEGORY.AVATAR.ANDROID'
  },
  {
    name: 'Angular',
    image: 'assets/img/logos/angular-logo.png',
    selected: false,
    index: 1,
    message: 'CATEGORY.AVATAR.ANGULAR'
  },
  {
    name: 'CSS',
    image: 'assets/img/logos/css-logo.png',
    selected: false,
    index: 2,
    message: 'CATEGORY.AVATAR.CSS'
  },
  {
    name: 'Deno',
    image: 'assets/img/logos/deno-logo.png',
    selected: false,
    index: 3,
    message: 'CATEGORY.AVATAR.DENO'
  },
  {
    name: 'Design',
    image: 'assets/img/logos/design-logo.png',
    selected: false,
    index: 4,
    message: 'CATEGORY.AVATAR.DESIGN'
  },
  {
    name: 'GO',
    image: 'assets/img/logos/go-logo.png',
    selected: false,
    index: 5,
    message: 'CATEGORY.AVATAR.GO'
  },
  {
    name: 'Git',
    image: 'assets/img/logos/git-logo.png',
    selected: false,
    index: 6,
    message: 'CATEGORY.AVATAR.GIT'
  },
  {
    name: 'HTML',
    image: 'assets/img/logos/html-logo.png',
    selected: false,
    index: 7,
    message: 'CATEGORY.AVATAR.HTML'
  },
  {
    name: 'Javascript',
    image: 'assets/img/logos/javascript-logo.png',
    selected: false,
    index: 8,
    message: 'CATEGORY.AVATAR.JAVASCRIPT'
  },
  {
    name: 'MongoDB',
    image: 'assets/img/logos/mongo-logo.png',
    selected: false,
    index: 9,
    message: 'CATEGORY.AVATAR.MONGO'
  },
  {
    name: 'Nodejs',
    image: 'assets/img/logos/node-logo.png',
    selected: false,
    index: 10,
    message: 'CATEGORY.AVATAR.NODE'
  },
  {
    name: 'PHP',
    image: 'assets/img/logos/php-logo.png',
    selected: false,
    index: 11,
    message: 'CATEGORY.AVATAR.PHP'
  },
  {
    name: 'Python',
    image: 'assets/img/logos/python-logo.png',
    selected: false,
    index: 12,
    message: 'CATEGORY.AVATAR.PYTHON'
  }
];


