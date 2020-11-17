import { MenuLink, NotificationPayload } from './interfaces/interfaces';

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

