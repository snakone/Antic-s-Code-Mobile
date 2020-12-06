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
