const { useState, useEffect, useRef, useMemo } = React;
const { profile = {}, socialKits = [], serviceConditions = [], addOns = [] } = window.portfolioData || {};

// Selección de piezas verificables del material entregado para el sitio.
const portfolioPosts = [
  { id: 'post-mecanica-1', title: 'Tu seguridad es primero', client: 'GM Lubricantes · Automotriz', category: 'Posts para redes', image: '/assets/posts/mecanica.png', alt: 'Publicación sobre frenos y seguridad automotriz para GM Lubricantes', note: 'Campaña de mantenimiento preventivo y seguridad vial.', tools: ['Composición gráfica', 'Canva Pro', 'Photoshop'] },
  { id: 'post-abogada-1', title: 'Asesoría legal preventiva', client: 'Servicios legales', category: 'Posts para redes', image: '/assets/posts/abogada-1.png', alt: 'Publicación de asesoría legal', note: 'Diseño para comunicar seriedad y confianza profesional.', tools: ['Canva Pro', 'Tipografía editorial'] },
  { id: 'post-mecanica-aceite', title: 'Cuidado y rendimiento de motor', client: 'GM Lubricantes · Producto', category: 'Posts para redes', image: '/assets/posts/mecanica-aceite.jpg', alt: 'Publicación de aceite de motor', note: 'Pieza comercial enfocada en beneficios de producto.', tools: ['Retoque de producto', 'Canva Pro'] },
  { id: 'post-abogada-2', title: 'Traspaso de vehículo en 30 minutos', client: 'Trámites ágiles', category: 'Posts para redes', image: '/assets/posts/abogada-2.png', alt: 'Publicación de traspaso de vehículos', note: 'Mensaje directo para explicar un trámite con claridad.', tools: ['Canva Pro', 'Diagramación'] },
  { id: 'post-psicologia-1', title: 'Para estar en paz', client: 'Psicología y salud mental', category: 'Posts para redes', image: '/assets/posts/psicologia-1.jpeg', alt: 'Ilustración para redes sobre bienestar emocional', note: 'Ilustración cálida para conectar con la comunidad.', tools: ['Ilustración digital', 'Canva Pro'] },
  { id: 'post-cafe', title: 'Café de especialidad', client: 'Gastronomía', category: 'Posts para redes', image: '/assets/posts/cafe.png', alt: 'Publicación para café de especialidad', note: 'Dirección de arte con una atmósfera cálida y sensorial.', tools: ['Composición visual', 'Canva Pro'] },
  { id: 'post-mecanico-2', title: 'Mantenimiento preventivo', client: 'Taller automotriz', category: 'Posts para redes', image: '/assets/posts/mecanico-2.png', alt: 'Publicación de mantenimiento automotriz', note: 'Pieza de captación con foco en seguridad y revisión.', tools: ['Diseño publicitario', 'Canva Pro'] },
  { id: 'post-psicologia-2', title: 'Gestión emocional y bienestar', client: 'Psicología clínica', category: 'Posts para redes', image: '/assets/posts/psicologia-2.jpeg', alt: 'Publicación educativa de bienestar emocional', note: 'Contenido educativo para comunicar el trabajo terapéutico.', tools: ['Diseño editorial', 'Canva Pro'] },
  { id: 'post-grooming', title: 'Cuidado y estética canina', client: 'Mascotas y grooming', category: 'Posts para redes', image: '/assets/posts/grooming.png', alt: 'Publicación de cuidado de mascotas', note: 'Estilo fresco y cercano para dueños de mascotas.', tools: ['Ilustración vectorial', 'Canva Pro'] },
  { id: 'post-psicologia-3', title: 'Espacio de escucha', client: 'Psicología y terapia', category: 'Posts para redes', image: '/assets/posts/psicologia-3.jpeg', alt: 'Publicación sobre acompañamiento psicológico', note: 'Tono reflexivo y sereno para invitar a conocer el servicio.', tools: ['Tipografía editorial', 'Canva Pro'] },
  { id: 'post-redes-feed', title: 'Estrategia visual para feeds', client: 'Redes sociales', category: 'Posts para redes', image: '/assets/posts/redes.png', alt: 'Composición de publicaciones para redes', note: 'Composición de publicaciones con una identidad visual coherente.', tools: ['Canva Pro', 'Photoshop'] }
];

const portfolioReels = [
  {
    file: 'reel-01',
    title: 'Campaña Automotriz',
    kind: 'Reel vertical',
    client: 'GM Lubricantes',
    description: 'Cortes ágiles, gancho auditivo potente y tipografía cinética pensada para frenar el scroll en Instagram.'
  },
  {
    file: 'reel-02',
    title: 'Cuidado y Mundo Mascotas',
    kind: 'Reel vertical',
    client: 'Mascotas & Bienestar',
    description: 'Narrativa visual tierna y dinámica con ritmo de edición rápido y subtítulos destacados.'
  },
  {
    file: 'reel-03',
    title: 'Tipografía Cinética en Video',
    kind: 'Motion & Ganchos',
    client: 'Creativo & Tendencias',
    description: 'Animación tipográfica sincronizada con música para comunicar mensajes clave con fuerza visual.'
  },
  {
    file: 'reel-04',
    title: 'Humor & Gato Viral',
    kind: 'Reel viral',
    client: 'Entretenimiento & Marca',
    description: 'Estructura narrativa orientada a la retención de los primeros 3 segundos y viralidad orgánica.'
  },
  {
    file: 'reel-05',
    title: 'En la Calle · Yapping & Vlog',
    kind: 'Vlog creativo',
    client: 'Comunidad & Creadores',
    description: 'Formato vlog con interacción espontánea, micrófono en mano y dinamismo de edición urbana.'
  },
  {
    file: 'reel-06',
    title: 'Conversación & Storytelling',
    kind: 'Reel vertical',
    client: 'Branding Personal',
    description: 'Edición con cortes de salto, zooms estratégicos y refuerzos gráficos que mantienen la atención.'
  },
  {
    file: 'reel-07',
    title: 'Motion Ilustrado',
    kind: 'Animación & Personajes',
    client: 'Witchu Art',
    description: 'Fusión de ilustración con motion graphics para crear contenidos memorables con personalidad artística.'
  },
  {
    file: 'crepepes-aftereffects',
    title: 'Crepepes After Effects',
    kind: 'Motion Graphics',
    client: 'Animación publicitaria',
    square: true,
    description: 'Composición y animación digital en Adobe After Effects con dinamismo de marca y acabados fluidos.'
  }
];

const portfolioIdentityMusic = [
  {
    id: 'jc-presskit',
    title: 'Portada de Press Kit',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-presskit.png',
    alt: 'Portada del press kit de José Carlos con logotipo naranja sobre fondo oscuro',
    note: 'Dirección de arte, paleta cálida y logotipo para el músico guatemalteco José Carlos.'
  },
  {
    id: 'jc-en-vivo',
    title: 'José Carlos en vivo',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-en-vivo.png',
    alt: 'Pieza promocional de José Carlos en vivo con guitarra y fechas de conciertos',
    note: 'Afiche promocional para conciertos en vivo y gira acústica.'
  },
  {
    id: 'jc-vivo-como-quiero',
    title: 'Vivo como quiero · Single',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-vivo-como-quiero.png',
    alt: 'Pieza promocional del lanzamiento musical Vivo como quiero',
    note: 'Arte de lanzamiento de sencillo para plataformas digitales y redes sociales.'
  },
  {
    id: 'jc-tarjeta-frente',
    title: 'Tarjeta de presentación · Frente',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-tarjeta.png',
    alt: 'Frente de la tarjeta de presentación de José Carlos con monograma naranja',
    note: 'Monograma personalizado y acabados sobrios para relaciones públicas y medios.'
  },
  {
    id: 'jc-tarjeta-reverso',
    title: 'Tarjeta de presentación · Reverso',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-tarjeta-reverso.png',
    alt: 'Reverso de la tarjeta de presentación de José Carlos',
    note: 'Diagramación tipográfica limpia con datos de contacto y redes oficiales.'
  },
  {
    id: 'jc-presskit-portada-2',
    title: 'Press Kit · Portada alternativa',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-presskit-portada-2.png',
    alt: 'Segunda portada del press kit de José Carlos',
    note: 'Variación de portada orientada a programadores de festivales y prensa cultural.'
  },
  {
    id: 'jc-presskit-contenido-1',
    title: 'Press Kit · Perfil y biografía',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-presskit-contenido-1.png',
    alt: 'Página de perfil del press kit de José Carlos',
    note: 'Diseño editorial con jerarquía clara de trayectoria artística y logros.'
  },
  {
    id: 'jc-presskit-contenido-2',
    title: 'Press Kit · Repertorio musical',
    category: 'Identidad de marca',
    image: '/assets/identity/jose-carlos-presskit-contenido-2.png',
    alt: 'Página de repertorio del press kit de José Carlos',
    note: 'Estructura de catálogo de temas y ficha técnica de espectáculos.'
  }
];

const portfolioIdentityMarks = [
  {
    id: 'ss-logo',
    title: 'Smash & Stamp · Logotipo',
    category: 'Identidad de marca',
    image: '/assets/identity/smash-stamp-logo.png',
    alt: 'Versiones del logotipo de Smash & Stamp Burger Co. en blanco y negro',
    note: 'Identidad tipográfica contundente y con sello callejero para marca de hamburguesas artesanales.'
  },
  {
    id: 'ss-personaje',
    title: 'Smash & Stamp · Personaje de marca',
    category: 'Identidad de marca',
    image: '/assets/identity/smash-stamp-personaje.png',
    alt: 'Personaje ilustrado de Smash & Stamp Burger Co.',
    note: 'Mascota e ilustración con actitud desenfadada que refuerza el carácter de la marca.'
  },
  {
    id: 'tukur-logo',
    title: 'Tukur Solutions · Logotipo corporativo',
    category: 'Identidad de marca',
    image: '/assets/identity/tukur-solutions-logo.png',
    alt: 'Logotipo de Tukur Solutions: búho formado con un engranaje mecánico',
    note: 'Síntesis geométrica que combina la sabiduría del búho con la ingeniería de engranajes.'
  }
];

// Obras de la rama secundaria de Ilustración ("Trazos con personalidad")
const illustrations = [
  { id: 'art-gato', title: 'Gato', image: '/assets/illustrations/gato.jpg', alt: 'Ilustración de un gato verde de ojos rosados sobre fondo azul' },
  { id: 'art-conejo', title: 'Conejo', image: '/assets/illustrations/conejo.png', alt: 'Personaje de conejo verde y amarillo sobre fondo violeta' },
  { id: 'art-anubis', title: 'Anubis', image: '/assets/illustrations/anubis.jpg', alt: 'Ilustración en tinta negra de Anubis sobre fondo blanco' },
  { id: 'art-rostro', title: 'Rostro', image: '/assets/illustrations/rostro.jpg', alt: 'Rostro ilustrado con ojos amarillos y colores rosa, verde y azul' },
  { id: 'art-perro', title: 'Retrato de perro', image: '/assets/illustrations/retrato-perro.jpg', alt: 'Retrato ilustrado de un perro' },
  { id: 'art-wolverine', title: 'Wolverine', image: '/assets/illustrations/wolverine.jpg', alt: 'Ilustración de Wolverine' },
  { id: 'art-angel', title: 'Ángel', image: '/assets/illustrations/angel.png', alt: 'Ilustración titulada Ángel' },
  { id: 'art-cementerio', title: 'Cementerio', image: '/assets/illustrations/cementerio.png', alt: 'Ilustración titulada Cementerio' },
  { id: 'art-craneo', title: 'Cráneo verde', image: '/assets/illustrations/craneo-verde.jpg', alt: 'Ilustración de un cráneo verde' },
  { id: 'art-pompom', title: 'Pompom', image: '/assets/illustrations/pompom.png', alt: 'Ilustración titulada Pompom' },
  { id: 'art-pulga', title: 'Pulga', image: '/assets/illustrations/pulga.png', alt: 'Ilustración titulada Pulga' },
  { id: 'art-ratfink', title: 'Ratfink', image: '/assets/illustrations/ratfink.jpeg', alt: 'Ilustración titulada Ratfink' },
  { id: 'art-spidey-azul', title: 'Spidey azul', image: '/assets/illustrations/spidey-azul.png', alt: 'Ilustración del personaje Spidey en azul' },
  { id: 'art-spidey-rojo', title: 'Spidey rojo', image: '/assets/illustrations/spidey-rojo.png', alt: 'Ilustración del personaje Spidey en rojo' },
  { id: 'art-mascotas', title: 'Mascotas', image: '/assets/illustrations/mascotas.jpg', alt: 'Ilustración de mascotas' }
];

const portfolioIllustrations = illustrations.map((item) => ({
  ...item,
  category: 'Ilustración',
  note: 'Ilustración original de Luis Gómez (Witchu).'
}));

// Íconos SVG
function ArrowIcon({ diagonal = false, className = '' }) {
  return (
    <svg className={`arrow-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {diagonal ? <path d="M7 17L17 7M17 7H7M17 7V17" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
    </svg>
  );
}

function Star({ className = '' }) {
  return (
    <svg className={`star-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l3.09 8.26L24 9.27l-6.91 6.01L18.18 24 12 19.77 5.82 24l1.09-8.72L0 9.27l8.91-1.01L12 0z" />
    </svg>
  );
}

function SparkleIcon({ className = '' }) {
  return (
    <svg className={`sparkle-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" />
    </svg>
  );
}

function CheckIcon({ className = '' }) {
  return (
    <svg className={`check-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WhatsAppIcon({ className = '' }) {
  return (
    <svg className={`whatsapp-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.42C8.88 7.42 8.63 7.48 8.41 7.72C8.2 7.95 7.58 8.53 7.58 9.7C7.58 10.87 8.43 12 8.55 12.16C8.67 12.31 10.22 14.71 12.63 15.75C14.63 16.61 15.04 16.44 15.48 16.4C15.92 16.36 16.9 15.82 17.11 15.24C17.32 14.65 17.32 14.15 17.26 14.04C17.2 13.94 17.04 13.88 16.8 13.76C16.55 13.64 15.34 13.05 15.11 12.97C14.88 12.88 14.72 12.84 14.56 13.08C14.4 13.31 13.93 13.88 13.79 14.04C13.64 14.2 13.5 14.22 13.26 14.1C13.01 13.97 11.96 13.63 10.72 12.53C9.75 11.67 9.1 10.6 8.97 10.37C8.85 10.14 8.96 10.01 9.08 9.89C9.2 9.77 9.34 9.58 9.48 9.42C9.62 9.26 9.67 9.14 9.76 8.99C9.85 8.83 9.81 8.69 9.75 8.57C9.69 8.45 9.2 7.27 9.04 7.42Z" />
    </svg>
  );
}

function createWhatsAppUrl(phone, message) {
  const cleanPhone = (phone || '59134624').replace(/\D/g, '');
  const target = cleanPhone.startsWith('502') ? cleanPhone : `502${cleanPhone}`;
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}

let globalToastHandler = null;
function showGlobalToast(msg) {
  if (globalToastHandler) globalToastHandler(msg);
}

function ToastContainer() {
  const [toast, setToast] = useState({ message: '', visible: false });
  useEffect(() => {
    globalToastHandler = (message) => {
      setToast({ message, visible: true });
      window.setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3200);
    };
    return () => { globalToastHandler = null; };
  }, []);
  return (
    <aside className={`toast-bubble ${toast.visible ? 'is-visible' : ''}`} role="alert" aria-live="polite">
      <SparkleIcon className="toast-sparkle" />
      <span>{toast.message}</span>
    </aside>
  );
}

// Cursor personalizado de artista
function CustomArtistCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onMove);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}

// Header de navegación con soporte para rama secundaria
function Header({ currentBranch, onNavigateBranch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (currentBranch !== 'main') {
      onNavigateBranch('main');
      window.setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a
        className="brand-mark"
        href="#inicio"
        onClick={(e) => {
          if (currentBranch !== 'main') {
            e.preventDefault();
            onNavigateBranch('main');
          }
        }}
        aria-label="Witchu por Luis Gómez, volver al inicio"
      >
        <span className="brand-dot"><img src="/assets/witchu-logo.png" alt="Witchu logo" /></span>
        <span className="brand-text">
          <strong>Witchu - Portafolio Artístico</strong>
          <small>LUIS GÓMEZ · DISEÑO, PUBLICIDAD E ILUSTRACIÓN</small>
        </span>
      </a>

      <button
        className="menu-toggle"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>

      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
        <a href="#inicio" onClick={() => handleNavClick('#inicio')}>Inicio</a>
        <a href="#servicios" onClick={() => handleNavClick('#servicios')}>Servicios</a>
        <a href="#portafolio" onClick={() => handleNavClick('#portafolio')}>Portafolio</a>
        <a href="#paquetes" onClick={() => handleNavClick('#paquetes')}>Paquetes</a>
        <a href="#proceso" onClick={() => handleNavClick('#proceso')}>Proceso</a>

        {/* Acceso a rama secundaria de Ilustración */}
        <button
          type="button"
          className={`nav-branch-pill ${currentBranch === 'illustration' ? 'is-active' : ''}`}
          onClick={() => {
            setMenuOpen(false);
            onNavigateBranch(currentBranch === 'illustration' ? 'main' : 'illustration');
          }}
          title="Abrir la rama secundaria: Ilustración artística"
        >
          <SparkleIcon className="branch-sparkle" />
          <span>{currentBranch === 'illustration' ? '← Ir a Servicios' : 'Ilustración'}</span>
        </button>

        <a href="#contacto" onClick={() => handleNavClick('#contacto')}>Contacto</a>

        <a
          className="nav-contact"
          href={createWhatsAppUrl(profile.phone, '¡Hola Luis! Vi tu portafolio y me gustaría cotizar un proyecto para mi marca.')}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          <WhatsAppIcon />
          <span>Hablemos</span>
          <ArrowIcon diagonal />
        </a>
      </nav>
    </header>
  );
}

// SECCIÓN 0: PORTADA INTERACTIVA
function InteractiveCover({ onEnter }) {
  const coverRef = useRef(null);
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onEnter, 900);
  };

  useEffect(() => {
    document.documentElement.classList.add('has-interactive-cover');
    document.body.classList.add('has-interactive-cover');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.classList.remove('has-interactive-cover');
      document.body.classList.remove('has-interactive-cover');
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const trackPointer = (event) => {
    const cover = coverRef.current;
    if (!cover) return;
    const bounds = cover.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const dx = (x - 0.5) / 0.38;
    const dy = (y - 0.56) / 0.38;
    const proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
    const eyeRangeX = Math.min(20, Math.max(8, bounds.width * 0.012));
    const eyeRangeY = Math.min(14, Math.max(6, bounds.height * 0.012));
    cover.style.setProperty('--jaw-up', `${-(6 + proximity * 10).toFixed(1)}%`);
    cover.style.setProperty('--jaw-down', `${(8 + proximity * 13).toFixed(1)}%`);
    cover.style.setProperty('--eye-x', `${((x - 0.5) * eyeRangeX * 2).toFixed(1)}px`);
    cover.style.setProperty('--eye-y', `${((y - 0.5) * eyeRangeY * 2).toFixed(1)}px`);
  };

  const resetPointer = () => {
    coverRef.current?.style.setProperty('--jaw-up', '-6%');
    coverRef.current?.style.setProperty('--jaw-down', '8%');
    coverRef.current?.style.setProperty('--eye-x', '0px');
    coverRef.current?.style.setProperty('--eye-y', '0px');
  };

  return (
    <div
      ref={coverRef}
      className={`interactive-cover${leaving ? ' is-leaving' : ''}`}
      onPointerDown={trackPointer}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      aria-label="Portada interactiva de Witchu"
    >
      <div className="cover-fill cover-fill--top" aria-hidden="true" />
      <div className="cover-fill cover-fill--bottom" aria-hidden="true" />
      <div className="cover-fill cover-fill--left" aria-hidden="true" />
      <div className="cover-fill cover-fill--right" aria-hidden="true" />
      <div className="cover-border" aria-hidden="true" />
      <span className="cover-sideword cover-sideword--left" aria-hidden="true">WITCHU</span>
      <span className="cover-sideword cover-sideword--right" aria-hidden="true">PORTAFOLIO</span>
      <div className="cover-artboard">
        <img className="cover-background" src="/assets/intro/background-hole.png" alt="" aria-hidden="true" />
        <img className="cover-jaw cover-jaw--top" src="/assets/intro/jaw-top-clear.png" alt="" aria-hidden="true" />
        <img className="cover-jaw cover-jaw--bottom" src="/assets/intro/jaw-bottom-clear.png" alt="" aria-hidden="true" />
        <img className="cover-eyes" src="/assets/intro/pupils.png" alt="" aria-hidden="true" />
        <button
          className="cover-mouth-hitbox"
          type="button"
          onClick={finish}
          aria-label="Abrir la boca y entrar al portafolio de Luis Gómez"
        >
          <span className="cover-mouth-name">Luis Gómez</span>
          <span className="cover-mouth-kind">Portafolio</span>
          <span className="cover-mouth-action">Entrar <span aria-hidden="true">↗</span></span>
        </button>
      </div>
      <span className="cover-discipline" aria-hidden="true">ARTE &amp; DISEÑO</span>
    </div>
  );
}

// SECCIÓN 1: INICIO / PRESENTACIÓN
function Hero({ onOpenIllustration }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg-glow" aria-hidden="true" />

      <div className="hero-copy">
        <h1 tabIndex={-1}>
          <span>Ideas claras.</span>
          <span>Diseño con <em>carácter.</em></span>
        </h1>

        <p className="hero-intro">
          Soy <strong>{profile.name}</strong>, diseñador gráfico y creativo detrás de <strong>{profile.brand}</strong>. Creo identidad visual, piezas para redes, videos e ilustraciones para que tu marca comunique mejor y se haga recordar.
        </p>

        <div className="hero-actions">
          <a
            className="button button--whatsapp button--lg"
            href={createWhatsAppUrl(profile.phone, '¡Hola Luis! Me interesa cotizar publicidad para redes sociales o un proyecto visual para mi marca.')}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            <span>Hablemos por WhatsApp</span>
          </a>
          <a className="button button--dark" href="#servicios">
            <span>Conocer servicios</span>
            <ArrowIcon />
          </a>
        </div>

        <aside className="hero-branch-card" aria-label="Rama secundaria de ilustración">
          <div className="branch-card-icon">
            <SparkleIcon />
          </div>
          <div className="branch-card-content">
            <span className="branch-card-eyebrow">RAMA SECUNDARIA</span>
            <h2>Trazos con personalidad</h2>
            <p>Explora mi galería de personajes, cómics originales y encargos de ilustración.</p>
          </div>
          <button
            type="button"
            className="branch-card-btn"
            onClick={onOpenIllustration}
            aria-label="Ir a la rama de Ilustración: Trazos con personalidad"
          >
            <span>Ver ilustración</span>
            <ArrowIcon diagonal />
          </button>
        </aside>

      </div>

      {/* Retrato de Luis Gómez */}
      <div className="hero-art-stage">
        <div className="hero-art-frame">
          <img
            src="/assets/foto-inicio-luis.webp"
            alt="Retrato de Luis Gómez, diseñador gráfico y creativo detrás de Witchu"
            className="hero-art hero-art--cover"
          />
        </div>
      </div>

      <div className="hero-bottom">
        <a href="#servicios" className="hero-scroll-prompt">
          <span>DESLIZA PARA CONOCER LOS SERVICIOS</span>
          <ArrowIcon className="scroll-arrow" />
        </a>
      </div>
    </section>
  );
}

// SECCIÓN 2: SERVICIOS
function Services() {
  const serviceList = [
    {
      num: '01',
      title: 'Posts publicitarios',
      desc: 'Composiciones gráficas y carruseles con ganchos visuales diseñados para comunicar con impacto, posicionar tu marca y vender.',
      href: '#portafolio'
    },
    {
      num: '02',
      title: 'Contenido vertical',
      desc: 'Formatos optimizados para Reels, TikTok y Stories que retienen la atención en los primeros segundos.',
      href: '#portafolio'
    },
    {
      num: '03',
      title: 'Manejo y administración de cuentas',
      desc: 'Gestión constante de tu presencia digital para que tu marca se mantenga activa, profesional y relevante.',
      href: '#paquetes'
    },
    {
      num: '04',
      title: 'Programación de campañas publicitarias',
      desc: 'Configuración estratégica de anuncios y pautas en Meta Ads para maximizar alcance, clicks y conversiones.',
      href: '#paquetes'
    },
    {
      num: '05',
      title: 'Dirección creativa',
      desc: 'Conceptualización de ideas, ángulos de comunicación y líneas estéticas que diferencian tu negocio de la competencia.',
      href: '#contacto'
    },
    {
      num: '06',
      title: 'Postproducción de video',
      desc: 'Edición dinámica con ritmo, efectos sonoros, subtítulos animados y colorimetría que elevan cualquier grabación.',
      href: '#portafolio'
    },
    {
      num: '07',
      title: 'Identidad de marca',
      desc: 'Logotipos, sistemas visuales, papelería y manuales de marca con carácter, legibilidad y coherencia total.',
      href: '#portafolio'
    }
  ];

  return (
    <section className="services-section reveal-section" id="servicios">
      <div className="services-intro">
        <h2>¿Qué puedo hacer<br />por tu marca?</h2>
        <p className="services-subhead"><strong>Soluciones para redes sociales</strong></p>
        <p>
          Servicios visuales y estratégicos creados para resolver necesidades reales: que te descubran, que entiendan tu propuesta y que se decidan por ti.
        </p>
        <div className="services-cta-box">
          <a href="#paquetes" className="button button--dark">
            <span>Ver paquetes mensuales</span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div className="services-list" role="list">
        {serviceList.map((svc) => (
          <a
            href={svc.href}
            key={svc.title}
            className="service-item-card"
            role="listitem"
          >
            <div className="service-item-top">
              <span className="service-number">{svc.num}</span>
              <strong>{svc.title}</strong>
              <ArrowIcon diagonal className="service-arrow" />
            </div>
            <p className="service-desc">{svc.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// Lightbox Modal para ampliar piezas de trabajo
function WorkModal({ item, onClose, onPrev, onNext }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    modalRef.current?.querySelector('.modal-close-btn')?.focus();
    return () => previousFocus?.focus();
  }, []);

  const keepFocusInside = (event) => {
    if (event.key !== 'Tab') return;
    const controls = [...modalRef.current.querySelectorAll('button, a[href]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  useEffect(() => {
    if (!item) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  const whatsappText = `¡Hola Luis! Vi la pieza "${item.title}" (${item.category || 'portafolio'}) en tu sitio y me interesa cotizar un diseño similar para mi proyecto.`;

  return (
    <div ref={modalRef} className="work-modal-backdrop" onClick={onClose} onKeyDown={keepFocusInside} role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="work-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar vista detallada">✕</button>

        <div className="modal-image-col">
          <img src={item.image} alt={item.alt || item.title} className="modal-main-image" />
          <div className="modal-nav-arrows">
            <button className="modal-nav-btn" onClick={onPrev} aria-label="Pieza anterior">← Anterior</button>
            <button className="modal-nav-btn" onClick={onNext} aria-label="Siguiente pieza">Siguiente →</button>
          </div>
        </div>

        <div className="modal-info-col">
          <div className="modal-top">
            <span className="modal-category">{item.category}</span>
            {item.client && <span className="modal-client">{item.client}</span>}
          </div>

          <h2 className="modal-title">{item.title}</h2>
          {item.note && <p className="modal-story">{item.note}</p>}

          {item.tools && item.tools.length > 0 && (
            <div className="modal-tools-box">
              <span className="box-title">HERRAMIENTAS & TÉCNICA:</span>
              <div className="modal-tool-tags">
                {item.tools.map((t) => (
                  <span className="modal-tool-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-cta-box">
            <a
              className="button button--whatsapp button--block"
              href={createWhatsAppUrl(profile.phone, whatsappText)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              <span>Pedir estilo similar en WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// SECCIÓN 3: PORTAFOLIO ("Mi trabajo")
function Portfolio() {
  const [activeTab, setActiveTab] = useState('posts');
  const [modalItem, setModalItem] = useState(null);

  const tabs = [
    { id: 'posts', label: 'Redes sociales', count: portfolioPosts.length },
    { id: 'reels', label: 'Reels y motion', count: portfolioReels.length },
    { id: 'identity', label: 'Identidad de marca', count: portfolioIdentityMusic.length + portfolioIdentityMarks.length },
    { id: 'illustrations', label: 'Ilustraciones', count: portfolioIllustrations.length }
  ];

  const handlePauseOthers = (event) => {
    const current = event.currentTarget;
    document.querySelectorAll('.video-reels-section video').forEach((vid) => {
      if (vid !== current) vid.pause();
    });
  };

  // Navegación en modal
  const allCurrentItems = useMemo(() => {
    if (activeTab === 'posts') return portfolioPosts;
    if (activeTab === 'identity') return [...portfolioIdentityMusic, ...portfolioIdentityMarks];
    if (activeTab === 'illustrations') return portfolioIllustrations;
    return [];
  }, [activeTab]);

  const currentIndex = modalItem ? allCurrentItems.findIndex((it) => it.id === modalItem.id) : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && allCurrentItems.length > 0) {
      const next = (currentIndex + 1) % allCurrentItems.length;
      setModalItem(allCurrentItems[next]);
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0 && allCurrentItems.length > 0) {
      const prev = (currentIndex - 1 + allCurrentItems.length) % allCurrentItems.length;
      setModalItem(allCurrentItems[prev]);
    }
  };

  return (
    <section className="portfolio-unified-section reveal-section" id="portafolio">
      <div className="portfolio-header">
        <h2>Mi trabajo</h2>
        <p>
          Una selección de piezas para redes, video, marcas e ilustración. Elige una categoría para recorrer el trabajo.
        </p>
      </div>

      <div className="portfolio-directory-heading">
        <span>EXPLORA POR DISCIPLINA</span>
        <span>04 CATEGORÍAS</span>
      </div>
      <div className="portfolio-category-nav" role="tablist" aria-label="Categorías de portafolio" aria-orientation="horizontal">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${tab.id}-tab`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`portfolio-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
              event.preventDefault();
              const direction = event.key === 'ArrowRight' ? 1 : -1;
              const nextIndex = (tabs.findIndex((item) => item.id === activeTab) + direction + tabs.length) % tabs.length;
              const nextTab = tabs[nextIndex];
              setActiveTab(nextTab.id);
              document.getElementById(`${nextTab.id}-tab`)?.focus();
            }}
          >
            <span className="category-tab-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="category-tab-name">{tab.label}</span>
            <span className="category-tab-bottom"><span className="tab-count-pill">{tab.count} piezas</span><ArrowIcon diagonal /></span>
          </button>
        ))}
      </div>

      {/* CATEGORÍA 1: POSTS PARA REDES */}
      {activeTab === 'posts' && (
        <div className="portfolio-tab-panel" id="posts-panel" role="tabpanel" aria-labelledby="posts-tab" tabIndex={0}>
          <div className="portfolio-panel-heading"><h3>Diseño para redes sociales</h3><p>Piezas y campañas que llevan cada mensaje a una composición visual propia.</p></div>
          <div className="portfolio-posts-grid">
            {portfolioPosts.map((post) => (
              <article
                key={post.id}
                className="portfolio-post-card"
                onClick={() => setModalItem(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setModalItem(post))}
                aria-label={`Ver detalle de: ${post.title}`}
              >
                <div className="post-card-media">
                  <img src={post.image} alt={post.alt} loading="lazy" />
                  <div className="post-card-hover-badge">
                    <span>AMPLIAR DETALLE</span>
                    <ArrowIcon diagonal />
                  </div>
                </div>
                <div className="post-card-meta">
                  <span className="post-card-client">{post.client}</span>
                  <h3>{post.title}</h3>
                  <p>{post.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORÍA 2: REELS Y MOTION */}
      {activeTab === 'reels' && (
        <div className="portfolio-tab-panel video-reels-section" id="reels-panel" role="tabpanel" aria-labelledby="reels-tab" tabIndex={0}>
          <div className="portfolio-panel-heading"><h3>Reels y motion</h3><p>Video vertical, ritmo y movimiento para contar una idea en segundos.</p></div>
          <div className="video-reels-grid">
            {portfolioReels.map((reel, index) => (
              <article className="video-reels-card" key={reel.file}>
                <div className={`video-reels-frame${reel.square ? ' video-reels-frame--square' : ''}`}>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={`/assets/reels/${reel.file}.jpg`}
                    aria-label={`${reel.kind}: ${reel.title}`}
                    onPlay={handlePauseOthers}
                  >
                    <source src={`/assets/reels/${reel.file}.mp4`} type="video/mp4" />
                    Tu navegador no soporta reproducción de video.
                  </video>
                </div>
                <div className="video-reels-caption">
                  <span className="reel-index">{String(index + 1).padStart(2, '0')} / {reel.kind}</span>
                  <h3>{reel.title}</h3>
                  <p className="reel-desc">{reel.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="portfolio-reels-cta-banner">
            <div>
              <h3>¿Necesitas videos verticales o edición dinámica para tu marca?</h3>
              <p>Creemos reels con ritmo, sonido y ganchos visuales que retengan a tu audiencia.</p>
            </div>
            <a
              className="button button--whatsapp"
              href={createWhatsAppUrl(profile.phone, '¡Hola Luis! Me interesa cotizar videos verticales / reels para mi marca.')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              <span>Cotizar reels por WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* CATEGORÍA 3: IDENTIDAD DE MARCA */}
      {activeTab === 'identity' && (
        <div className="portfolio-tab-panel" id="identity-panel" role="tabpanel" aria-labelledby="identity-tab" tabIndex={0}>
          <div className="portfolio-panel-heading"><h3>Identidad de marca</h3><p>Sistemas visuales, logotipos y piezas que construyen una presencia reconocible.</p></div>
          {/* NOTA VISIBLE OBLIGATORIA */}
          <div className="ai-disclosure-banner" role="note">
            <span className="ai-disclosure-tag">AVISO DE TRANSPARENCIA</span>
            <p><strong>Las fotografías del proyecto del músico son ilustrativas y fueron generadas con IA.</strong></p>
          </div>

          {/* Subproyecto José Carlos */}
          <div className="identity-project-block">
            <div className="identity-project-heading">
              <div>
                <span className="identity-project-index">01 / IDENTIDAD MUSICAL</span>
                <h3>José Carlos · Press Kit &amp; Redes</h3>
              </div>
              <p>Diseño editorial para prensa, piezas de lanzamiento de sencillos y tarjeta de presentación.</p>
            </div>

            <div className="identity-gallery__grid identity-gallery__grid--music">
              {portfolioIdentityMusic.map((item) => (
                <div
                  className="identity-gallery__piece"
                  key={item.id}
                  onClick={() => setModalItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && (event.preventDefault(), setModalItem(item))}
                  aria-label={`Ver detalle de: ${item.title}`}
                >
                  <span className="identity-gallery__image identity-gallery__image--music">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                  </span>
                  <span className="identity-gallery__caption">
                    {item.title}
                    <ArrowIcon diagonal />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subproyecto Marcas y Logotipos */}
          <div className="identity-project-block">
            <div className="identity-project-heading">
              <div>
                <span className="identity-project-index">02 / LOGOTIPOS &amp; PERSONAJES</span>
                <h3>Marcas con carácter</h3>
              </div>
              <p>Smash &amp; Stamp Burger Co. y Tukur Solutions: síntesis gráfica, tipografía e ilustración aplicada.</p>
            </div>

            <div className="identity-gallery__grid identity-gallery__grid--marks">
              {portfolioIdentityMarks.map((item) => (
                <div
                  className="identity-gallery__piece"
                  key={item.id}
                  onClick={() => setModalItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && (event.preventDefault(), setModalItem(item))}
                  aria-label={`Ver detalle de: ${item.title}`}
                >
                  <span className="identity-gallery__image identity-gallery__image--mark">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                  </span>
                  <span className="identity-gallery__caption">
                    {item.title}
                    <ArrowIcon diagonal />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'illustrations' && (
        <div className="portfolio-tab-panel" id="illustrations-panel" role="tabpanel" aria-labelledby="illustrations-tab" tabIndex={0}>
          <div className="portfolio-panel-heading"><h3>Ilustraciones</h3><p>Personajes, retratos y exploraciones gráficas con el sello de Witchu.</p></div>
          <div className="portfolio-posts-grid portfolio-illustrations-grid">
            {portfolioIllustrations.map((art) => (
              <article
                key={art.id}
                className="portfolio-post-card"
                onClick={() => setModalItem(art)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && (event.preventDefault(), setModalItem(art))}
                aria-label={`Ver ilustración: ${art.title}`}
              >
                <div className="post-card-media">
                  <img src={art.image} alt={art.alt} loading="lazy" />
                  <div className="post-card-hover-badge"><span>AMPLIAR DETALLE</span><ArrowIcon diagonal /></div>
                </div>
                <div className="post-card-meta"><span className="post-card-client">ILUSTRACIÓN</span><h3>{art.title}</h3></div>
              </article>
            ))}
          </div>
        </div>
      )}

      {modalItem && (
        <WorkModal
          item={modalItem}
          onClose={() => setModalItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
}

// SECCIÓN 4: PAQUETES PARA REDES SOCIALES
function Pricing() {
  const [includeScheduling, setIncludeScheduling] = useState(false);
  const [includeExtraArt, setIncludeExtraArt] = useState(false);

  const getKitWhatsAppUrl = (kit) => {
    let price = kit.numericPrice;
    let extrasList = [];
    if (includeScheduling) {
      price += 200;
      extrasList.push('Contenido programado (+Q200)');
    }
    if (includeExtraArt) {
      price += 100;
      extrasList.push('Arte adicional (+Q100)');
    }

    let msg = `¡Hola Luis! Revisé tus paquetes en el portafolio y me interesa contratar el *${kit.name}* (${kit.price}/mes).`;
    if (extrasList.length > 0) {
      msg += `\n• Extras seleccionados: ${extrasList.join(', ')}`;
      msg += `\n*Inversión mensual total estimada: Q${price}.*`;
    }
    msg += '\n¿Podemos coordinar para revisar disponibilidad e iniciar con la planificación de este mes?';
    return createWhatsAppUrl(profile.phone, msg);
  };

  return (
    <section className="pricing-section reveal-section" id="paquetes">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>Paquetes para redes sociales</h2>
          <p>
            Planes claros para dar constancia, dinamismo y profesionalismo a tu presencia digital. Elige el paquete que responda a tus necesidades actuales.
          </p>
        </div>

        {/* 4 Tarjetas de Precios Requeridas */}
        <div className="pricing-cards-grid" role="list">
          {socialKits.map((kit) => (
            <article
              key={kit.id}
              className={`pricing-card ${kit.recommended ? 'is-recommended' : ''}`}
              role="listitem"
            >
              {kit.badge && <span className="pricing-badge">{kit.badge}</span>}

              <div className="pricing-card-top">
                <span className="pricing-kit-tag">{kit.mark}</span>
                <h3 className="pricing-kit-name">{kit.name}</h3>
                <p className="pricing-kit-sub">{kit.subtitle}</p>
              </div>

              <div className="pricing-card-price">
                <span className="price-amount">{kit.price}</span>
                <span className="price-period">/ MES</span>
              </div>

              <div className="pricing-card-deliverables">
                <span className="deliverables-highlight">{kit.count}</span>
                <ul className="pricing-bullets">
                  {kit.details.map((d) => (
                    <li key={d}>
                      <CheckIcon className="bullet-check" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                className={`button button--block ${kit.recommended ? 'button--whatsapp' : 'button--dark'}`}
                href={getKitWhatsAppUrl(kit)}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon />
                <span>Pedir {kit.name}</span>
              </a>
            </article>
          ))}
        </div>

        {/* Personalizador y extras opcionales */}
        <div className="pricing-addons-panel">
          <div className="addons-title-col">
            <h4>¿Deseas agregar complementos opcionales?</h4>
            <p>Marca las opciones si deseas incluirlas en el cálculo y cotización:</p>
          </div>
          <div className="addons-checkboxes-col">
            <label className="addon-pill-label">
              <input
                type="checkbox"
                checked={includeScheduling}
                onChange={(e) => setIncludeScheduling(e.target.checked)}
              />
              <span><strong>Contenido programado</strong> (+Q200/mes)</span>
            </label>

            <label className="addon-pill-label">
              <input
                type="checkbox"
                checked={includeExtraArt}
                onChange={(e) => setIncludeExtraArt(e.target.checked)}
              />
              <span><strong>Arte adicional en el mes</strong> (+Q100/arte)</span>
            </label>
          </div>
        </div>

        {/* CTA REQUERIDO DEBAJO DE LAS TARJETAS */}
        <div className="pricing-custom-cta-box">
          <div className="custom-cta-text">
            <h3>¿Deseas un paquete o presupuesto personalizado?</h3>
            <p>Si tu negocio requiere un volumen diferente de publicaciones, producción en sitio o una combinación a tu medida, hablemos directamente.</p>
          </div>
          <a
            className="button button--whatsapp button--lg"
            href={createWhatsAppUrl(
              profile.phone,
              '¡Hola Luis! Deseo consultar por un paquete o presupuesto personalizado para las redes de mi marca.'
            )}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            <span>Hablemos por WhatsApp</span>
          </a>
        </div>

        {/* APARTADO DE CONDICIONES REQUERIDO */}
        <div className="pricing-conditions-block">
          <div className="conditions-header">
            <h4>Nota de términos y condiciones</h4>
            <p>Transparencia total para garantizar un flujo de trabajo ordenado y resultados óptimos:</p>
          </div>
          <ul className="conditions-list">
            {serviceConditions.map((cond, idx) => (
              <li key={idx}>
                <span className="condition-number">0{idx + 1}</span>
                <span className="condition-text">{cond}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// SECCIÓN 5: PROCESO, "TÚ, YO Y EL PROCESO"
function Process() {
  const steps = [
    {
      num: '01',
      title: 'Conozcámonos',
      desc: 'Primero, hablemos de tu proyecto. Quiero conocer tus ideas, necesidades y objetivos para entender qué buscas y cómo puedo ayudarte.'
    },
    {
      num: '02',
      title: 'Exploremos las ideas',
      desc: 'Desarrollaré conceptos creativos que nos permitan encontrar la mejor dirección para tu proyecto.'
    },
    {
      num: '03',
      title: 'Démosle forma',
      desc: 'Es momento de transformar las ideas en propuestas visuales. Exploraré diferentes posibilidades hasta encontrar una solución que conecte con lo que buscamos.'
    },
    {
      num: '04',
      title: 'Revisemos juntos',
      desc: 'Te presentaré los avances para conocer tu opinión.'
    },
    {
      num: '05',
      title: 'Afinemos los detalles',
      desc: 'Con la propuesta aprobada, trabajaré en los últimos detalles y prepararé todo para que el diseño cumpla con su propósito.'
    },
    {
      num: '06',
      title: 'El final es el comienzo',
      desc: 'Organizaré y te entregaré los archivos finales en los formatos acordados, listos para que puedas comenzar a utilizarlos.'
    }
  ];

  return (
    <section className="process-section reveal-section" id="proceso">
      <div className="process-heading">
        <h2>Tú, yo y<br /><em>el proceso.</em></h2>
        <p className="process-subhead"><strong>De tu idea al resultado final.</strong></p>
        <p>
          Cada proyecto es diferente, por eso trabajaremos paso a paso para transformar tus ideas en soluciones visuales que respondan a lo que necesitas.
        </p>
        <div className="process-quick-cta">
          <a
            className="button button--dark"
            href={createWhatsAppUrl(profile.phone, '¡Hola Luis! Me gusta tu proceso de trabajo y me gustaría contarte sobre mi proyecto.')}
            target="_blank"
            rel="noreferrer"
          >
            <span>Iniciar proyecto</span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      <ol className="process-timeline-list">
        {steps.map((st) => (
          <li className="process-timeline-item" key={st.num}>
            <div className="process-num-badge">{st.num}</div>
            <div className="process-timeline-content">
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// SECCIÓN 6: CONTACTO / CIERRE
function Contact() {
  const phone = profile.phone || '5913-4624';
  const email = profile.email || 'luisdgesteban@gmail.com';

  const handleCopyPhone = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Portapapeles no disponible');
      await navigator.clipboard.writeText(phone);
      showGlobalToast(`Teléfono ${phone} copiado`);
    } catch {
      showGlobalToast('No se pudo copiar el número. Puedes escribir por WhatsApp.');
    }
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-orbit" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="contact-content">
        <h2>Que tu marca<br /><em>no pase desapercibida.</em></h2>

        <p className="contact-description">
          Si buscas comunicación visual con intención, diseño publicitario para redes o una ilustración única, el primer paso es escribir por WhatsApp. Platiquemos de lo que necesitas.
        </p>

        {/* CTA PRINCIPAL A WHATSAPP */}
        <div className="contact-primary-cta">
          <a
            className="button button--whatsapp button--lg contact-big-btn"
            href={createWhatsAppUrl(profile.phone, '¡Hola Luis! Visité tu portafolio y me gustaría cotizar un proyecto para mi marca.')}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            <span>Escríbeme por WhatsApp</span>
          </a>
        </div>

        {/* Canales de contacto directos */}
        <div className="contact-channels-grid">
          <button className="channel-box" type="button" onClick={handleCopyPhone} aria-label={`Copiar número de WhatsApp ${phone}`}>
            <span className="channel-label">WHATSAPP / TELÉFONO</span>
            <strong className="channel-val">{phone}</strong>
            <small>Clic para copiar número</small>
          </button>

          <a className="channel-box" href={`mailto:${email}`}>
            <span className="channel-label">CORREO ELECTRÓNICO</span>
            <strong className="channel-val">{email}</strong>
            <small>Escríbeme un correo</small>
          </a>

          <a className="channel-box" href={profile.instagram || 'https://instagram.com/witchu.art'} target="_blank" rel="noreferrer">
            <span className="channel-label">INSTAGRAM</span>
            <strong className="channel-val">@witchu.art</strong>
            <small>Conoce más trazos y proyectos</small>
          </a>

          <div className="channel-box">
            <span className="channel-label">UBICACIÓN</span>
            <strong className="channel-val">Guatemala</strong>
            <small>Disponible para clientes globales</small>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <a className="footer-brand" href="#inicio">
          <img src="/assets/witchu-logo.png" alt="" className="footer-logo-img" />
          <span>WITCHU · {profile.name || 'Luis Gómez'}</span>
        </a>
        <a href="#inicio" className="footer-top-link">
          <span>VOLVER ARRIBA</span>
          <ArrowIcon className="footer-up-icon" />
        </a>
        <small>© {new Date().getFullYear()} {profile.name || 'Luis Gómez'} · Todos los derechos reservados</small>
      </footer>
    </section>
  );
}

// RAMA SECUNDARIA: ILUSTRACIÓN ("Trazos con personalidad")
function IllustrationBranch({ onBack }) {
  const [selectedArt, setSelectedArt] = useState(null);

  const currentIndex = selectedArt ? illustrations.findIndex((it) => it.id === selectedArt.id) : -1;

  const handleNext = () => {
    if (currentIndex >= 0) {
      const next = (currentIndex + 1) % illustrations.length;
      setSelectedArt(illustrations[next]);
    }
  };

  const handlePrev = () => {
    if (currentIndex >= 0) {
      const prev = (currentIndex - 1 + illustrations.length) % illustrations.length;
      setSelectedArt(illustrations[prev]);
    }
  };

  return (
    <div className="illustration-branch-view">
      {/* Barra superior de retorno */}
      <div className="branch-top-bar">
        <button type="button" className="branch-back-btn" onClick={onBack}>
          <ArrowIcon className="back-arrow-icon" />
          <span>Volver al recorrido principal (Servicios y Portafolio)</span>
        </button>
        <span className="branch-pill-tag">RAMA SECUNDARIA · ILUSTRACIÓN</span>
      </div>

      <header className="illustration-branch-header">
        <span className="illustration-eyebrow">ARTE VISUAL &amp; PERSONAJES WITCHU</span>
        <h1>Trazos con <em>personalidad.</em></h1>
        <p>
          Una galería libre de personajes, cómic y tinta digital creados por Luis Gómez. Sin textos extra: el arte habla por sí mismo.
        </p>
      </header>

      {/* A. GALERÍA LIMPIA */}
      <section className="illustration-clean-gallery" aria-label="Galería de ilustraciones">
        <div className="illustration-grid-pure">
          {illustrations.map((art) => (
            <div
              key={art.id}
              className="illustration-card-pure"
              onClick={() => setSelectedArt(art)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedArt(art)}
              aria-label={`Ver ilustración: ${art.title}`}
            >
              <img src={art.image} alt={art.alt} loading="lazy" />
              <div className="art-hover-overlay">
                <span>{art.title}</span>
                <ArrowIcon diagonal />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B. COMISIONES */}
      <section className="illustration-commissions-section">
        <div className="commissions-card">
          <div className="commissions-copy">
            <span className="commissions-badge">ENCARGOS ARTÍSTICOS</span>
            <h2>¿Deseas una comi?</h2>
            <p>
              Cuéntame tu idea, personaje o proyecto y el presupuesto que tienes en mente por WhatsApp para preparar una propuesta a tu medida.
            </p>
          </div>
          <div className="commissions-cta-col">
            <a
              className="button button--whatsapp button--lg"
              href={createWhatsAppUrl(
                profile.phone,
                '¡Hola Luis! Me interesa una comisión de ilustración ("comi"). Quiero contarte mi idea y pedirte una cotización.'
              )}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              <span>Pedir cotización por WhatsApp</span>
            </a>
            <small className="commissions-note">Respuesta directa y personalizada de Luis</small>
          </div>
        </div>
      </section>

      {/* Botón inferior de retorno */}
      <div className="branch-bottom-nav">
        <button type="button" className="button button--dark" onClick={onBack}>
          <span>← Volver al sitio principal</span>
        </button>
      </div>

      {selectedArt && (
        <WorkModal
          item={{
            ...selectedArt,
            category: 'Ilustración artística',
            note: 'Ilustración original de Luis Gómez (Witchu).'
          }}
          onClose={() => setSelectedArt(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

// Aplicación Principal
function App() {
  const [coverOpen, setCoverOpen] = useState(true);
  const [currentBranch, setCurrentBranch] = useState('main');

  useEffect(() => {
    const content = document.querySelectorAll('.site-header, main');
    content.forEach((element) => { element.inert = coverOpen; });
    if (!coverOpen) document.querySelector('main h1')?.focus();
    return () => content.forEach((element) => { element.inert = false; });
  }, [coverOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal-section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#ilustracion') {
        setCurrentBranch('illustration');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentBranch('main');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#ilustracion') handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateBranch = (branch) => {
    setCurrentBranch(branch);
    if (branch === 'illustration') {
      window.location.hash = '#ilustracion';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', '#inicio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <ToastContainer />

      {coverOpen && <InteractiveCover onEnter={() => setCoverOpen(false)} />}

      <Header
        currentBranch={currentBranch}
        onNavigateBranch={navigateBranch}
      />

      {currentBranch === 'illustration' ? (
        <main className="branch-main-container">
          <IllustrationBranch onBack={() => navigateBranch('main')} />
        </main>
      ) : (
        <main>
          {/* SECCIÓN 1: INICIO / PRESENTACIÓN */}
          <Hero onOpenIllustration={() => navigateBranch('illustration')} />

          {/* SECCIÓN 2: SERVICIOS */}
          <Services />

          {/* SECCIÓN 3: PORTAFOLIO */}
          <Portfolio />

          {/* SECCIÓN 4: PAQUETES PARA REDES SOCIALES */}
          <Pricing />

          {/* SECCIÓN 5: PROCESO, "TÚ, YO Y EL PROCESO" */}
          <Process />

          {/* SECCIÓN 6: CONTACTO / CIERRE */}
          <Contact />
        </main>
      )}
    </>
  );
}

const root = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;
if (root.hasAttribute('data-prerendered')) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
