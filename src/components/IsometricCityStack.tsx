import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ChapterView } from '../types/os';

interface LayerItem {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  accent: string;
  bgTint: string;
  borderTint: string;
  hotspots: {
    num: string;
    name: string;
    tag: string;
    desc: string;
    x: string;
    y: string;
  }[];
  ctaLabel: string;
  ctaTarget: ChapterView;
}

const LAYERS: LayerItem[] = [
  {
    id: 3,
    code: 'CAPA 03',
    title: 'Ciencia de Ciudades & Red Global',
    subtitle: 'Frontera de conocimiento MIT Media Lab × UdeG conectada a decisiones locales.',
    accent: '#254EDB',
    bgTint: 'rgba(37, 78, 219, 0.14)',
    borderTint: 'rgba(37, 78, 219, 0.55)',
    hotspots: [
      {
        num: '1',
        name: 'Cátedra Kent Larson (MIT)',
        tag: 'CityScope',
        desc: 'Gemelos digitales tangibles y simulación urbana en tiempo real para diseñar políticas basadas en evidencia.',
        x: '22%',
        y: '28%',
      },
      {
        num: '2',
        name: 'Ciudad de los 15 Minutos',
        tag: '800+ inscritos',
        desc: 'Proximidad urbana con el Dr. Carlos Moreno: 18 países y 120+ ciudades repensando la vida cotidiana.',
        x: '62%',
        y: '34%',
      },
      {
        num: '3',
        name: 'Gobierno Digital (Estonia)',
        tag: '650+ inscritos',
        desc: 'Transferencia directa con e-Governance Academy (Kristina Reinsalu) sobre interoperabilidad y confianza.',
        x: '42%',
        y: '68%',
      },
    ],
    ctaLabel: 'Explorar Cátedras & Red',
    ctaTarget: 'network',
  },
  {
    id: 2,
    code: 'CAPA 02',
    title: 'Gobernanza, Sandboxes & GovTech',
    subtitle: 'Institucionalidad para pasar del "permiso aislado" al compromiso permanente.',
    accent: '#FF4D29',
    bgTint: 'rgba(255, 77, 41, 0.14)',
    borderTint: 'rgba(255, 77, 41, 0.55)',
    hotspots: [
      {
        num: '1',
        name: 'Sandbox Ñuñoa + IA',
        tag: 'Regulación Ágil',
        desc: 'Entorno municipal seguro para que startups testeen tecnología urbana e IA en patentes comerciales.',
        x: '26%',
        y: '32%',
      },
      {
        num: '2',
        name: 'ICIPLAM Tapachula',
        tag: 'Institucionalidad',
        desc: 'Creación del Instituto Ciudadano de Planeación Municipal y tableros financieros abiertos a la comunidad.',
        x: '64%',
        y: '42%',
      },
      {
        num: '3',
        name: 'CorLab & Providencia',
        tag: 'Triple Hélice',
        desc: 'Fondos GovTech y modelos replicados en más de 30 municipios articulando startups, academia y alcaldías.',
        x: '38%',
        y: '72%',
      },
    ],
    ctaLabel: 'Evaluar madurez de tu ciudad',
    ctaTarget: 'join',
  },
  {
    id: 1,
    code: 'CAPA 01',
    title: 'Territorio & Pilotos Replicables',
    subtitle: 'Soluciones validadas en campo listas para adaptarse de una ciudad a otra.',
    accent: '#10B981',
    bgTint: 'rgba(16, 185, 129, 0.14)',
    borderTint: 'rgba(16, 185, 129, 0.55)',
    hotspots: [
      {
        num: '1',
        name: 'YAKU · Quito, Ecuador',
        tag: '+1,000 L / lluvia',
        desc: 'Mobiliario urbano de infiltración pluvial que imita ecosistemas de montaña (1° lugar premio CEES).',
        x: '24%',
        y: '34%',
      },
      {
        num: '2',
        name: 'FresCura · El Salvador',
        tag: 'Geotermia Pasiva',
        desc: 'Climatización escolar subterránea sin A/C (OPAMSS + Univ. Don Bosco) con retorno desde el año 8.',
        x: '64%',
        y: '32%',
      },
      {
        num: '3',
        name: 'Agua Escolar · Renca & Provi',
        tag: '6 Escuelas IoT',
        desc: 'Monitoreo horario + economía conductual + reuso de aguas grises con kits gráficos descargables.',
        x: '44%',
        y: '70%',
      },
    ],
    ctaLabel: 'Abrir Banco de Pilotos',
    ctaTarget: 'solutions',
  },
];

interface IsometricCityStackProps {
  onNavigate: (chapter: ChapterView) => void;
}

export const IsometricCityStack: React.FC<IsometricCityStackProps> = ({ onNavigate }) => {
  const [activeLayerId, setActiveLayerId] = useState<number>(2);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number>(0);

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[1];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono-tech inline-flex items-center gap-1.5 rounded-full border border-[#0F1115]/12 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#254EDB]">
            <Layers className="h-3.5 w-3.5" />
            Arquitectura de 3 Capas · Modelo Hub
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F1115] sm:text-4xl">
            Cómo funciona una red que{' '}
            <span className="font-serif-accent italic font-normal text-[#FF4D29]">
              convierte ideas en ciudad
            </span>
          </h2>
        </div>

        {/* Layer Quick Selector */}
        <div className="flex flex-wrap gap-1.5">
          {LAYERS.map((layer) => {
            const selected = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => {
                  setActiveLayerId(layer.id);
                  setActiveHotspotIdx(0);
                }}
                className={`font-mono-tech rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                  selected
                    ? 'bg-[#0F1115] text-white shadow-md'
                    : 'border border-[#0F1115]/12 bg-white text-[#4C4A43] hover:border-[#0F1115]'
                }`}
              >
                {layer.code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid items-center gap-8 rounded-[32px] border border-[#0F1115]/10 bg-white p-6 shadow-[0_20px_60px_rgba(15,17,21,0.05)] sm:p-10 lg:grid-cols-12">
        {/* Left: Interactive 3D Isometric Cutaway Stack */}
        <div className="iso-stage relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl bg-[#F7F5F0] bg-editorial-dots py-10 lg:col-span-6">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            {LAYERS.map((layer, index) => {
              const isSelected = layer.id === activeLayerId;
              // index 0 = Capa 3 (top), index 1 = Capa 2 (mid), index 2 = Capa 1 (bottom)
              const baseOffset = (1 - index) * 62;
              const spreadOffset =
                activeLayerId === 3
                  ? index === 0
                    ? -20
                    : 26
                  : activeLayerId === 1
                    ? index === 2
                      ? 20
                      : -26
                    : 0;

              return (
                <motion.div
                  key={layer.id}
                  onClick={() => {
                    setActiveLayerId(layer.id);
                    setActiveHotspotIdx(0);
                  }}
                  animate={{
                    y: -baseOffset + spreadOffset,
                    scale: isSelected ? 1.05 : 0.96,
                    opacity: isSelected ? 1 : 0.62,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  style={{ zIndex: 10 - index }}
                  className="absolute inset-0 cursor-pointer"
                >
                  <div
                    className="iso-plane relative h-full w-full rounded-3xl border-2 backdrop-blur-md transition-shadow duration-300"
                    style={{
                      backgroundColor: isSelected ? layer.bgTint : 'rgba(255,255,255,0.72)',
                      borderColor: isSelected ? layer.accent : 'rgba(15,17,21,0.16)',
                      boxShadow: isSelected
                        ? `0 25px 45px -12px ${layer.bgTint}`
                        : '0 10px 25px rgba(15,17,21,0.06)',
                    }}
                  >
                    {/* Blueprint grid inside plate */}
                    <div
                      className="h-full w-full rounded-3xl opacity-35"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${layer.accent} 1px, transparent 1px), linear-gradient(to bottom, ${layer.accent} 1px, transparent 1px)`,
                        backgroundSize: '26px 26px',
                      }}
                    />

                    {/* Plate Tag */}
                    <span
                      className="font-mono-tech absolute bottom-3 left-4 rounded bg-[#0F1115] px-2 py-0.5 text-[10px] font-bold text-white"
                    >
                      {layer.code}
                    </span>

                    {/* Numbered Hotspots (1, 2, 3) */}
                    {layer.hotspots.map((spot, hIdx) => {
                      const activeSpot = isSelected && activeHotspotIdx === hIdx;
                      return (
                        <button
                          key={spot.num}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLayerId(layer.id);
                            setActiveHotspotIdx(hIdx);
                          }}
                          style={{
                            left: spot.x,
                            top: spot.y,
                            backgroundColor: activeSpot ? '#0F1115' : layer.accent,
                          }}
                          className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono-tech text-xs font-bold text-white shadow-lg ring-2 ring-white transition-transform hover:scale-110"
                        >
                          {spot.num}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="font-mono-tech absolute right-4 bottom-3 left-4 text-center text-[10px] text-[#6A675E]">
            Haz clic en cada plano o en los pines 1 · 2 · 3 para inspeccionar
          </p>
        </div>

        {/* Right: Active Layer Detail & Interactive Hotspots */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              <div>
                <span
                  className="font-mono-tech inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white"
                  style={{ backgroundColor: activeLayer.accent }}
                >
                  {activeLayer.code}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-[#0F1115] sm:text-3xl">
                  {activeLayer.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5B5952]">
                  {activeLayer.subtitle}
                </p>
              </div>

              {/* 3 Interactive Hotspot Cards */}
              <div className="space-y-2.5">
                {activeLayer.hotspots.map((spot, idx) => {
                  const isFocus = activeHotspotIdx === idx;
                  return (
                    <button
                      key={spot.num}
                      onClick={() => setActiveHotspotIdx(idx)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isFocus
                          ? 'border-[#0F1115] bg-[#F7F5F0] shadow-sm'
                          : 'border-[#0F1115]/10 bg-white hover:border-[#0F1115]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="flex h-6 w-6 items-center justify-center rounded-full font-mono-tech text-xs font-bold text-white"
                            style={{ backgroundColor: activeLayer.accent }}
                          >
                            {spot.num}
                          </span>
                          <span className="font-display text-sm font-bold text-[#0F1115]">
                            {spot.name}
                          </span>
                        </div>
                        <span className="font-mono-tech rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#4C4A43] ring-1 ring-[#0F1115]/10">
                          {spot.tag}
                        </span>
                      </div>
                      <p className="mt-2 pl-8 text-xs leading-relaxed text-[#4C4A43]">
                        {spot.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-1">
                <button
                  onClick={() => onNavigate(activeLayer.ctaTarget)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F1115] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#FF4D29]"
                >
                  <span>{activeLayer.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
