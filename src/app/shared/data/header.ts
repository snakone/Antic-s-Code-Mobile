import { HeaderIcons } from '../interfaces/interfaces';

export const HOME_HEADER: HeaderIcons[] = [
  { icon: 'document-text-outline', route: '/home' },
  { icon: 'file-tray-full-outline', route: '/home/drafts' }
];

export const PROFILE_HEADER: HeaderIcons[] = [
  { icon: 'logo-octocat', route: '/profile' },
  { icon: 'ribbon-outline', route: '/profile/stats' }
];
