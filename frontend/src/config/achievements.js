export const achievementsConfig = [
  {
    id: 'en_marcha',
    name: '¡En Marcha!',
    description: 'Completa actividades 3 días seguidos',
    icon: '/images/logros/en-marcha.png',
    condition: (stats) => stats.streak >= 3,
  },
  {
    id: 'semana_perfecta',
    name: 'Semana Perfecta',
    description: 'Completa actividades 7 días seguidos',
    icon: '/images/logros/semana-perfecta.png',
    condition: (stats) => stats.streak >= 7,
  },
  {
    id: 'compromiso_total',
    name: 'Compromiso Total',
    description: 'Mantén una racha de 30 días',
    icon: '/images/logros/compromiso-total.png',
    condition: (stats) => stats.streak >= 30,
  },
  // Añade más logros aquí
];
