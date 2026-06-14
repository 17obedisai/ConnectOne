import api from '@/services/api';

export const pushSupported = () =>
  typeof navigator !== 'undefined' && 'serviceWorker' in navigator &&
  'PushManager' in window && 'Notification' in window;

// iOS solo permite push si la app está INSTALADA (añadida a inicio).
export const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
};

export const getPushSubscription = async () => {
  if (!pushSupported()) return null;
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return null;
  return reg.pushManager.getSubscription();
};

// Activa las notificaciones: pide permiso, se suscribe y guarda en el backend.
export const subscribePush = async () => {
  if (!pushSupported()) throw new Error('unsupported');
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) throw new Error('no-sw'); // el SW solo existe en producción/instalada

  const permiso = await Notification.requestPermission();
  if (permiso !== 'granted') throw new Error('denied');

  const { data } = await api.get('/push/publicKey');
  if (!data.configured || !data.publicKey) throw new Error('not-configured');

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(data.publicKey)
    });
  }
  await api.post('/push/subscribe', { subscription: sub.toJSON() });
  return true;
};

export const unsubscribePush = async () => {
  const sub = await getPushSubscription();
  if (sub) {
    await api.post('/push/unsubscribe', { endpoint: sub.endpoint }).catch(() => {});
    await sub.unsubscribe().catch(() => {});
  }
};
