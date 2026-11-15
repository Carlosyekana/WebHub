export type Language = 'es' | 'pt';

export interface CityNode {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  labName: string;
  focalPoints: {
    name: string;
    role: string;
    institution: string;
  }[];
  /** Coordinates in 0-100 SVG viewBox (mapped on stylized LATAM & Caribe silhouette) */
  x: number;
  y: number;
  focusAreas: string[];
  activePilots: string[];
  connectedTo: string[];
  highlightMetric: string;
  type: 'hub-host' | 'mentor-city' | 'active-node';
}

export interface SolutionPilot {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  flag: string;
  category: 'Resiliencia Hídrica' | 'Energía & Clima' | 'GovTech & IA' | 'Planeación Participativa' | 'Movilidad Sostenible';
  maturity: 'Escalable Regionalmente' | 'Piloto Validado' | 'Sandbox Activo';
  summary: string;
  context: string;
  strategy: string;
  results: string;
  keyMetrics: { label: string; value: string }[];
  replicabilityTime: string;
  budgetLevel: 'Bajo (<$25k USD)' | 'Medio ($25k–$80k USD)' | 'Estratégico (>$80k USD)';
  partners: string[];
  resources: { label: string; type: 'PDF' | 'Guía' | 'Enlace'; url: string }[];
  mentorCityId: string;
}

export interface LiveSession {
  id: string;
  status: 'upcoming' | 'featured-event' | 'on-demand';
  title: string;
  subtitle: string;
  speaker: string;
  speakerRole: string;
  dateLabel: string;
  baseHourUTC: number; // for timezone converter
  format: string;
  attendeesCount: string;
  countriesCount?: string;
  tags: string[];
  keyTakeaways: string[];
  isHighlight?: boolean;
}

export interface GlossaryCard {
  id: string;
  term: string;
  tag: string;
  shortDef: string;
  cityExample: string;
  quizQuestion: string;
  quizAnswer: string;
}

export interface UrbanChallenge {
  id: string;
  city: string;
  country: string;
  flag: string;
  title: string;
  domain: 'Resiliencia Climática' | 'GovTech & IA' | 'Movilidad 15-Min' | 'Participación & Datos';
  seeking: string[];
  urgency: 'Convocatoria Abierta' | 'Matchmaking Activo';
  interestedCount: number;
}

export interface BootcampEdition {
  year: string;
  city: string;
  country: string;
  flag: string;
  edition: string;
  theme: string;
  participants: string;
  highlights: string[];
  hosts: string[];
  videoUrl?: string;
}

export const CITY_NODES: CityNode[] = [
  {
    id: 'guadalajara',
    city: 'Guadalajara',
    country: 'México',
    countryCode: 'MX',
    flag: '🇲🇽',
    labName: 'City Science Lab MIT – Universidad de Guadalajara',
    focalPoints: [
      { name: 'Patricio Ovalle Wood', role: 'Director, Hub de Ciudades', institution: 'City Science Lab MIT–UdeG' },
      { name: 'Alejandro Padilla Lepe', role: 'Coordinador', institution: 'Hub de Ciudades CSL UdeG' },
      { name: 'César Roldán / Sergio Roldán', role: 'Dirección Lab Ciencia de la Ciudad', institution: 'Universidad de Guadalajara' },
    ],
    x: 24,
    y: 23,
    focusAreas: ['City Science', 'Gobernanza Regional', 'Datos Urbanos', 'Talento'],
    activePilots: ['Infraestructura Regional Permanente (Hábitat LATAM 2026)', 'Sede 3er Bootcamp 2025'],
    connectedTo: ['tapachula', 'chihuahua', 'medellin', 'providencia', 'curitiba', 'quito'],
    highlightMetric: 'Sede Institucional 2026',
    type: 'hub-host',
  },
  {
    id: 'chihuahua',
    city: 'Chihuahua Capital',
    country: 'México',
    countryCode: 'MX',
    flag: '🇲🇽',
    labName: 'Startup Chihuahua',
    focalPoints: [
      { name: 'Perla Lizeth Armendariz Estrada', role: 'Líder de Alianzas Estratégicas', institution: 'Startup Chihuahua' },
    ],
    x: 20,
    y: 16,
    focusAreas: ['Startups', 'Ecosistema Emprendedor', 'Alianzas'],
    activePilots: ['Vinculación Startups–Gobierno'],
    connectedTo: ['guadalajara', 'nunoa'],
    highlightMetric: 'Nodo Norte MX',
    type: 'active-node',
  },
  {
    id: 'tapachula',
    city: 'Tapachula',
    country: 'México',
    countryCode: 'MX',
    flag: '🇲🇽',
    labName: 'Instituto Ciudadano de Planeación Municipal (ICIPLAM)',
    focalPoints: [
      { name: 'Alejandro Mendoza Castañeda', role: 'Director General', institution: 'ICIPLAM Tapachula' },
    ],
    x: 29,
    y: 29,
    focusAreas: ['Planeación Participativa', 'Datos Abiertos', 'Gestión de Residuos'],
    activePilots: ['Creación ICIPLAM', 'Tableros Financieros Abiertos', 'App Gestión de Residuos'],
    connectedTo: ['guadalajara', 'tuxtla', 'guatemala', 'renca', 'providencia'],
    highlightMetric: 'Lab Ciudadano Activo',
    type: 'active-node',
  },
  {
    id: 'tuxtla',
    city: 'Tuxtla Gutiérrez',
    country: 'México',
    countryCode: 'MX',
    flag: '🇲🇽',
    labName: 'Instituto Ciudadano de Planeación Municipal para el Desarrollo Sustentable',
    focalPoints: [
      { name: 'José Antonio Villanueva Santiago', role: 'Director General', institution: 'ICIPLAM Tuxtla' },
      { name: 'Patricia Alejandra Hernández Pérez', role: 'Técnico Administrativo G.', institution: 'ICIPLAM Tuxtla' },
    ],
    x: 31,
    y: 27,
    focusAreas: ['Desarrollo Sustentable', 'Planeación Urbana'],
    activePilots: ['Articulación Metropolitana Sur-Sureste'],
    connectedTo: ['tapachula', 'guadalajara'],
    highlightMetric: 'Planeación Sustentable',
    type: 'active-node',
  },
  {
    id: 'guatemala',
    city: 'Ciudad de Guatemala',
    country: 'Guatemala',
    countryCode: 'GT',
    flag: '🇬🇹',
    labName: 'Gerencia de Planificación — Municipalidad de Guatemala',
    focalPoints: [
      { name: 'Silvia García Vettorazzi', role: 'Gerente de Planificación', institution: 'Municipalidad de Guatemala' },
      { name: 'Luisa Fernanda Espina Trujillo', role: 'Coordinadora Técnica', institution: 'Municipalidad de Guatemala' },
    ],
    x: 33,
    y: 32,
    focusAreas: ['Planificación Urbana', 'Movilidad', 'Cooperación Centroamericana'],
    activePilots: ['Intercambio técnico con Tapachula y San Salvador'],
    connectedTo: ['tapachula', 'sansalvador', 'sanjose'],
    highlightMetric: 'Nodo Centroamérica',
    type: 'active-node',
  },
  {
    id: 'sansalvador',
    city: 'San Salvador (AMSS)',
    country: 'El Salvador',
    countryCode: 'SV',
    flag: '🇸🇻',
    labName: 'OPAMSS & Universidad Don Bosco',
    focalPoints: [
      { name: 'Equipo Técnico OPAMSS', role: 'Innovación Urbana & Resiliencia', institution: 'OPAMSS / Univ. Don Bosco' },
    ],
    x: 35,
    y: 34,
    focusAreas: ['Geotermia Pasiva', 'Confort Térmico Escolar', 'Resiliencia Climática'],
    activePilots: ['Proyecto FresCura (Pozo Canadiense en Escuela El Carmelo)'],
    connectedTo: ['guatemala', 'quito', 'providencia'],
    highlightMetric: 'ROI Geotérmico Año 8–15',
    type: 'mentor-city',
  },
  {
    id: 'sanjose',
    city: 'San José',
    country: 'Costa Rica',
    countryCode: 'CR',
    flag: '🇨🇷',
    labName: 'Agencia Local de Innovación y Desarrollo',
    focalPoints: [
      { name: 'Yancy Lucía Ramírez Meléndez', role: 'Agencia Local de Innovación', institution: 'Municipalidad de San José' },
    ],
    x: 39,
    y: 38,
    focusAreas: ['Desarrollo Local', 'Innovación Pública'],
    activePilots: ['Agenda Urbana Sostenible'],
    connectedTo: ['guatemala', 'medellin', 'bogota'],
    highlightMetric: 'Agencia Local Activa',
    type: 'active-node',
  },
  {
    id: 'medellin',
    city: 'Medellín',
    country: 'Colombia',
    countryCode: 'CO',
    flag: '🇨🇴',
    labName: 'Subsecretaría Ciudad Inteligente · Ruta N · CTA',
    focalPoints: [
      { name: 'Diana María Ochoa Henao', role: 'Subsecretaría Ciudad Inteligente', institution: 'Alcaldía de Medellín' },
    ],
    x: 47,
    y: 44,
    focusAreas: ['Ciudad Inteligente', 'Innovación Social (UVAs)', 'Resiliencia'],
    activePilots: ['Sede 2do Bootcamp 2024', 'Maduración de Ecosistema CTA'],
    connectedTo: ['bogota', 'guadalajara', 'quito', 'providencia', 'curitiba'],
    highlightMetric: 'Sede Bootcamp 2024',
    type: 'mentor-city',
  },
  {
    id: 'bogota',
    city: 'Bogotá',
    country: 'Colombia',
    countryCode: 'CO',
    flag: '🇨🇴',
    labName: 'Laboratorio de Ciudad de Bogotá — SDP',
    focalPoints: [
      { name: 'Gabriel Andrés Millán Guayacundo', role: 'Jefe del Laboratorio de Ciudad', institution: 'Secretaría Distrital de Planeación' },
      { name: 'Juan Pablo Garzón Urrego', role: 'Profesional Especializado', institution: 'Secretaría Distrital de Planeación' },
    ],
    x: 50,
    y: 46,
    focusAreas: ['Laboratorio de Ciudad', 'Planeación Basada en Evidencia', 'GovTech'],
    activePilots: ['Laboratorio Urbano Distrital'],
    connectedTo: ['medellin', 'quito', 'miraflores'],
    highlightMetric: 'Lab Distrital SDP',
    type: 'active-node',
  },
  {
    id: 'quito',
    city: 'Quito',
    country: 'Ecuador',
    countryCode: 'EC',
    flag: '🇪🇨',
    labName: 'Secretaría de Hábitat y Ordenamiento Territorial',
    focalPoints: [
      { name: 'Andrea Pardo', role: 'Directora Metropolitana de Desarrollo Urbanístico', institution: 'Municipio DMQ' },
      { name: 'Gabriela Jezabel García Medina', role: 'Analista Normativa de Vivienda', institution: 'Municipio DMQ' },
    ],
    x: 44,
    y: 51,
    focusAreas: ['Gestión Pluvial', 'Infraestructura Verde', 'Espacio Público'],
    activePilots: ['Proyecto YAKU (+1,000L retención lluvia, Premio CEES 1er lugar)'],
    connectedTo: ['guayaquil', 'medellin', 'sansalvador', 'guadalajara'],
    highlightMetric: '+1,000 L/evento · 1° CEES',
    type: 'mentor-city',
  },
  {
    id: 'guayaquil',
    city: 'Guayaquil',
    country: 'Ecuador',
    countryCode: 'EC',
    flag: '🇪🇨',
    labName: 'EPICO — Empresa Pública Municipal de Innovación',
    focalPoints: [
      { name: 'Mauricio Becerra Estrella', role: 'Director de Innovación y Transformación Digital', institution: 'EPICO Guayaquil' },
      { name: 'Javier Jarama Jarama', role: 'Director de Planificación', institution: 'EPICO Guayaquil' },
    ],
    x: 42,
    y: 54,
    focusAreas: ['Transformación Digital', 'IA & Competitividad', 'Emprendimiento'],
    activePilots: ['IBERO IA Summit 2026 (Ecuador)', 'Transformación Digital Municipal'],
    connectedTo: ['quito', 'miraflores', 'nunoa'],
    highlightMetric: 'Motor GovTech & IA',
    type: 'active-node',
  },
  {
    id: 'miraflores',
    city: 'Lima / Miraflores',
    country: 'Perú',
    countryCode: 'PE',
    flag: '🇵🇪',
    labName: 'HUB de Innovación Miraflores',
    focalPoints: [
      { name: 'Paul Bruce Lambrecht', role: 'Director del HUB de Innovación', institution: 'Municipalidad de Miraflores' },
    ],
    x: 46,
    y: 63,
    focusAreas: ['Hub Municipal', 'Alianza Público-Privada-Académica', 'Transferencia'],
    activePilots: ['Diseño Subgerencia de Innovación', 'Taller Distrito Innovador PUCP'],
    connectedTo: ['providencia', 'bogota', 'guayaquil'],
    highlightMetric: 'Nuevo Hub en Escala',
    type: 'active-node',
  },
  {
    id: 'curitiba',
    city: 'Curitiba',
    country: 'Brasil',
    countryCode: 'BR',
    flag: '🇧🇷',
    labName: 'IPPUC · Agência Curitiba · Proteção e Defesa Civil',
    focalPoints: [
      { name: 'Hannah Brito Inagaki', role: 'Asesora de Relaciones Internacionales (Punto Focal)', institution: 'Prefeitura de Curitiba' },
      { name: 'Jenifer Saydelles de Lima', role: 'Chefe de Logística', institution: 'Coordenadoria Defesa Civil' },
    ],
    x: 74,
    y: 71,
    focusAreas: ['Electromovilidad BRT', 'Descarbonización', 'Resiliencia Climática'],
    activePilots: ['Renovación Ciclo 3 Años (2026–2029)', '250 Buses Eléctricos'],
    connectedTo: ['montevideo', 'guadalajara', 'medellin', 'cordoba'],
    highlightMetric: '250 Buses Eléctricos',
    type: 'mentor-city',
  },
  {
    id: 'cordoba',
    city: 'Córdoba',
    country: 'Argentina',
    countryCode: 'AR',
    flag: '🇦🇷',
    labName: 'CorLab — Laboratorio de Innovación Pública y GovTech',
    focalPoints: [
      { name: 'Hernán Matías Perin', role: 'Director General de GovTech y CorLab', institution: 'Municipalidad de Córdoba' },
      { name: 'Marcela Nicolaides', role: 'Directora Economía del Conocimiento', institution: 'CorLab / Fondo Ciudad Inteligente' },
    ],
    x: 56,
    y: 78,
    focusAreas: ['GovTech', 'Fondo Ciudad Inteligente', 'Compra Pública Innovación'],
    activePilots: ['Fondo Córdoba Ciudad Inteligente', 'Ecosistema GovTech'],
    connectedTo: ['mendoza', 'montevideo', 'curitiba', 'nunoa'],
    highlightMetric: 'Referente GovTech',
    type: 'mentor-city',
  },
  {
    id: 'mendoza',
    city: 'Mendoza',
    country: 'Argentina',
    countryCode: 'AR',
    flag: '🇦🇷',
    labName: 'Laboratorio y Análisis Urbano',
    focalPoints: [
      { name: 'Mercedes Morandini', role: 'Jefa de Área', institution: 'Municipalidad de Mendoza' },
    ],
    x: 51,
    y: 80,
    focusAreas: ['Análisis Urbano', 'Datos Territoriales'],
    activePilots: ['Laboratorio Urbano Ciudad de Mendoza'],
    connectedTo: ['cordoba', 'providencia', 'renca'],
    highlightMetric: 'Análisis Territorial',
    type: 'active-node',
  },
  {
    id: 'providencia',
    city: 'Providencia (Santiago)',
    country: 'Chile',
    countryCode: 'CL',
    flag: '🇨🇱',
    labName: 'HUB Providencia',
    focalPoints: [
      { name: 'Mauricio Brito', role: 'Director HUB Providencia', institution: 'Municipalidad de Providencia' },
    ],
    x: 49,
    y: 82,
    focusAreas: ['Modelo Hub Municipal', 'Gestión Hídrica', 'GovTech'],
    activePilots: ['Piloto Agua en Escuelas (con Renca)', 'Modelo replicado en 30 municipios CL'],
    connectedTo: ['renca', 'nunoa', 'miraflores', 'guadalajara', 'tapachula'],
    highlightMetric: 'Modelo base en 30 comunas',
    type: 'mentor-city',
  },
  {
    id: 'nunoa',
    city: 'Ñuñoa (Santiago)',
    country: 'Chile',
    countryCode: 'CL',
    flag: '🇨🇱',
    labName: 'HUB Ñuñoa · iLab Ñuñoa',
    focalPoints: [
      { name: 'Adrián Soto Puentes', role: 'Director HUB Ñuñoa', institution: 'Municipalidad de Ñuñoa' },
    ],
    x: 50.5,
    y: 84,
    focusAreas: ['Sandbox Municipal', 'IA en Trámites', 'Startups'],
    activePilots: ['Sandbox Ñuñoa', 'Prefactibilidad de Patentes con IA', 'FIIEM 2026 (2–3 Dic)'],
    connectedTo: ['providencia', 'renca', 'cordoba', 'guayaquil'],
    highlightMetric: 'Sandbox IA + FIIEM 2026',
    type: 'mentor-city',
  },
  {
    id: 'renca',
    city: 'Renca (Santiago)',
    country: 'Chile',
    countryCode: 'CL',
    flag: '🇨🇱',
    labName: 'La Fábrica de Renca',
    focalPoints: [
      { name: 'Jaime Álvarez González', role: 'Líder de Innovación Pública', institution: 'Municipalidad de Renca' },
    ],
    x: 47.5,
    y: 84,
    focusAreas: ['Economía Conductual', 'Ahorro Hídrico', 'Innovación Comunitaria'],
    activePilots: ['Piloto Agua en 6 Escuelas (IoT + Aguas Grises + Señales Conductuales)'],
    connectedTo: ['providencia', 'nunoa', 'tapachula', 'mendoza'],
    highlightMetric: '6 Escuelas Piloto',
    type: 'mentor-city',
  },
  {
    id: 'montevideo',
    city: 'Montevideo',
    country: 'Uruguay',
    countryCode: 'UY',
    flag: '🇺🇾',
    labName: 'Montevideo Lab — Gerencia de Innovación',
    focalPoints: [
      { name: 'Andrea Apolaro', role: 'Gerenta de Innovación', institution: 'Intendencia de Montevideo' },
      { name: 'Paulo Pereyra', role: 'Coordinador Montevideo Lab', institution: 'Intendencia de Montevideo' },
    ],
    x: 65,
    y: 81,
    focusAreas: ['Participación Ciudadana', 'Laboratorio Urbano', 'Gobierno Abierto'],
    activePilots: ['Montevideo Lab de Innovación Pública'],
    connectedTo: ['curitiba', 'cordoba', 'providencia'],
    highlightMetric: 'Lab Pionero Cono Sur',
    type: 'active-node',
  },
];

export const SOLUTION_PILOTS: SolutionPilot[] = [
  {
    id: 'sandbox-nunoa',
    slug: 'sandbox-municipal-ia-nunoa',
    title: 'Sandbox Municipal para Startups + Prefactibilidad Comercial con IA',
    city: 'Ñuñoa (Santiago)',
    country: 'Chile',
    flag: '🇨🇱',
    category: 'GovTech & IA',
    maturity: 'Sandbox Activo',
    summary:
      'Marco regulatorio y entorno municipal real para que startups piloten tecnología urbana, junto a una plataforma de IA que evalúa prefactibilidad de patentes comerciales en tiempo real.',
    context:
      'Los municipios enfrentan silos administrativos históricos y barreras burocráticas que frenan la inversión local y dificultan que startups GovTech prueben soluciones en entornos reales.',
    strategy:
      'Desde iLab Ñuñoa y Hub Ñuñoa se creó un espacio seguro de experimentación con riesgo controlado ("Sandbox Ñuñoa") y se integró zonificación, planificación urbana y flujos comerciales en un motor de IA.',
    results:
      'Los futuros locatarios evalúan viabilidad antes de iniciar trámites; la comuna rompe silos internos y posiciona el estándar en el Festival Internacional de Innovación y Emprendimiento Municipal (FIIEM 2026).',
    keyMetrics: [
      { label: 'Lanzamiento IA', value: 'Abril 2026' },
      { label: 'Alcance', value: 'Tiempo Real' },
      { label: 'Cumbre Anual', value: 'FIIEM 2–3 Dic' },
    ],
    replicabilityTime: '4–6 meses',
    budgetLevel: 'Medio ($25k–$80k USD)',
    partners: ['Hub Ñuñoa', 'iLab Ñuñoa', 'Alianza Revolución Tecnológica'],
    resources: [
      { label: 'Ficha oficial del piloto en Hub de Ciudades', type: 'Enlace', url: 'https://hubdeciudades.org/hub-nunoa-apuesta-por-las-startups-con-un-sandbox-municipal-replicable-en-latam/' },
    ],
    mentorCityId: 'nunoa',
  },
  {
    id: 'yaku-quito',
    slug: 'yaku-infraestructura-pluvial-quito',
    title: 'YAKU: Mobiliario Urbano Sostenible de Captación e Infiltración Pluvial',
    city: 'Quito',
    country: 'Ecuador',
    flag: '🇪🇨',
    category: 'Resiliencia Hídrica',
    maturity: 'Escalable Regionalmente',
    summary:
      'Mobiliario multifuncional con células subterráneas que captan agua lluvia, la almacenan e infiltran gradualmente imitando ecosistemas de montaña, brindando sombra y riego comunitario.',
    context:
      'Quito alterna sequías prolongadas y lluvias torrenciales agravadas por superficies impermeables, generando escorrentía, inundaciones y bajo confort térmico en parques.',
    strategy:
      'Diseño modular que combina captación pluvial, tanque subterráneo, jardín de lluvia, sombra y señalética de educación ambiental replicable en toda la red de parques del DMQ.',
    results:
      'Retiene más de 1.000 litros en un solo evento de lluvia, alimenta riego de jardines con alta apropiación ciudadana y ganó el 1er lugar en infraestructura sostenible del CEES.',
    keyMetrics: [
      { label: 'Retención/evento', value: '+1,000 L' },
      { label: 'Reconocimiento', value: '1° Lugar CEES' },
      { label: 'Escala', value: 'Parques DMQ' },
    ],
    replicabilityTime: '3–5 meses',
    budgetLevel: 'Bajo (<$25k USD)',
    partners: ['Municipio DMQ (SHOT)', 'BID Cities Lab'],
    resources: [
      { label: 'Caso documentado YAKU', type: 'Enlace', url: 'https://hubdeciudades.org/san-jose-guatemala/' },
    ],
    mentorCityId: 'quito',
  },
  {
    id: 'agua-escuelas-renca-provi',
    slug: 'ahorro-agua-escuelas-renca-providencia',
    title: 'Monitoreo IoT, Señales Conductuales y Aguas Grises en 6 Escuelas Públicas',
    city: 'Renca & Providencia',
    country: 'Chile',
    flag: '🇨🇱',
    category: 'Resiliencia Hídrica',
    maturity: 'Piloto Validado',
    summary:
      'Intervención integral en 6 escuelas combinando telemetría horaria para detectar fugas, campanas y pantallas conductuales en tiempo real, y reutilización de aguas grises.',
    context:
      'Escuelas públicas sufrían pérdidas silenciosas de agua y alto consumo por hábitos cotidianos sin visibilidad del gasto ni incentivos colectivos.',
    strategy:
      'Tres fases: (1) línea base horaria IoT, (2) economía conductual situada (señales sonoras diarias, pantallas en vivo, afiches), y (3) reuso de lavamanos en inodoros y riego.',
    results:
      'Detección inmediata de fugas, reducciones sostenidas gracias a señales colectivas repetidas (campana diaria) y validación de reuso directo de aguas grises.',
    keyMetrics: [
      { label: 'Escuelas', value: '6 públicas' },
      { label: 'Componentes', value: 'IoT + Hábitos' },
      { label: 'Kits abiertos', value: '5 PDFs listos' },
    ],
    replicabilityTime: '2–4 meses',
    budgetLevel: 'Bajo (<$25k USD)',
    partners: ['HUB Providencia', 'La Fábrica de Renca', 'BID Cities Lab'],
    resources: [
      { label: 'Afiche conductual escolar #2', type: 'PDF', url: 'https://hubdeciudades.org/wp-content/uploads/2026/06/AFICHE2.pdf' },
      { label: 'Afiche conductual escolar #3', type: 'PDF', url: 'https://hubdeciudades.org/wp-content/uploads/2026/06/AFICHE3.pdf' },
      { label: 'Calendario de activación', type: 'PDF', url: 'https://hubdeciudades.org/wp-content/uploads/2026/06/CALEND1.pdf' },
      { label: 'Guía Pantalla Consumo Vivo', type: 'PDF', url: 'https://hubdeciudades.org/wp-content/uploads/2026/06/PANTAL1.pdf' },
    ],
    mentorCityId: 'renca',
  },
  {
    id: 'frescura-el-salvador',
    slug: 'frescura-geotermia-pasiva-el-salvador',
    title: 'FresCura: Climatización Geotérmica Pasiva para Aulas Escolares',
    city: 'San Salvador',
    country: 'El Salvador',
    flag: '🇸🇻',
    category: 'Energía & Clima',
    maturity: 'Piloto Validado',
    summary:
      'Sistema de "pozo canadiense" con tuberías a 3–5 metros bajo tierra que utiliza la inercia térmica del suelo para enfriar el aire ambiente antes de inyectarlo en un aula escolar.',
    context:
      'Las olas de calor urbano degradan el aprendizaje escolar, mientras que el aire acondicionado tradicional dispara costos eléctricos y expulsa más calor a la ciudad.',
    strategy:
      'Alianza OPAMSS + Universidad Don Bosco + BID Cities Lab implementando un intercambiador geotérmico pasivo en el Complejo Educativo El Carmelo con medición comparativa.',
    results:
      'Mejora comprobada de sensación térmica frente a aulas testigo; supera económicamente al A/C desde el año 8 en obra nueva (año 15 en edificios existentes) y forma estudiantes en ingeniería.',
    keyMetrics: [
      { label: 'Profundidad', value: '3–5 metros' },
      { label: 'ROI Obra Nueva', value: 'Año 8' },
      { label: 'Energía', value: 'Pasiva / Limpia' },
    ],
    replicabilityTime: '4–6 meses',
    budgetLevel: 'Medio ($25k–$80k USD)',
    partners: ['OPAMSS', 'Universidad Don Bosco', 'BID Cities Lab'],
    resources: [
      { label: 'Ficha técnica FresCura', type: 'Enlace', url: 'https://hubdeciudades.org/hello-world/' },
    ],
    mentorCityId: 'sansalvador',
  },
  {
    id: 'iciplam-tapachula',
    slug: 'iciplam-datos-abiertos-tapachula',
    title: 'ICIPLAM: Instituto Ciudadano de Planeación y Tableros Financieros Abiertos',
    city: 'Tapachula (Chiapas)',
    country: 'México',
    flag: '🇲🇽',
    category: 'Planeación Participativa',
    maturity: 'Piloto Validado',
    summary:
      'Creación de institucionalidad de planeación ciudadana acompañada por la red, junto a tableros financieros abiertos y aplicaciones cívicas para gestión de residuos.',
    context:
      'Gobiernos locales de escala intermedia necesitan romper inercias internas y crear capacidad técnica continua más allá de los ciclos políticos.',
    strategy:
      'Acompañamiento par-a-par dentro del Hub de Ciudades para instituir el ICIPLAM, acercar datos presupuestales a la ciudadanía y proyectar intercambios con Renca, Providencia y Guatemala.',
    results:
      'Institucionalidad ciudadana en operación, tableros financieros públicos activos y hoja de ruta de laboratorio urbano participativo.',
    keyMetrics: [
      { label: 'Institución', value: 'ICIPLAM' },
      { label: 'Transparencia', value: 'Tableros Live' },
      { label: 'Acompañamiento', value: 'Red LATAM' },
    ],
    replicabilityTime: '6–9 meses',
    budgetLevel: 'Bajo (<$25k USD)',
    partners: ['ICIPLAM Tapachula', 'Red Hub de Ciudades'],
    resources: [
      { label: 'Entrevista y caso Tapachula', type: 'Enlace', url: 'https://hubdeciudades.org/tapachula-impulsa-un-laboratorio-de-ciudad/' },
    ],
    mentorCityId: 'tapachula',
  },
  {
    id: 'curitiba-electromovilidad',
    slug: 'curitiba-transicion-electrica-ippuc',
    title: 'Descarbonización del BRT: 250 Nuevos Buses Eléctricos y Cooperación Técnica',
    city: 'Curitiba',
    country: 'Brasil',
    flag: '🇧🇷',
    category: 'Movilidad Sostenible',
    maturity: 'Escalable Regionalmente',
    summary:
      'Evolución del histórico modelo BRT hacia movilidad cero emisiones con 250 autobuses eléctricos en 5 años y transferencia abierta de aprendizajes vía IPPUC y Agência Curitiba.',
    context:
      'Incluso ciudades pioneras en planificación urbana enfrentan el reto de modernizar infraestructuras consolidadas hacia metas de descarbonización y resiliencia climática.',
    strategy:
      'Articulación de nueva concesión eléctrica (2024–2026+), integración de Defesa Civil, Meio Ambiente, IPPUC y renovación de membresía 2026–2029 en el Hub.',
    results:
      'Hoja de ruta de 250 buses eléctricos en 5 años y participación activa en los 3 Bootcamps (São Paulo, Medellín, Guadalajara) transfiriendo conocimiento a toda LATAM.',
    keyMetrics: [
      { label: 'Flota Eléctrica', value: '250 buses' },
      { label: 'Horizonte', value: '5 años' },
      { label: 'Ciclo Hub', value: '2026–2029' },
    ],
    replicabilityTime: '12+ meses',
    budgetLevel: 'Estratégico (>$80k USD)',
    partners: ['Prefeitura de Curitiba', 'IPPUC', 'Agência Curitiba'],
    resources: [
      { label: 'Artículo renovación Curitiba', type: 'Enlace', url: 'https://hubdeciudades.org/curitiba-renueva-su-participacion-en-el-hub-de-ciudades-y-proyecta-profundizar-la-colaboracion-regional/' },
    ],
    mentorCityId: 'curitiba',
  },
];

export const LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'sesion-nov-19',
    status: 'upcoming',
    title: '¿Cómo innova un municipio cuando no hay tiempo para innovar?',
    subtitle: 'Estrategias tácticas para pasar del "permiso para innovar" al "compromiso institucional" en equipos con alta presión operativa.',
    speaker: 'Patricio Ovalle & Invitados Municipales',
    speakerRole: 'Director Hub de Ciudades · City Science Lab MIT–UdeG',
    dateLabel: 'Jueves 19 Noviembre 2026',
    baseHourUTC: 16, // 10:00 CDMX / 11:00 Bogotá-Quito-Lima / 13:00 Santiago-SP-BA
    format: 'Sesión Interactiva Online + Q&A en Vivo',
    attendeesCount: '420+ inscritos',
    countriesCount: '15 países',
    tags: ['Gestión del Tiempo', 'Capacidades Públicas', 'GovTech'],
    keyTakeaways: [
      'Cómo liberar capacidad en equipos pequeños sin presupuesto extra',
      'Micro-sandboxes de 30 días para validar proyectos antes de licitar',
      'Herramientas compartidas listas para adaptar desde la red',
    ],
    isHighlight: true,
  },
  {
    id: 'fiiem-2026',
    status: 'featured-event',
    title: 'FIIEM 2026 — Festival Internacional de Innovación y Emprendimiento Municipal',
    subtitle: 'Cumbre presencial e híbrida impulsada por Hub Ñuñoa junto a la red Hub de Ciudades para conectar municipios, startups y capital de riesgo.',
    speaker: 'Adrián Soto Puentes & Ecosistema Hub LATAM',
    speakerRole: 'Director Hub Ñuñoa · Red de Ciudades',
    dateLabel: '2 y 3 Diciembre 2026 · Santiago, Chile',
    baseHourUTC: 13,
    format: 'Cumbre Internacional · Demo Day Startups × Municipios',
    attendeesCount: '30+ Gobiernos',
    countriesCount: '12 países',
    tags: ['Sandbox Municipal', 'Startups', 'Capital de Riesgo'],
    keyTakeaways: [
      'Estándar replicable de Sandbox Municipal para LATAM',
      'Ruedas de conexión entre alcaldías y startups GovTech',
      'Casos de IA aplicada a permisos y servicios ciudadanos',
    ],
  },
  {
    id: 'catedra-kent-larson',
    status: 'on-demand',
    title: 'Ciudades del Futuro y CityScope: Hackeando el Diseño Urbano',
    subtitle: 'Diálogo exclusivo con el Director de City Science en el MIT Media Lab sobre simulación urbana en tiempo real y comunidades autónomas.',
    speaker: 'Kent Larson',
    speakerRole: 'Director, City Science Group — MIT Media Lab',
    dateLabel: 'Noviembre 2026 · Síntesis Disponible',
    baseHourUTC: 16,
    format: 'Cátedra Magistral MIT × UdeG',
    attendeesCount: '650+ asistentes',
    countriesCount: '16 países',
    tags: ['MIT Media Lab', 'CityScope', 'Ciencia de Ciudades'],
    keyTakeaways: [
      'Uso de gemelos digitales tangibles (CityScope) para consensuar políticas con ciudadanos',
      'Descentralización de servicios e infraestructura ligera en barrios latinoamericanos',
      'Integración directa del Hub de Ciudades a la red global MIT City Science Network',
    ],
  },
  {
    id: 'catedra-estonia',
    status: 'on-demand',
    title: 'Digitalización: Motor de Innovación y Transformación Social (Caso Estonia)',
    subtitle: 'Cómo pasar de digitalizar burocracia a diseñar servicios centrados en las personas con e-Democracy y confianza digital.',
    speaker: 'Kristina Reinsalu',
    speakerRole: 'Senior Expert on e-Democracy — e-Governance Academy (Tallin, Estonia)',
    dateLabel: '15 Octubre 2026 · Síntesis Disponible',
    baseHourUTC: 16,
    format: 'Charla Internacional Online',
    attendeesCount: '650+ inscritos',
    countriesCount: '17 países',
    tags: ['Gobierno Digital', 'Estonia', 'e-Democracy'],
    keyTakeaways: [
      'Principio "Once-Only": el Estado no pide dos veces el mismo dato al ciudadano',
      'Interoperabilidad municipal como base para escalar soluciones GovTech',
      'Inclusión digital y participación ciudadana vinculante',
    ],
  },
  {
    id: 'catedra-carlos-moreno',
    status: 'on-demand',
    title: 'Cátedra Carlos Moreno: La Ciudad de los 15 Minutos',
    subtitle: 'Proximidad urbana, cronourbanismo y por qué la calidad de vida no debe depender del código postal.',
    speaker: 'Dr. Carlos Moreno',
    speakerRole: 'Creador del modelo "Ciudad de los 15 Minutos" · Cátedra UdeG',
    dateLabel: '24 Septiembre 2026 · Récord de Red',
    baseHourUTC: 15,
    format: 'Cátedra Inaugural UdeG',
    attendeesCount: '800 inscritos · 400 en vivo',
    countriesCount: '18 países · 120+ ciudades',
    tags: ['Proximidad Urbana', 'Salud Urbana', '15-Min City'],
    keyTakeaways: [
      'Las 6 funciones sociales esenciales: habitar, trabajar, abastecerse, cuidarse, educarse y descansar',
      'Policentrismo y urbanismo táctico adaptado a la realidad de LATAM',
      'Planificación urbana como política preventiva de salud pública',
    ],
  },
];

export const GLOSSARY_CARDS: GlossaryCard[] = [
  {
    id: 'sandbox',
    term: 'Sandbox Regulatorio Municipal',
    tag: 'Fácil y Simple · GovTech',
    shortDef: 'Espacio controlado donde un municipio permite a startups probar soluciones reales bajo reglas flexibles y medición rigurosa antes de escalar o comprar.',
    cityExample: 'Hub Ñuñoa (Chile) lo aplica para testear tecnologías urbanas con riesgo acotado.',
    quizQuestion: '¿Qué evita un Sandbox antes de una compra pública?',
    quizAnswer: 'Evita invertir grandes presupuestos en soluciones no validadas en contexto local.',
  },
  {
    id: 'govtech',
    term: 'Ecosistema GovTech',
    tag: 'Fácil y Simple · Innovación',
    shortDef: 'Articulación entre gobiernos locales y startups digitales ágiles que resuelven retos públicos con datos, IA y software cívico.',
    cityExample: 'CorLab Córdoba y su Fondo Ciudad Inteligente invierten directo en startups GovTech.',
    quizQuestion: '¿En qué se diferencia del proveedor TI tradicional?',
    quizAnswer: 'Co-diseña iterativamente desde el problema ciudadano con foco en impacto medible.',
  },
  {
    id: 'compromiso',
    term: 'Permiso vs. Compromiso para Innovar',
    tag: 'Fácil y Simple · Gobernanza',
    shortDef: 'Tener "permiso" es hacer un piloto aislado; tener "compromiso" implica presupuesto, equipo dedicado y continuidad más allá de un período electoral.',
    cityExample: '91% de hubs municipales reportan falta de financiamiento; por eso el Hub trabaja gobernanza permanente.',
    quizQuestion: '¿Qué garantiza que un piloto no muera al cambiar el alcalde?',
    quizAnswer: 'Institucionalidad (como ICIPLAM o CSL) + gobernanza multi-actor con academia y sociedad civil.',
  },
  {
    id: 'cityscience',
    term: 'City Science (Ciencia de Ciudades)',
    tag: 'Fácil y Simple · MIT–UdeG',
    shortDef: 'Uso de datos urbanos, modelado espacial y participación humana para simular el impacto de decisiones antes de construir en el territorio.',
    cityExample: 'City Science Lab MIT–Universidad de Guadalajara articula la red de 30 gobiernos en LATAM.',
    quizQuestion: '¿Basta tener big data para hacer City Science?',
    quizAnswer: 'No: sin sentido ético, humanista y escucha territorial, los datos no transforman la desigualdad.',
  },
];

export const URBAN_CHALLENGES: UrbanChallenge[] = [
  {
    id: 'ch-1',
    city: 'Tapachula',
    country: 'México',
    flag: '🇲🇽',
    title: 'Escalamiento de Laboratorio Ciudadano & Gestión Inteligente de Residuos',
    domain: 'Participación & Datos',
    seeking: ['Mentorías de Renca/Providencia', 'Startups logística de residuos', 'Metodologías participativas'],
    urgency: 'Matchmaking Activo',
    interestedCount: 7,
  },
  {
    id: 'ch-2',
    city: 'Miraflores (Lima)',
    country: 'Perú',
    flag: '🇵🇪',
    title: 'Consolidación de Subgerencia de Innovación y Ecosistema Triple Hélice',
    domain: 'GovTech & IA',
    seeking: ['Modelos de gobernanza (Providencia/Medellín)', 'Vinculación universitaria PUCP', 'Casos Sandbox'],
    urgency: 'Convocatoria Abierta',
    interestedCount: 11,
  },
  {
    id: 'ch-3',
    city: 'Quito & San Salvador',
    country: 'Ecuador / El Salvador',
    flag: '🌎',
    title: 'Replicación Regional de Soluciones Basadas en Naturaleza (Yaku + FresCura)',
    domain: 'Resiliencia Climática',
    seeking: ['Municipios con islas de calor o déficit pluvial', 'Fondos multilaterales', 'Adaptación escolar'],
    urgency: 'Convocatoria Abierta',
    interestedCount: 14,
  },
  {
    id: 'ch-4',
    city: 'Curitiba & Guadalajara',
    country: 'Brasil / México',
    flag: '🌎',
    title: 'Simulación de Proximidad 15-Minutos y Descarbonización del Transporte',
    domain: 'Movilidad 15-Min',
    seeking: ['Equipos de datos urbanos', 'Centros City Science', 'Operadores electromovilidad'],
    urgency: 'Matchmaking Activo',
    interestedCount: 9,
  },
];

export const BOOTCAMP_EDITIONS: BootcampEdition[] = [
  {
    year: '2023',
    city: 'São Paulo',
    country: 'Brasil',
    flag: '🇧🇷',
    edition: '1er Bootcamp Anual',
    theme: 'Fundación de la Red de Innovación Urbana BID',
    participants: '15 ciudades fundadoras',
    highlights: [
      'Creación de los primeros laboratorios urbanos articulados por el BID (HUD / Cities Lab)',
      'Definición de agenda común: innovación abierta, talento municipal y pilotos replicables',
    ],
    hosts: ['Banco Interamericano de Desarrollo (BID)', 'Prefeitura de São Paulo'],
  },
  {
    year: '2024',
    city: 'Medellín',
    country: 'Colombia',
    flag: '🇨🇴',
    edition: '2do Bootcamp Anual',
    theme: 'Innovación Urbana, Resiliencia Climática y Transformación Social',
    participants: '30+ profesionales · 10+ ciudades',
    highlights: [
      'Visitas técnicas a Ruta N, EPM (Museo del Agua) y UVAs (Unidades de Vida Articulada)',
      'Impulso directo a pilotos financiados como YAKU (Quito), FresCura (El Salvador) y Agua en Escuelas (Chile)',
    ],
    hosts: ['BID', 'Alcaldía de Medellín', 'Ruta N', 'Fundación EPM'],
    videoUrl: 'https://www.youtube.com/watch?v=ypYLLSsQoQU',
  },
  {
    year: '2025',
    city: 'Guadalajara',
    country: 'México',
    flag: '🇲🇽',
    edition: '3er Bootcamp Anual',
    theme: 'Gobernanza de Red, Políticas Basadas en Evidencia y Transición Institucional',
    participants: '45+ participantes · 20 ciudades · 10 países',
    highlights: [
      'Celebrado en Ciudad Creativa Digital junto al Laboratorio de Ciencias para la Ciudad (UdeG)',
      'Diseño del modelo de gobernanza permanente del Hub de Ciudades para trascender ciclos políticos',
    ],
    hosts: ['Gobierno de Guadalajara', 'Universidad de Guadalajara', 'BID Cities Lab'],
    videoUrl: 'https://www.youtube.com/watch?v=GkSW71bHxCg',
  },
  {
    year: '2026–2027',
    city: 'Nueva Era Regional',
    country: 'Latam & Caribe',
    flag: '🚀',
    edition: 'Infraestructura Permanente MIT–UdeG',
    theme: 'City Science, GovTech, IA Pública y Escalamiento Multi-Actor',
    participants: '30 gobiernos · 12 países · +800 profesionales en cátedras',
    highlights: [
      'Lanzamiento oficial en Hábitat LATAM 2026 bajo alianza City Science Lab MIT – UdeG',
      'Incorporación activa de universidades, startups GovTech, Sandboxes y organismos multilaterales',
    ],
    hosts: ['City Science Lab MIT – UdeG', 'Red de 30 Gobiernos Locales'],
  },
];
