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
    title: 'MAIL',
    icon: 'mail-outline',
    route: '/mail'
  },
  {
    title: 'USERS',
    icon: 'people-outline',
    route: '/users'
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
