// Silent notification utilities for clinical environments (HUV)
// Avoids noisy alerts that could disrupt patient therapy or consultations

export const triggerHapticFeedback = (pattern: number[] = [70, 40, 70]) => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignored if device doesn't support or disallows vibration
    }
  }
};

export const requestSilentNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  try {
    if (Notification.permission === 'granted') {
      return true;
    }
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
  }
  return false;
};

export const sendSilentBrowserNotification = (title: string, body: string) => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        silent: true, // Crucial: hospital environment silent mode
        tag: 'pausa-activa-huv',
      });
      return true;
    } catch (err) {
      console.warn('Silent notification error:', err);
    }
  }
  return false;
};
