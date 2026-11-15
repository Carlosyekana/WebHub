import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SOLUTION_PILOTS, SolutionPilot } from '../data/hubData';

interface LoopSolutionsSectionProps {
  selectedSolution: SolutionPilot;
  onSelectSolution: (sol: SolutionPilot) => void;
  onAdoptPilot: (sol: SolutionPilot) => void;
}

const LOOP_STAGES = [
  {
    num: '1/5',
    tag: 'Detectar',
    title: 'Identificar un desafío urbano compartido',
    desc: 'En lugar de diagnosticar en solitario, la ciudad contrasta su reto con pares de 12 países que ya enfrentaron el mismo problema.',
    bullets: ['Mapeo de brechas reales', 'Cruce con 30 gobiernos locales', 'Priorización ciudadana (ICIPLAM)'],
    uiTitle: 'Radar de Desafío · Tapachula & Quito',
    uiMetric: '14 ciudades con reto similar',
    uiStatus: 'Alineación Par-a-Par',
    uiRows: [
      { label: 'Gestión hídrica en parques y escuelas', state: 'Validado' },
      { label: 'Permisos comerciales lentos', state: 'Prioritario' },
      { label: 'Calor extremo en aulas públicas', state: 'En curso' },
    ],
  },
  {
    num: '2/5',
    tag: 'Experimentar',
    title: 'Probar en un Sandbox o piloto acotado',
    desc: 'Las startups GovTech y equipos municipales testean la solución en entorno real con riesgo controlado antes de licitar a gran escala.',
    bullets: ['Marco regulatorio Sandbox Ñuñoa', 'Prototipos rápidos 60–90 días', 'Co-creación con academia'],
    uiTitle: 'Sandbox Ñuñoa · Entorno Seguro',
    uiMetric: 'IA Prefactibilidad Activa',
    uiStatus: 'Entorno Controlado',
    uiRows: [
      { label: 'Zonificación + flujos comerciales', state: 'Conectado' },
      { label: 'Evaluación Startup GovTech #04', state: 'En prueba' },
      { label: 'Riesgo presupuestario', state: 'Acotado' },
    ],
  },
  {
    num: '3/5',
    tag: 'Medir',
    title: 'Evidencia dura + cambio conductual',
    desc: 'Cada piloto combina tecnología ligera con métricas transparentes para demostrar qué funciona en la vida cotidiana de las personas.',
    bullets: ['Telemetría horaria IoT', 'Señales conductuales en terreno', 'Análisis ROI económico (Año 8–15)'],
    uiTitle: 'Telemetría · Renca & Providencia',
    uiMetric: '6 escuelas monitoreadas',
    uiStatus: 'Datos en Vivo',
    uiRows: [
      { label: 'Detección temprana de fugas', state: 'Activo' },
      { label: 'Campana diaria + pantallas vivas', state: 'Alto impacto' },
      { label: 'Reuso aguas grises lavamanos', state: 'Operando' },
    ],
  },
  {
    num: '4/5',
    tag: 'Replicar',
    title: 'Empaquetar el Playbook para otra ciudad',
    desc: 'El conocimiento no queda en un PDF olvidado: se documentan costos, plazos, planos y aprendizajes para que otra alcaldía lo adapte.',
    bullets: ['Kits gráficos y Términos de Referencia', 'Mentoría directa de la ciudad origen', 'Ahorro de meses de diseño'],
    uiTitle: 'Transferencia · YAKU Quito → LATAM',
    uiMetric: '+1,000 L retenidos / lluvia',
    uiStatus: 'Listo para Réplica',
    uiRows: [
      { label: 'Planos mobiliario urbano permeable', state: 'Abierto' },
      { label: 'Premio CEES Infraestructura', state: '1er Lugar' },
      { label: 'Sesión técnica con DMQ Quito', state: 'Disponible' },
    ],
  },
  {
    num: '5/5',
    tag: 'Escalar',
    title: 'Pasar del permiso al compromiso permanente',
    desc: 'Con el respaldo del City Science Lab MIT–UdeG, la innovación se vuelve capacidad pública institucional que trasciende cambios de gobierno.',
    bullets: ['Gobernanza multi-actor', 'Alianza Universidad–Municipio–Startup', 'Continuidad regional'],
    uiTitle: 'Infraestructura Permanente · MIT×UdeG',
    uiMetric: '30 Gobiernos · Ciclo 2026+',
    uiStatus: 'Escala Regional',
    uiRows: [
      { label: 'Convenio institucional UdeG–Hub', state: 'Firmado' },
      { label: 'Renovación Curitiba 2026–2029', state: 'Activo' },
      { label: 'Red de Cátedras (800+ prof.)', state: 'En vivo' },
    ],
  },
];

const CATEGORIES = [
  'Todas',
  'Resiliencia Hídrica',
  'GovTech & IA',
  'Energía & Clima',
  'Planeación Participativa',
  'Movilidad Sostenible',
] as const;

export const LoopSolutionsSection: React.FC<LoopSolutionsSectionProps> = ({
  selectedSolution,
  onSelectSolution,
  onAdoptPilot,
}) => {
  const [stageIdx, setStageIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [citySize, setCitySize] = useState<'small' | 'mid' | 'metro'>('mid');
  const [hasLab, setHasLab] = useState<'no' | 'yes'>('no');

  const stage = LOOP_STAGES[stageIdx];

  const filteredSolutions = useMemo(() => {
    if (activeCategory === 'Todas') return SOLUTION_PILOTS;
    return SOLUTION_PILOTS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const replicabilityEstimate = useMemo(() => {
    const baseMonths = selectedSolution.replicabilityTime.includes('2–4')
      ? 3
      : selectedSolution.replicabilityTime.includes('3–5')
        ? 4
        : selectedSolution.replicabilityTime.includes('4–6')
          ? 5
          : selectedSolution.replicabilityTime.includes('6–9')
            ? 7
            : 12;

    const adj = (citySize === 'metro' ? 1 : 0) + (hasLab === 'no' ? 2 : -1);
    const finalMonths = Math.max(2, baseMonths + adj);

    return {
      months: `${finalMonths}–${finalMonths + 2} meses`,
      roadmapStep:
        hasLab === 'no'
          ? 'Paso 1 recomendado: Sesión de alineación política + designar punto focal.'
          : 'Paso 1 recomendado: Transferencia de términos de referencia y piloto de 90 días.',
      fitScore: hasLab === 'yes' ? '92% Compatibilidad Alta' : '78% Viable con Mentoría Hub',
    };
  }, [selectedSolution, citySize, hasLab]);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 pt-4 pb-16 sm:px-6">
      {/* PART 1: Loopsii-inspired 1/5 -> 5/5 Interactive Innovation Loop */}
      <section className="rounded-[32px] border border-[#0F1115]/10 bg-white p-6 shadow-[0_20px_60px_rgba(15,17,21,0.05)] sm:p-10">
        <div className="flex flex-col justify-between gap-4 border-b border-[#ECE8DF] pb-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[#FF4D29]">
              Ciclo Vivo de Innovación · {stage.num}
            </span>
            <h2 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-[#0F1115] sm:text-4xl">
              Del desafío local al estándar regional
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {LOOP_STAGES.map((st, idx) => (
              <button
                key={st.num}
                onClick={() => setStageIdx(idx)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  stageIdx === idx
                    ? 'bg-[#0F1115] text-white'
                    : 'bg-[#F2EFE8] text-[#4C4A43] hover:text-[#0F1115]'
                }`}
              >
                {st.tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Left Narrative */}
          <div className="space-y-5 lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <span className="font-mono-tech inline-block rounded-full bg-[#254EDB]/10 px-3 py-1 text-xs font-bold text-[#254EDB]">
                  ETAPA {stage.num} · {stage.tag.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#0F1115] sm:text-3xl">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4C4A43] sm:text-base">{stage.desc}</p>
                <ul className="space-y-2 pt-1">
                  {stage.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs font-medium text-[#0F1115]">
                      <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setStageIdx((p) => (p - 1 + LOOP_STAGES.length) % LOOP_STAGES.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0F1115]/15 text-[#0F1115] transition hover:bg-[#0F1115] hover:text-white"
                aria-label="Etapa anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setStageIdx((p) => (p + 1) % LOOP_STAGES.length)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#0F1115] px-4 text-xs font-bold text-white transition hover:bg-[#FF4D29]"
              >
                <span>Siguiente etapa</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Tactile Loopsii-style Interactive Micro-UI Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22 }}
                className="rounded-3xl border border-[#0F1115]/12 bg-[#F7F5F0] bg-editorial-dots p-6"
              >
                <div className="rounded-2xl border border-[#0F1115]/10 bg-white p-5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#ECE8DF] pb-3">
                    <span className="font-display text-sm font-bold text-[#0F1115]">
                      {stage.uiTitle}
                    </span>
                    <span className="font-mono-tech rounded-full bg-[#10B981]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
                      {stage.uiStatus}
                    </span>
                  </div>

                  <div className="my-4 rounded-xl bg-[#0F1115] p-4 text-white">
                    <span className="font-mono-tech text-[10px] uppercase text-slate-400">
                      Señal en Red
                    </span>
                    <div className="mt-1 font-display text-xl font-bold text-[#FF4D29]">
                      {stage.uiMetric}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {stage.uiRows.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between rounded-xl border border-[#ECE8DF] bg-[#FAF9F6] px-3.5 py-2.5 text-xs"
                      >
                        <span className="font-medium text-[#0F1115]">{row.label}</span>
                        <span className="font-mono-tech rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-[#254EDB] ring-1 ring-[#0F1115]/10">
                          {row.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PART 2: Banco de Soluciones Replicables (Master-Detail + Simulator) */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[#254EDB]">
              Soluciones en Marcha · 6 Pilotos Validados
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-[#0F1115]">
              Banco de Soluciones Replicables
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-[#0F1115] text-white'
                    : 'border border-[#0F1115]/12 bg-white text-[#4C4A43] hover:border-[#0F1115]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Master List */}
          <div className="space-y-2.5 lg:col-span-5">
            {filteredSolutions.map((sol) => {
              const active = selectedSolution.id === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => onSelectSolution(sol)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? 'border-[#0F1115] bg-[#0F1115] text-white shadow-lg'
                      : 'border-[#0F1115]/10 bg-white text-[#0F1115] hover:border-[#0F1115]/35'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono-tech rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        active ? 'bg-[#FF4D29] text-white' : 'bg-[#F2EFE8] text-[#254EDB]'
                      }`}
                    >
                      {sol.category}
                    </span>
                    <span
                      className={`font-mono-tech text-[10px] ${
                        active ? 'text-emerald-300' : 'text-[#059669]'
                      }`}
                    >
                      {sol.maturity}
                    </span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-bold leading-snug">
                    {sol.title}
                  </h3>
                  <p className={`mt-1 text-xs ${active ? 'text-slate-300' : 'text-[#5B5952]'}`}>
                    {sol.flag} {sol.city}, {sol.country} · {sol.replicabilityTime}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Playbook + Simulator */}
          <div className="space-y-5 rounded-[28px] border border-[#0F1115]/10 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <div className="border-b border-[#ECE8DF] pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tech rounded-full bg-[#254EDB]/10 px-3 py-0.5 text-[10px] font-bold text-[#254EDB]">
                  {selectedSolution.category}
                </span>
                <span className="font-mono-tech rounded-full bg-[#10B981]/15 px-3 py-0.5 text-[10px] font-bold text-[#059669]">
                  {selectedSolution.maturity}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-[#0F1115]">
                {selectedSolution.title}
              </h3>
              <p className="mt-1 text-xs text-[#5B5952]">
                {selectedSolution.flag} {selectedSolution.city}, {selectedSolution.country} ·
                Aliados: {selectedSolution.partners.join(' · ')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl bg-[#F7F5F0] p-3">
                <div className="flex items-center gap-1 text-[10px] text-[#5B5952]">
                  <Clock className="h-3.5 w-3.5 text-[#254EDB]" />
                  <span>Despliegue</span>
                </div>
                <div className="mt-1 font-display text-sm font-bold text-[#0F1115]">
                  {selectedSolution.replicabilityTime}
                </div>
              </div>
              <div className="rounded-2xl bg-[#F7F5F0] p-3">
                <div className="flex items-center gap-1 text-[10px] text-[#5B5952]">
                  <DollarSign className="h-3.5 w-3.5 text-[#10B981]" />
                  <span>Inversión</span>
                </div>
                <div className="mt-1 font-display text-sm font-bold text-[#0F1115]">
                  {selectedSolution.budgetLevel}
                </div>
              </div>
              <div className="rounded-2xl bg-[#F7F5F0] p-3">
                <div className="flex items-center gap-1 text-[10px] text-[#5B5952]">
                  <Layers className="h-3.5 w-3.5 text-[#FF4D29]" />
                  <span>Mentora</span>
                </div>
                <div className="mt-1 font-display text-sm font-bold text-[#0F1115]">
                  {selectedSolution.city}
                </div>
              </div>
            </div>

            <div className="space-y-3.5 text-xs leading-relaxed text-[#3D3B36]">
              <div>
                <span className="font-mono-tech text-[10px] font-bold uppercase text-[#FF4D29]">
                  01 · Contexto
                </span>
                <p className="mt-1">{selectedSolution.context}</p>
              </div>
              <div>
                <span className="font-mono-tech text-[10px] font-bold uppercase text-[#254EDB]">
                  02 · Estrategia
                </span>
                <p className="mt-1">{selectedSolution.strategy}</p>
              </div>
              <div>
                <span className="font-mono-tech text-[10px] font-bold uppercase text-[#059669]">
                  03 · Resultados
                </span>
                <p className="mt-1">{selectedSolution.results}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedSolution.resources.map((res) => (
                <a
                  key={res.url}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#0F1115]/15 bg-[#F7F5F0] px-3.5 py-2 text-xs font-semibold text-[#0F1115] transition hover:border-[#0F1115]"
                >
                  <Download className="h-3.5 w-3.5 text-[#254EDB]" />
                  <span>
                    {res.label} ({res.type})
                  </span>
                </a>
              ))}
            </div>

            {/* Replicability Simulator */}
            <div className="rounded-2xl border border-[#0F1115]/10 bg-[#F7F5F0] p-5">
              <div className="font-mono-tech flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF4D29]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Simulador de Réplica Municipal</span>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-semibold text-[#4C4A43]">Población:</label>
                  <div className="mt-1 flex gap-1">
                    {[
                      { id: 'small', label: '<100k' },
                      { id: 'mid', label: '100k–500k' },
                      { id: 'metro', label: '>500k' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setCitySize(opt.id as 'small' | 'mid' | 'metro')}
                        className={`flex-1 rounded-full px-2 py-1.5 text-xs font-semibold transition ${
                          citySize === opt.id
                            ? 'bg-[#0F1115] text-white'
                            : 'bg-white text-[#4C4A43]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#4C4A43]">Equipo local:</label>
                  <div className="mt-1 flex gap-1">
                    {[
                      { id: 'no', label: 'En formación' },
                      { id: 'yes', label: 'Lab activo' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setHasLab(opt.id as 'no' | 'yes')}
                        className={`flex-1 rounded-full px-2 py-1.5 text-xs font-semibold transition ${
                          hasLab === opt.id
                            ? 'bg-[#254EDB] text-white'
                            : 'bg-white text-[#4C4A43]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-bold text-[#059669]">
                  <CheckCircle2 className="h-4 w-4" />
                  {replicabilityEstimate.fitScore}
                </span>
                <span className="font-mono-tech rounded-full bg-[#F7F5F0] px-2.5 py-0.5 text-[11px] font-bold text-[#0F1115]">
                  {replicabilityEstimate.months}
                </span>
                <p className="w-full text-[11px] text-[#5B5952]">
                  {replicabilityEstimate.roadmapStep}
                </p>
              </div>

              <button
                onClick={() => onAdoptPilot(selectedSolution)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF4D29] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#E03D1B]"
              >
                <Building2 className="h-4 w-4" />
                <span>Solicitar transferencia par-a-par con {selectedSolution.city}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
