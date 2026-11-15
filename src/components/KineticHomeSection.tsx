import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Sparkles, Video } from 'lucide-react';
import { Language } from '../data/hubData';
import { ChapterView } from '../types/os';
import { ParticleNetworkCanvas } from './ParticleNetworkCanvas';
import { IsometricCityStack } from './IsometricCityStack';

interface KineticHomeSectionProps {
  lang: Language;
  onNavigate: (chapter: ChapterView) => void;
}

const MARQUEE_CITIES = [
  '🇲🇽 Guadalajara (MIT·UdeG)',
  '🇨🇱 Ñuñoa',
  '🇪🇨 Quito',
  '🇨🇴 Medellín',
  '🇧🇷 Curitiba',
  '🇺🇾 Montevideo',
  '🇲🇽 Tapachula',
  '🇸🇻 San Salvador',
  '🇨🇴 Bogotá',
  '🇦🇷 Córdoba',
  '🇵🇪 Miraflores',
  '🇨🇱 Providencia',
  '🇨🇱 Renca',
  '🇬🇹 Ciudad de Guatemala',
  '🇨🇷 San José',
  '🇪🇨 Guayaquil',
];

export const KineticHomeSection: React.FC<KineticHomeSectionProps> = ({
  lang,
  onNavigate,
}) => {
  return (
    <div className="pb-12">
      {/* HERO: Mouse-reactive Canvas + Kinetic Typography + Floating Loopsii-style Micro-Widgets */}
      <section className="relative mx-auto mt-2 max-w-6xl overflow-hidden rounded-[36px] border border-[#0F1115]/10 bg-white px-6 py-16 shadow-[0_20px_70px_rgba(15,17,21,0.06)] sm:px-10 sm:py-24">
        <ParticleNetworkCanvas />

        {/* Floating Tactile Micro-Widget Left (Loopsii aesthetic) */}
        <motion.button
          type="button"
          onClick={() => onNavigate('network')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="animate-float-slow relative z-10 mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#0F1115]/12 bg-white/95 px-4 py-2 text-left shadow-lg backdrop-blur transition hover:border-[#FF4D29] lg:absolute lg:top-10 lg:right-10 lg:mb-0"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
          </span>
          <div className="text-xs">
            <span className="font-mono-tech block text-[9px] font-semibold uppercase text-[#6A675E]">
              Próxima sesión · 19 Nov
            </span>
            <span className="font-display font-bold text-[#0F1115]">
              Innovar sin tiempo · 420+ inscritos →
            </span>
          </div>
        </motion.button>

        {/* Floating Collaborator Cursor Chips */}
        <div className="animate-float-alt pointer-events-none absolute bottom-10 left-10 z-10 hidden items-center gap-2 rounded-full border border-[#254EDB]/25 bg-[#254EDB] px-3 py-1 text-[11px] font-semibold text-white shadow-lg lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span>Quito · YAKU +1,000L</span>
        </div>

        <div className="animate-float-slow pointer-events-none absolute right-14 bottom-14 z-10 hidden items-center gap-2 rounded-full border border-[#0F1115]/15 bg-[#0F1115] px-3 py-1 text-[11px] font-semibold text-white shadow-lg lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D29]" />
          <span>Ñuñoa · Sandbox IA Activo</span>
        </div>

        {/* Center Editorial Hero Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#0F1115]/12 bg-[#F7F5F0]/90 px-3.5 py-1 text-xs font-semibold text-[#0F1115] backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FF4D29]" />
            <span>City Science Lab MIT × Universidad de Guadalajara · Origen BID</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 font-display text-4xl leading-[1.03] font-bold tracking-tight text-[#0F1115] sm:text-6xl lg:text-[4.35rem]"
          >
            {lang === 'es' ? (
              <>
                Gobiernos del futuro,{' '}
                <span className="font-serif-accent font-normal italic text-[#254EDB]">
                  ciudades
                </span>{' '}
                aprendiendo{' '}
                <span className="underline decoration-[#FF4D29] decoration-4 underline-offset-8">
                  en red.
                </span>
              </>
            ) : (
              <>
                Governos do futuro,{' '}
                <span className="font-serif-accent font-normal italic text-[#254EDB]">
                  cidades
                </span>{' '}
                aprendendo{' '}
                <span className="underline decoration-[#FF4D29] decoration-4 underline-offset-8">
                  em rede.
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#4C4A43] sm:text-lg"
          >
            La plataforma permanente de innovación pública, GovTech y ciencia de ciudades para
            América Latina y el Caribe. No reunimos instituciones aisladas: conectamos pilotos
            validados, sandboxes municipales y talento para transformar territorios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => onNavigate('solutions')}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F1115] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#FF4D29]"
            >
              <span>Explorar Ciclo &amp; Pilotos</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('network')}
              className="inline-flex items-center gap-2 rounded-full border border-[#0F1115]/15 bg-white/90 px-6 py-3.5 text-sm font-bold text-[#0F1115] backdrop-blur transition hover:border-[#0F1115]"
            >
              <Video className="h-4 w-4 text-[#254EDB]" />
              <span>Cátedras &amp; Mapa de Red</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Infinite Smooth City Marquee */}
      <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-full border border-[#0F1115]/10 bg-white py-2.5">
        <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap px-4">
          {[...MARQUEE_CITIES, ...MARQUEE_CITIES].map((item, idx) => (
            <span
              key={idx}
              className="font-mono-tech text-xs font-medium text-[#4C4A43]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Big Bold Stat Cards (Vrbo MoreAccess-inspired oversized kinetic figures + custom geometry) */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-[28px] border border-[#0F1115]/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="font-display text-5xl font-bold tracking-tight text-[#0F1115] sm:text-6xl">
              30<span className="text-[#FF4D29]">+</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#0F1115]">
              Gobiernos locales y subnacionales en 12 países
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5B5952]">
              De México a la Patagonia y el Caribe, articulando alcaldías, laboratorios y universidades.
            </p>
            {/* Geometric mini illustration */}
            <svg viewBox="0 0 120 40" className="mt-5 h-10 w-full">
              <circle cx="16" cy="20" r="6" fill="#FF4D29" />
              <circle cx="48" cy="12" r="5" fill="#254EDB" />
              <circle cx="82" cy="26" r="6" fill="#10B981" />
              <circle cx="108" cy="14" r="4" fill="#0F1115" />
              <path
                d="M16 20 Q32 4 48 12 T82 26 T108 14"
                fill="none"
                stroke="#0F1115"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-[#0F1115]/10 bg-[#0F1115] p-7 text-white transition hover:-translate-y-1 hover:shadow-xl">
            <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
              800<span className="text-[#FF4D29]">+</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-white">
              Profesionales convocados en cátedras recientes
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              Hasta 400 asistentes simultáneos de 18 países y 120+ ciudades con Kent Larson (MIT),
              Carlos Moreno y Estonia.
            </p>
            <div className="mt-5 flex items-end gap-1.5">
              {[35, 52, 68, 84, 100].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h * 0.36}px` }}
                  className={`flex-1 rounded-t-md ${
                    i === 4 ? 'bg-[#FF4D29]' : 'bg-white/25'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-[#0F1115]/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="font-display text-5xl font-bold tracking-tight text-[#254EDB] sm:text-6xl">
              91<span className="text-[#0F1115]">%</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#0F1115]">
              De hubs municipales enfrentan brechas de financiamiento
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5B5952]">
              Por eso el Hub replica soluciones ya validadas (Yaku, FresCura, Sandbox Ñuñoa) para
              ahorrar tiempo y recursos públicos.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#F2EFE8]">
                <div className="h-full w-[91%] rounded-full bg-[#254EDB]" />
              </div>
              <span className="font-mono-tech text-[10px] font-bold text-[#254EDB]">
                DATO 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature 3-Layer Isometric Architecture Cutaway (Vrbo MoreAccess inspiration) */}
      <IsometricCityStack onNavigate={onNavigate} />

      {/* Guided 3-Step Next Actions (Vrbo MoreAccess Step 1 -> 2 -> 3 clarity) */}
      <section className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="rounded-[32px] border border-[#0F1115]/10 bg-[#0F1115] p-7 text-white sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-widest text-[#FF4D29]">
                Empieza en 3 pasos claros
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                ¿Qué quieres hacer hoy dentro del Hub?
              </h2>
            </div>
            <p className="max-w-sm text-xs text-slate-300">
              Navegación directa sin rodeos: cada paso te lleva al módulo exacto.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                step: 'Paso 01',
                title: 'Explora el ciclo y adopta un piloto validado',
                desc: 'Revisa presupuestos, tiempos de réplica y conecta con la ciudad mentora.',
                target: 'solutions' as ChapterView,
              },
              {
                step: 'Paso 02',
                title: 'Súmate a las Cátedras MIT, Estonia & Mapa Vivo',
                desc: 'Reserva cupo en la próxima sesión, envía preguntas previas y explora los 30 gobiernos.',
                target: 'network' as ChapterView,
              },
              {
                step: 'Paso 03',
                title: 'Mide tu madurez municipal y propón alianza',
                desc: 'Usa el Radar de 5 ejes y conecta tu alcaldía, startup o universidad en 1 minuto.',
                target: 'join' as ChapterView,
              },
            ].map((card) => (
              <button
                key={card.step}
                onClick={() => onNavigate(card.target)}
                className="group flex flex-col justify-between rounded-2xl border border-white/12 bg-white/5 p-5 text-left transition hover:border-[#FF4D29] hover:bg-white/10"
              >
                <div>
                  <span className="font-mono-tech text-[11px] font-bold text-[#FF4D29]">
                    {card.step}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{card.desc}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#FF4D29]">
                  <span>Ir ahora</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
