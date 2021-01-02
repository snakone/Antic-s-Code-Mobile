import { MenuLink, Settings } from '../interfaces/interfaces';

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
  },
  {
    title: 'FRIENDS',
    icon: 'bug-outline',
    route: '/friends'
  },
  {
    title: 'MAIL',
    icon: 'mail-outline',
    route: '/mail'
  },
  {
    title: 'USERS',
    icon: 'people-outline',
    route: '/users'
  },
  {
    title: 'SHOWCASE',
    icon: 'storefront-outline',
    route: '/articles'
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
