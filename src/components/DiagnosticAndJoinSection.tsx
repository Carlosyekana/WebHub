import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Building2,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Landmark,
  Plus,
  Rocket,
  Send,
  Target,
} from 'lucide-react';
import { URBAN_CHALLENGES, UrbanChallenge } from '../data/hubData';

interface DiagnosticAndJoinSectionProps {
  prefilledContext: string;
}

const AXES = [
  { id: 'mandate', short: 'Gobernanza', label: 'Respaldo & Gobernanza' },
  { id: 'budget', short: 'Recursos', label: 'Presupuesto Dedicado' },
  { id: 'sandbox', short: 'Sandbox', label: 'Reglas de Experimentación' },
  { id: 'data', short: 'City Science', label: 'Datos & Evidencia' },
  { id: 'network', short: 'Red LATAM', label: 'Transferencia entre Pares' },
] as const;

type ActorType = 'municipio' | 'startup' | 'academia' | 'organismo';

const ACTOR_PROFILES: Record<
  ActorType,
  {
    label: string;
    icon: React.FC<{ className?: string }>;
    tagline: string;
    fieldLabel: string;
    placeholder: string;
    steps: string[];
  }
> = {
  municipio: {
    label: 'Gobierno Local / Municipio',
    icon: Landmark,
    tagline: 'Integra tu ciudad a la red de 30 gobiernos, replica pilotos y designa punto focal.',
    fieldLabel: 'Desafío urbano o piloto de interés',
    placeholder: 'Ej: Queremos replicar Sandbox Ñuñoa o YAKU para captación pluvial...',
    steps: [
      'Onboarding con coordinación City Science Lab MIT–UdeG',
      'Matchmaking par-a-par con 2 ciudades mentoras de tu escala',
      'Acceso prioritario a cátedras y próximo Bootcamp',
    ],
  },
  startup: {
    label: 'Startup GovTech',
    icon: Rocket,
    tagline: 'Conecta soluciones urbanas validadas con Sandboxes municipales de América Latina.',
    fieldLabel: 'Solución tecnológica & madurez (TRL)',
    placeholder: 'Ej: Plataforma IA para permisos, sensores IoT hídricos, movilidad...',
    steps: [
      'Cruce directo con desafíos abiertos en el Radar de Ciudades',
      'Postulación a Sandboxes municipales (Hub Ñuñoa / CorLab)',
      'Invitación a Demo Days regionales (FIIEM 2026)',
    ],
  },
  academia: {
    label: 'Universidad / Lab',
    icon: GraduationCap,
    tagline: 'Articula investigación aplicada, cátedras abiertas y laboratorios territoriales.',
    fieldLabel: 'Línea de investigación vinculada',
    placeholder: 'Ej: Ciencia de ciudades, geotermia urbana, gemelos digitales...',
    steps: [
      'Articulación con City Science Lab MIT – Universidad de Guadalajara',
      'Co-diseño de cátedras y transferencia metodológica a municipios',
      'Evaluación de impacto en terreno',
    ],
  },
  organismo: {
    label: 'Organismo / Sociedad Civil',
    icon: Building2,
    tagline: 'Co-financia pilotos replicables o impulsa participación ciudadana regional.',
    fieldLabel: 'Iniciativa o alianza regional',
    placeholder: 'Ej: Financiamiento resiliencia climática, datos abiertos...',
    steps: [
      'Mesa multi-actor con gobiernos y academia',
      'Diseño de convocatorias escalables en 12 países',
      'Reportes de impacto regional',
    ],
  },
};

export const DiagnosticAndJoinSection: React.FC<DiagnosticAndJoinSectionProps> = ({
  prefilledContext,
}) => {
  // Radar Diagnostic state
  const [scores, setScores] = useState<Record<string, number>>({
    mandate: 2,
    budget: 1,
    sandbox: 2,
    data: 2,
    network: 3,
  });

  // Matchmaking state
  const [challenges, setChallenges] = useState<UrbanChallenge[]>(URBAN_CHALLENGES);
  const [connectedChallenges, setConnectedChallenges] = useState<string[]>([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // Onboarding state
  const [actor, setActor] = useState<ActorType>('municipio');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledContext) {
      setDetail(prefilledContext);
      setSubmitted(false);
    }
  }, [prefilledContext]);

  const radarPoints = useMemo(() => {
    const cx = 110;
    const cy = 110;
    const maxR = 70;
    return AXES.map((axis, idx) => {
      const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
      const val = scores[axis.id] || 1;
      const r = (val / 3) * maxR;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        lx: cx + (maxR + 20) * Math.cos(angle),
        ly: cy + (maxR + 18) * Math.sin(angle),
        axis,
      };
    });
  }, [scores]);

  const polygonPath = radarPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const pct = Math.round((totalScore / 15) * 100);

  const profile = useMemo(() => {
    if (pct <= 53) {
      return {
        tier: 'Etapa 1 · Permiso Inicial',
        color: 'text-[#FF4D29]',
        recommendation:
          'Prioriza victorias rápidas de bajo costo (piloto Agua en Escuelas Renca–Providencia) y diseña institucionalidad básica como ICIPLAM Tapachula.',
      };
    }
    if (pct <= 78) {
      return {
        tier: 'Etapa 2 · Laboratorio en Consolidación',
        color: 'text-[#254EDB]',
        recommendation:
          'Institucionaliza reglas de experimentación (Sandbox Ñuñoa) y articula alianzas GovTech como CorLab Córdoba.',
      };
    }
    return {
      tier: 'Etapa 3 · Compromiso Institucional',
      color: 'text-[#059669]',
      recommendation:
        'Tu ciudad puede actuar como Ciudad Mentora y co-investigar con City Science Lab MIT–UdeG.',
    };
  }, [pct]);

  const handleConnect = (id: string) => {
    if (connectedChallenges.includes(id)) return;
    setConnectedChallenges((prev) => [...prev, id]);
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, interestedCount: c.interestedCount + 1 } : c))
    );
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity.trim() || !newTitle.trim()) return;
    setChallenges((prev) => [
      {
        id: `ch-${Date.now()}`,
        city: newCity.trim(),
        country: 'LATAM',
        flag: '📍',
        title: newTitle.trim(),
        domain: 'GovTech & IA',
        seeking: ['Ciudades mentoras', 'Startups GovTech'],
        urgency: 'Convocatoria Abierta',
        interestedCount: 1,
      },
      ...prev,
    ]);
    setNewCity('');
    setNewTitle('');
    setShowNewForm(false);
  };

  const actorProfile = ACTOR_PROFILES[actor];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 pt-4 pb-16 sm:px-6">
      {/* PART 1: 5-Axis Radar + Matchmaking */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Live SVG Radar */}
        <div className="flex flex-col justify-between rounded-[28px] border border-[#0F1115]/10 bg-white p-6 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#ECE8DF] pb-4">
              <div>
                <span className="font-mono-tech flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#254EDB]">
                  <Activity className="h-3.5 w-3.5" />
                  Diagnóstico · Permiso vs Compromiso
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#0F1115]">
                  Radar de Madurez Municipal
                </h2>
              </div>
              <div className="text-right">
                <span className="font-display text-3xl font-bold text-[#0F1115]">{pct}%</span>
                <p className={`font-mono-tech text-[10px] font-bold ${profile.color}`}>
                  {profile.tier}
                </p>
              </div>
            </div>

            <div className="mt-5 grid items-center gap-4 sm:grid-cols-12">
              <div className="flex justify-center rounded-2xl bg-[#0B0E14] p-3 sm:col-span-6">
                <svg viewBox="0 0 220 220" className="h-52 w-52">
                  {[1, 2, 3].map((ring) => {
                    const pts = AXES.map((_, idx) => {
                      const a = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
                      const r = (ring / 3) * 70;
                      return `${110 + r * Math.cos(a)},${110 + r * Math.sin(a)}`;
                    }).join(' ');
                    return (
                      <polygon
                        key={ring}
                        points={pts}
                        fill="none"
                        stroke="#2A3346"
                        strokeWidth="1"
                      />
                    );
                  })}
                  {AXES.map((_, idx) => {
                    const a = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
                    return (
                      <line
                        key={idx}
                        x1="110"
                        y1="110"
                        x2={110 + 70 * Math.cos(a)}
                        y2={110 + 70 * Math.sin(a)}
                        stroke="#2A3346"
                        strokeWidth="1"
                      />
                    );
                  })}
                  <polygon
                    points={polygonPath}
                    fill="rgba(255, 77, 41, 0.28)"
                    stroke="#FF4D29"
                    strokeWidth="2.2"
                    className="transition-all duration-300"
                  />
                  {radarPoints.map((p) => (
                    <g key={p.axis.id}>
                      <circle cx={p.x} cy={p.y} r="3.5" fill="#FFF" stroke="#FF4D29" strokeWidth="2" />
                      <text
                        x={p.lx}
                        y={p.ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill="#E2E8F0"
                      >
                        {p.axis.short}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="space-y-2.5 sm:col-span-6">
                {AXES.map((axis) => (
                  <div key={axis.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0F1115]">{axis.label}</span>
                      <span className="font-mono-tech text-[11px] font-bold text-[#FF4D29]">
                        {scores[axis.id]}/3
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { val: 1, label: 'Inicial' },
                        { val: 2, label: 'En curso' },
                        { val: 3, label: 'Sólido' },
                      ].map((lvl) => (
                        <button
                          key={lvl.val}
                          onClick={() =>
                            setScores((prev) => ({ ...prev, [axis.id]: lvl.val }))
                          }
                          className={`rounded-full py-1 text-[10px] font-semibold transition ${
                            scores[axis.id] === lvl.val
                              ? 'bg-[#0F1115] text-white'
                              : 'bg-[#F7F5F0] text-[#4C4A43]'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[#F7F5F0] p-4">
            <p className="text-xs leading-relaxed text-[#3D3B36]">{profile.recommendation}</p>
            <button
              onClick={() =>
                setDetail(
                  `Diagnóstico Radar (${pct}% - ${profile.tier}): ${profile.recommendation}`
                )
              }
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#0F1115] px-4 py-2 text-xs font-bold text-white hover:bg-[#FF4D29]"
            >
              <span>Adjuntar resultado a mi solicitud abajo ↓</span>
            </button>
          </div>
        </div>

        {/* Matchmaking Board */}
        <div className="rounded-[28px] border border-[#0F1115]/10 bg-white p-6 lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE8DF] pb-4">
            <div>
              <span className="font-mono-tech flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#FF4D29]">
                <Target className="h-3.5 w-3.5" />
                Matchmaking Ciudad ↔ Startup
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-[#0F1115]">
                Desafíos Urbanos Abiertos
              </h2>
            </div>
            <button
              onClick={() => setShowNewForm((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full bg-[#0F1115] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#FF4D29]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Publicar Reto</span>
            </button>
          </div>

          {showNewForm && (
            <form
              onSubmit={handleCreateChallenge}
              className="mt-3 space-y-2 rounded-2xl bg-[#F7F5F0] p-3.5"
            >
              <input
                type="text"
                required
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Tu ciudad (ej. Cali)"
                className="w-full rounded-full border border-[#0F1115]/15 bg-white px-4 py-2 text-xs focus:outline-none"
              />
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Describe el desafío urbano..."
                className="w-full rounded-full border border-[#0F1115]/15 bg-white px-4 py-2 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[#FF4D29] px-4 py-1.5 text-xs font-bold text-white"
              >
                Publicar en Radar
              </button>
            </form>
          )}

          <div className="mt-4 space-y-3">
            {challenges.map((ch) => {
              const isConn = connectedChallenges.includes(ch.id);
              return (
                <div key={ch.id} className="rounded-2xl bg-[#F7F5F0] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0F1115]">
                      {ch.flag} {ch.city}
                    </span>
                    <span className="font-mono-tech rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#254EDB]">
                      {ch.domain}
                    </span>
                  </div>
                  <h4 className="mt-1.5 font-display text-sm font-bold text-[#0F1115]">
                    {ch.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-mono-tech text-[11px] text-[#5B5952]">
                      {ch.interestedCount} aliados conectados
                    </span>
                    <button
                      onClick={() => handleConnect(ch.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                        isConn
                          ? 'bg-[#10B981] text-white'
                          : 'bg-white text-[#0F1115] hover:bg-[#0F1115] hover:text-white'
                      }`}
                    >
                      {isConn ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Postulado</span>
                        </>
                      ) : (
                        <>
                          <Handshake className="h-3.5 w-3.5 text-[#FF4D29]" />
                          <span>Proponer alianza</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 2: Segmented Onboarding */}
      <section className="rounded-[32px] border border-[#0F1115]/10 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-6">
          <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[#FF4D29]">
            Paso Final · Conexión Directa
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold text-[#0F1115]">
            Súmate al Ecosistema Hub de Ciudades
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(ACTOR_PROFILES) as ActorType[]).map((key) => {
                const item = ACTOR_PROFILES[key];
                const Icon = item.icon;
                const active = actor === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActor(key);
                      setSubmitted(false);
                    }}
                    className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                      active
                        ? 'border-[#0F1115] bg-[#0F1115] text-white'
                        : 'border-[#0F1115]/10 bg-[#F7F5F0] text-[#0F1115] hover:border-[#0F1115]/40'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? 'text-[#FF4D29]' : 'text-[#254EDB]'}`} />
                    <span className="font-display text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[#F7F5F0] p-5">
              <p className="text-xs leading-relaxed text-[#3D3B36]">{actorProfile.tagline}</p>
              <ul className="mt-4 space-y-2">
                {actorProfile.steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-[#0F1115]">
                    <span className="font-mono-tech flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#FF4D29]">
                      0{i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F7F5F0] p-6 lg:col-span-7">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo *"
                    className="rounded-full border border-[#0F1115]/15 bg-white px-4 py-2.5 text-xs focus:border-[#0F1115] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Ciudad / Institución *"
                    className="rounded-full border border-[#0F1115]/15 bg-white px-4 py-2.5 text-xs focus:border-[#0F1115] focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo institucional *"
                  className="w-full rounded-full border border-[#0F1115]/15 bg-white px-4 py-2.5 text-xs focus:border-[#0F1115] focus:outline-none"
                />
                <textarea
                  rows={4}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder={actorProfile.placeholder}
                  className="w-full rounded-2xl border border-[#0F1115]/15 bg-white p-4 text-xs focus:border-[#0F1115] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF4D29] px-6 py-3.5 text-xs font-bold text-white transition hover:bg-[#E03D1B]"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar solicitud ({actorProfile.label})</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 text-[#059669]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-[#0F1115]">
                  ¡Solicitud registrada para {org || name}!
                </h3>
                <p className="mt-2 max-w-md text-xs text-[#4C4A43]">
                  Tu perfil ({actorProfile.label}) quedó enrutado al equipo de coordinación del{' '}
                  <strong>City Science Lab MIT–UdeG</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full border border-[#0F1115]/20 bg-white px-4 py-2 text-xs font-bold text-[#0F1115]"
                >
                  Enviar otra consulta
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
