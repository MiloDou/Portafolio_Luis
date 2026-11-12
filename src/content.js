// Datos del portafolio creativo de Luis Gómez · Witchu
(() => {
const profile = {
  name: 'Luis Gómez',
  brand: 'Witchu',
  email: 'luisdgesteban@gmail.com',
  whatsapp: '50259134624',
  phone: '5913-4624',
  instagram: 'https://instagram.com/witchu.art',
  city: 'Guatemala',
  countryCode: '502',
  role: 'Diseñador gráfico y creativo detrás de Witchu',
  tagline: 'Que te vean. Que te recuerden. Que te elijan.',
  availability: 'Disponible para proyectos & paquetes mensuales'
};

const socialKits = [
  {
    id: 'basic',
    name: 'BASIC KIT',
    count: '6 posts mensuales',
    price: 'Q850',
    numericPrice: 850,
    mark: 'B',
    recommended: false,
    subtitle: 'Presencia constante en redes',
    note: 'Contenido mensual para Instagram y Facebook, diseñado especialmente para comunicar el valor y la identidad de tu negocio.',
    details: [
      '6 posts mensuales',
      'Planificación previa del contenido',
      'Diseño listo para publicar en redes sociales'
    ]
  },
  {
    id: 'plus',
    name: 'PLUS KIT',
    count: '4 posts + 3 reels mensuales',
    price: 'Q1,200',
    numericPrice: 1200,
    mark: 'P+',
    recommended: true,
    badge: 'MÁS POPULAR',
    subtitle: 'Publicaciones y contenido vertical',
    note: 'El equilibrio ideal entre presencia gráfica y videos dinámicos para conectar con tu audiencia.',
    details: [
      '4 posts mensuales',
      '3 reels mensuales',
      'Planificación previa del contenido'
    ]
  },
  {
    id: 'premium',
    name: 'PREMIUM KIT',
    count: '4 posts + 3 reels mensuales',
    price: 'Q1,600',
    numericPrice: 1600,
    mark: 'P',
    recommended: false,
    subtitle: 'Paquete de contenido y producción avanzada',
    note: 'Mayor profundidad creativa y dirección de arte para marcas que buscan elevar su estándar visual.',
    details: [
      '4 posts mensuales',
      '3 reels mensuales',
      'Planificación previa del contenido'
    ]
  },
  {
    id: 'influencer',
    name: 'INFLUENCER KIT',
    count: '4 reels mensuales',
    price: 'Q2,000',
    numericPrice: 2000,
    mark: 'I',
    recommended: false,
    subtitle: 'Contenido vertical de alto impacto',
    note: 'Formato vertical enfocado en retención, dinamismo y dirección creativa para Reels y TikTok.',
    details: [
      '4 reels mensuales',
      'Planificación previa del contenido',
      'Dirección creativa'
    ]
  }
];

const serviceConditions = [
  'El pago total debe realizarse antes de crear la planificación del contenido.',
  'Las ofertas del mes o el contenido solicitado deben planificarse con antelación. Una vez aprobada la planificación y creado el material, no se permiten cambios.',
  'Cada arte adicional tiene un costo de Q100.00.',
  'La estrategia va acompañada de recomendaciones. Si no se aplican, no nos responsabilizamos por métricas bajas.',
  'Se recomienda invertir en pautas de Facebook Ads para obtener más alcance y mejores resultados.',
  'El contenido programado tiene un costo extra de Q200.',
  'Para cancelar el servicio se debe avisar 15 días antes de terminar el mes.'
];

const addOns = [
  { id: 'scheduling', name: 'Contenido programado', price: 200, label: '+Q200/mes', checked: false },
  { id: 'extraArt', name: 'Arte adicional en el mes', price: 100, label: '+Q100/arte', checked: false }
];

window.portfolioData = { profile, socialKits, serviceConditions, addOns };
})();
