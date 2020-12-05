import { NotificationPayload } from '../interfaces/interfaces';

export const NEW_USER_PUSH: NotificationPayload = {
  body: 'Nuevo Usuario Registrado',
  requireInteraction: false,
  actions: [
    { action: 'explore', title: 'Aceptar' }
  ],
  broadcast: true,
  admin: false,
};

export const LIKE_PUSH: NotificationPayload = {
  body: 'Nuevo Like en tu Artículo',
  requireInteraction: false,
  actions: [
    { action: 'explore', title: '¡Genial!' }
  ],
  data: {},
  broadcast: false,
  admin: false,
};
