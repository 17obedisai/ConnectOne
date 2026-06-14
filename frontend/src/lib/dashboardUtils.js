// src/lib/dashboardUtils.js
// Utilidades vivas del dashboard: persistencia de timers y formato de tiempo.

// ============================================
// PERSISTENCIA DE TIMERS (Modo Focus / Ayuno)
// ============================================
export const TimerPersistence = {
  save: (type, data) => {
    const timerData = { ...data, savedAt: Date.now() };
    localStorage.setItem(`timer_${type}`, JSON.stringify(timerData));
  },

  load: (type) => {
    const saved = localStorage.getItem(`timer_${type}`);
    if (!saved) return null;
    const data = JSON.parse(saved);
    const elapsed = Math.floor((Date.now() - data.savedAt) / 1000);
    if (data.endTime) {
      const remaining = Math.max(0, Math.floor((data.endTime - Date.now()) / 1000));
      return { ...data, remaining, elapsed };
    }
    return data;
  },

  clear: (type) => {
    localStorage.removeItem(`timer_${type}`);
  },

  hasActive: (type) => {
    const data = TimerPersistence.load(type);
    if (!data) return false;
    if (data.endTime && Date.now() < data.endTime) return true;
    return data.active;
  }
};

// ============================================
// UTILIDADES GENERALES
// ============================================
export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default { TimerPersistence, formatTime };
