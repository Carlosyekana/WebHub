import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  GitBranch,
  Globe,
  Layers,
  MapPin,
  MessageSquarePlus,
  RotateCw,
  Search,
  Users,
  Video,
} from 'lucide-react';
import {
  BOOTCAMP_EDITIONS,
  CITY_NODES,
  CityNode,
  GLOSSARY_CARDS,
  LIVE_SESSIONS,
  LiveSession,
} from '../data/hubData';

interface SessionsAndMapSectionProps {
  selectedCity: CityNode;
  onSelectCity: (city: CityNode) => void;
  onConnectWithCity: (city: CityNode) => void;
}

const TIMEZONES = [
  { id: 'mx', label: 'CDMX / GDL', offset: -6 },
  { id: 'co', label: 'Bogotá / Quito / Lima', offset: -5 },
  { id: 'cl', label: 'Santiago', offset: -3 },
  { id: 'ar', label: 'São Paulo / BA / MVD', offset: -3 },
];

const INITIAL_POLL = [
  { id: 'budget', label: 'Falta de presupuesto / fondo dedicado', votes: 48 },
  { id: 'silos', label: 'Silos administrativos internos', votes: 34 },
  { id: 'rules', label: 'Rigidez normativa para pilotar con startups', votes: 29 },
  { id: 'time', label: 'Falta de tiempo y equipo disponible', votes: 41 },
];

type RegionPreset = 'all' | 'north' | 'andean' | 'south';
const REGION_VIEWBOX: Record<RegionPreset, { vb: string; label: string }> = {
  all: { vb: '0 0 100 100', label: 'Toda LATAM' },
  north: { vb: '8 5 42 42', label: 'MX & Centroamérica' },
  andean: { vb: '34 34 32 34', label: 'Eje Andino' },
  south: { vb: '40 64 46 35', label: 'Cono Sur & BR' },
};

export const SessionsAndMapSection: React.FC<SessionsAndMapSectionProps> = ({
  selectedCity,
  onSelectCity,
  onConnectWithCity,
}) => {
  const [selectedTz, setSelectedTz] = useState(TIMEZONES[1]);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [questionDraft, setQuestionDraft] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([
    '¿Cómo armar un Sandbox municipal si el equipo de innovación es de solo 2 personas?',
  ]);
  const [pollOptions, setPollOptions] = useState(INITIAL_POLL);
  const [votedPollId, setVotedPollId] = useState<string | null>(null);
  const [activeTakeawayId, setActiveTakeawayId] = useState<string>('catedra-carlos-moreno');
  const [flippedGlossary, setFlippedGlossary] = useState<Record<string, boolean>>({});

  // Map & Directory state
  const [mapMode, setMapMode] = useState<'network' | 'flows'>('network');
  const [region, setRegion] = useState<RegionPreset>('all');
  const [selectedYear, setSelectedYear] = useState('2026–2027');
  const [countryFilter, setCountryFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const formatLocalHour = (utcHour: number) => {
    const local = (utcHour + selectedTz.offset + 24) % 24;
    return `${local.toString().padStart(2, '0')}:00 h`;
  };

  const handleRegister = (session: LiveSession) => {
    if (!registeredIds.includes(session.id)) {
      setRegisteredIds((prev) => [...prev, session.id]);
    }
  };

  const handleVote = (id: string) => {
    if (votedPollId) return;
    setVotedPollId(id);
    setPollOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o))
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionDraft.trim()) return;
    setSubmittedQuestions((prev) => [questionDraft.trim(), ...prev]);
    setQuestionDraft('');
  };

  const edges = useMemo(() => {
    const pairs: { from: CityNode; to: CityNode; key: string; active: boolean }[] = [];
    const seen = new Set<string>();
    CITY_NODES.forEach((city) => {
      city.connectedTo.forEach((targetId) => {
        const pairKey = [city.id, targetId].sort().join('--');
        if (seen.has(pairKey)) return;
        const target = CITY_NODES.find((c) => c.id === targetId);
        if (!target) return;
        seen.add(pairKey);
        const isHighlighted = selectedCity.id === city.id || selectedCity.id === target.id;
        pairs.push({ from: city, to: target, key: pairKey, active: isHighlighted });
      });
    });
    return pairs;
  }, [selectedCity]);

  const totalVotes = pollOptions.reduce((sum, o) => sum + o.votes, 0);
  const upcomingSessions = LIVE_SESSIONS.filter((s) => s.status !== 'on-demand');
  const onDemandSessions = LIVE_SESSIONS.filter((s) => s.status === 'on-demand');
  const activeBootcamp =
    BOOTCAMP_EDITIONS.find((b) => b.year === selectedYear) || BOOTCAMP_EDITIONS[3];

  const countries = useMemo(
    () => ['Todos', ...Array.from(new Set(CITY_NODES.map((c) => c.country)))],
    []
  );

  const filteredCities = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return CITY_NODES.filter((c) => {
      const byCountry = countryFilter === 'Todos' || c.country === countryFilter;
      const byText =
        !q ||
        c.city.toLowerCase().includes(q) ||
        c.labName.toLowerCase().includes(q) ||
        c.focalPoints.some((fp) => fp.name.toLowerCase().includes(q));
      return byCountry && byText;
    });
  }, [countryFilter, searchTerm]);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 pt-4 pb-16 sm:px-6">
      {/* PART 1: Cátedras & Sesiones Activas */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[#FF4D29]">
              Agenda Viva &amp; Cátedras Magistrales
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-[#0F1115] sm:text-4xl">
              Sesiones donde la red{' '}
              <span className="font-serif-accent font-normal italic text-[#254EDB]">
                piensa en vivo
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-[#0F1115]/10 bg-white px-3 py-1.5">
            <Globe className="h-3.5 w-3.5 text-[#254EDB]" />
            {TIMEZONES.map((tz) => (
              <button
                key={tz.id}
                onClick={() => setSelectedTz(tz)}
                className={`font-mono-tech rounded-full px-2.5 py-1 text-[10px] font-semibold transition ${
                  selectedTz.id === tz.id
                    ? 'bg-[#0F1115] text-white'
                    : 'text-[#4C4A43] hover:text-[#0F1115]'
                }`}
              >
                {tz.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            {upcomingSessions.map((ses) => {
              const isReg = registeredIds.includes(ses.id);
              return (
                <div
                  key={ses.id}
                  className="rounded-[28px] border border-[#0F1115]/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`font-mono-tech rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                        ses.status === 'upcoming'
                          ? 'bg-[#10B981]/15 text-[#059669]'
                          : 'bg-[#FF4D29]/15 text-[#FF4D29]'
                      }`}
                    >
                      {ses.status === 'upcoming' ? '● Próxima Online' : '★ Cumbre Internacional'}
                    </span>
                    <span className="font-mono-tech text-[11px] font-semibold text-[#5B5952]">
                      {ses.attendeesCount} · {ses.countriesCount}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold text-[#0F1115] sm:text-2xl">
                    {ses.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C4A43]">{ses.subtitle}</p>

                  <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-2xl bg-[#F7F5F0] px-3.5 py-2.5 font-medium text-[#0F1115]">
                      <Calendar className="h-4 w-4 text-[#FF4D29]" />
                      <span>{ses.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl bg-[#F7F5F0] px-3.5 py-2.5 text-[#0F1115]">
                      <Clock className="h-4 w-4 text-[#254EDB]" />
                      <span>
                        <strong>{formatLocalHour(ses.baseHourUTC)}</strong> ({selectedTz.label})
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#ECE8DF] pt-4">
                    <div>
                      <p className="text-xs font-bold text-[#0F1115]">{ses.speaker}</p>
                      <p className="text-[11px] text-[#5B5952]">{ses.speakerRole}</p>
                    </div>
                    <button
                      onClick={() => handleRegister(ses)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition ${
                        isReg
                          ? 'bg-[#10B981] text-white'
                          : 'bg-[#0F1115] text-white hover:bg-[#FF4D29]'
                      }`}
                    >
                      {isReg ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Cupo reservado</span>
                        </>
                      ) : (
                        <>
                          <Video className="h-4 w-4" />
                          <span>Reservar cupo en 1 clic</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Poll + Q&A */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-[28px] border border-[#0F1115]/10 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#254EDB]">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Pulso en Vivo
                </span>
                <span className="font-mono-tech text-[10px] text-[#5B5952]">{totalVotes} votos</span>
              </div>
              <h4 className="mt-2 font-display text-base font-bold text-[#0F1115]">
                ¿Cuál es el mayor freno hoy en tu municipio?
              </h4>
              <div className="mt-3 space-y-2">
                {pollOptions.map((opt) => {
                  const share = Math.round((opt.votes / totalVotes) * 100);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVote(opt.id)}
                      className="relative w-full overflow-hidden rounded-xl border border-[#0F1115]/10 bg-[#F7F5F0] p-2.5 text-left text-xs transition hover:border-[#0F1115]"
                    >
                      <div
                        className="absolute inset-y-0 left-0 bg-[#254EDB]/12 transition-all duration-500"
                        style={{ width: votedPollId ? `${share}%` : '0%' }}
                      />
                      <div className="relative flex items-center justify-between gap-2">
                        <span className="font-medium text-[#0F1115]">{opt.label}</span>
                        {votedPollId && (
                          <span className="font-mono-tech font-bold text-[#254EDB]">{share}%</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#0F1115]/10 bg-white p-6">
              <span className="font-mono-tech flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#FF4D29]">
                <MessageSquarePlus className="h-3.5 w-3.5" />
                Preguntas Previas al Ponente
              </span>
              <form onSubmit={handleAddQuestion} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={questionDraft}
                  onChange={(e) => setQuestionDraft(e.target.value)}
                  placeholder="Tu pregunta para el 19 Nov..."
                  className="flex-1 rounded-full border border-[#0F1115]/15 bg-[#F7F5F0] px-4 py-2 text-xs focus:border-[#0F1115] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#0F1115] px-4 py-2 text-xs font-bold text-white hover:bg-[#FF4D29]"
                >
                  Enviar
                </button>
              </form>
              <div className="mt-3 max-h-32 space-y-2 overflow-y-auto">
                {submittedQuestions.map((q, i) => (
                  <div key={i} className="rounded-xl bg-[#F7F5F0] p-3 text-xs text-[#3D3B36]">
                    “{q}”
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cátedras On-Demand */}
        <div className="grid gap-4 md:grid-cols-3">
          {onDemandSessions.map((ses) => {
            const expanded = activeTakeawayId === ses.id;
            return (
              <div
                key={ses.id}
                className="flex flex-col justify-between rounded-[24px] border border-[#0F1115]/10 bg-white p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech rounded-full bg-[#F2EFE8] px-2.5 py-0.5 text-[10px] font-bold text-[#254EDB]">
                      {ses.format}
                    </span>
                    <span className="font-mono-tech text-[10px] font-bold text-[#059669]">
                      {ses.attendeesCount}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-[#0F1115]">{ses.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5B5952]">{ses.subtitle}</p>
                  <p className="mt-3 text-xs font-bold text-[#0F1115]">{ses.speaker}</p>

                  {expanded && (
                    <ul className="mt-3 space-y-1.5 border-t border-[#ECE8DF] pt-3 text-xs text-[#3D3B36]">
                      {ses.keyTakeaways.map((tk) => (
                        <li key={tk} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D29]" />
                          <span>{tk}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={() => setActiveTakeawayId(expanded ? '' : ses.id)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#254EDB] hover:text-[#FF4D29]"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{expanded ? 'Ocultar síntesis' : 'Leer síntesis clave'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Fácil y Simple Interactive Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GLOSSARY_CARDS.map((card) => {
            const flipped = !!flippedGlossary[card.id];
            return (
              <button
                key={card.id}
                onClick={() =>
                  setFlippedGlossary((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
                }
                className="flex min-h-[200px] flex-col justify-between rounded-[24px] border border-[#0F1115]/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
              >
                {!flipped ? (
                  <>
                    <div>
                      <span className="font-mono-tech rounded-full bg-[#FF4D29]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#FF4D29]">
                        {card.tag}
                      </span>
                      <h4 className="mt-3 font-display text-base font-bold text-[#0F1115]">
                        {card.term}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#4C4A43]">
                        {card.shortDef}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#254EDB]">
                      <span>Girar carta</span>
                      <RotateCw className="h-3.5 w-3.5" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <span className="font-mono-tech text-[10px] font-bold uppercase text-[#059669]">
                        Caso Real
                      </span>
                      <p className="text-xs text-[#0F1115]">{card.cityExample}</p>
                      <div className="rounded-xl bg-[#F7F5F0] p-2.5 text-[11px]">
                        <strong className="text-[#254EDB]">{card.quizQuestion}</strong>
                        <p className="mt-1 text-[#4C4A43]">{card.quizAnswer}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#5B5952]">
                      <span>Volver</span>
                      <RotateCw className="h-3.5 w-3.5" />
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* PART 2: Spatial Network Map + City Inspector */}
      <section className="space-y-5">
        <div>
          <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[#254EDB]">
            Geografía de la Red · 30 Gobiernos · 12 Países
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-[#0F1115]">
            Mapa Vivo &amp; Bootcamps Regionales
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Obsidian Interactive Map */}
          <div className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#0B0E14] bg-spatial-grid p-5 text-white lg:col-span-7">
            <div className="z-10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(REGION_VIEWBOX) as RegionPreset[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setRegion(key)}
                    className={`font-mono-tech rounded-full px-3 py-1 text-[10px] font-semibold transition ${
                      region === key
                        ? 'bg-[#FF4D29] text-white'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {REGION_VIEWBOX[key].label}
                  </button>
                ))}
              </div>
              <div className="flex rounded-full bg-white/10 p-0.5 text-[11px]">
                <button
                  onClick={() => setMapMode('network')}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
                    mapMode === 'network' ? 'bg-white text-[#0F1115]' : 'text-slate-300'
                  }`}
                >
                  <Layers className="h-3 w-3" />
                  Nodos
                </button>
                <button
                  onClick={() => setMapMode('flows')}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${
                    mapMode === 'flows' ? 'bg-[#FF4D29] text-white' : 'text-slate-300'
                  }`}
                >
                  <GitBranch className="h-3 w-3" />
                  Flujos
                </button>
              </div>
            </div>

            <div className="my-2 flex-1">
              <svg
                viewBox={REGION_VIEWBOX[region].vb}
                className="h-full max-h-[420px] w-full select-none"
              >
                <path
                  d="M 10,12 L 24,11 L 30,17 L 28,24 L 34,27 L 36,31 L 41,37 L 44,41 L 41,42 L 36,37 L 31,34 L 27,31 L 20,27 L 15,20 Z"
                  fill="#141A26"
                  stroke="#2E3A52"
                  strokeWidth="0.4"
                />
                <path
                  d="M 38,24 L 46,23 L 48,25 L 41,26 Z M 50,26 L 54,26 L 53,28 L 49,27 Z"
                  fill="#141A26"
                  stroke="#2E3A52"
                  strokeWidth="0.35"
                />
                <path
                  d="M 44,41 L 54,39 L 64,42 L 77,48 L 83,56 L 79,68 L 72,76 L 64,83 L 57,89 L 51,95 L 47,94 L 46,84 L 45,73 L 43,62 L 39,55 L 41,47 Z"
                  fill="#141A26"
                  stroke="#2E3A52"
                  strokeWidth="0.4"
                />

                {edges.map((edge) => {
                  const midX = (edge.from.x + edge.to.x) / 2 + (edge.from.y - edge.to.y) * 0.14;
                  const midY =
                    (edge.from.y + edge.to.y) / 2 - Math.abs(edge.from.x - edge.to.x) * 0.12;
                  const animated = mapMode === 'flows' || edge.active;
                  return (
                    <path
                      key={edge.key}
                      d={`M ${edge.from.x} ${edge.from.y} Q ${midX} ${midY} ${edge.to.x} ${edge.to.y}`}
                      fill="none"
                      stroke={edge.active ? '#FF4D29' : mapMode === 'flows' ? '#38BDF8' : '#334155'}
                      strokeWidth={edge.active ? 0.65 : 0.28}
                      strokeOpacity={edge.active ? 0.95 : 0.4}
                      strokeDasharray={animated ? '2.2 1.5' : undefined}
                      className={animated ? 'animate-dash-flow' : undefined}
                    />
                  );
                })}

                {CITY_NODES.map((node) => {
                  const isSel = selectedCity.id === node.id;
                  const isConn = selectedCity.connectedTo.includes(node.id);
                  const fill =
                    node.type === 'hub-host'
                      ? '#FF4D29'
                      : node.type === 'mentor-city'
                        ? '#38BDF8'
                        : '#10B981';

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => onSelectCity(node)}
                    >
                      {isSel && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="3.8"
                          fill="none"
                          stroke="#FF4D29"
                          strokeWidth="0.45"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSel ? 1.9 : isConn ? 1.45 : 1.15}
                        fill={isSel ? '#FFFFFF' : fill}
                      />
                      {(isSel || isConn || node.type === 'hub-host' || region !== 'all') && (
                        <text
                          x={node.x + 2.1}
                          y={node.y + 0.8}
                          fontSize={region === 'all' ? (isSel ? '2.9' : '2.2') : '1.7'}
                          fontWeight={isSel ? '700' : '500'}
                          fill={isSel ? '#FFFFFF' : '#CBD5E1'}
                          className="pointer-events-none"
                        >
                          {node.city.split(' ')[0]}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* City Inspector */}
          <div className="flex flex-col justify-between rounded-[28px] border border-[#0F1115]/10 bg-white p-6 lg:col-span-5">
            <div className="space-y-4">
              <div className="border-b border-[#ECE8DF] pb-3">
                <span className="font-mono-tech inline-flex items-center gap-1 rounded-full bg-[#FF4D29]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#FF4D29]">
                  <MapPin className="h-3 w-3" />
                  {selectedCity.highlightMetric}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#0F1115]">
                  {selectedCity.flag} {selectedCity.city}
                </h3>
                <p className="text-xs text-[#5B5952]">{selectedCity.country}</p>
              </div>

              <div className="rounded-2xl bg-[#F7F5F0] p-3.5 text-xs">
                <span className="font-mono-tech text-[9px] font-bold uppercase text-[#5B5952]">
                  Laboratorio
                </span>
                <p className="mt-0.5 font-semibold text-[#0F1115]">{selectedCity.labName}</p>
              </div>

              <div className="space-y-2">
                {selectedCity.focalPoints.map((fp) => (
                  <div key={fp.name} className="flex items-start gap-2 text-xs">
                    <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#254EDB]" />
                    <div>
                      <p className="font-bold text-[#0F1115]">{fp.name}</p>
                      <p className="text-[11px] text-[#5B5952]">{fp.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-1.5">
                {selectedCity.activePilots.map((pilot) => (
                  <li key={pilot} className="flex items-start gap-1.5 text-xs text-[#3D3B36]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                    <span>{pilot}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onConnectWithCity(selectedCity)}
              className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0F1115] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#FF4D29]"
            >
              <span>Solicitar intercambio con {selectedCity.city}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bootcamps Timeline */}
        <div className="rounded-[28px] border border-[#0F1115]/10 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECE8DF] pb-4">
            <h3 className="font-display text-xl font-bold text-[#0F1115]">
              Bootcamps Anuales · De São Paulo 2023 a MIT–UdeG 2026+
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {BOOTCAMP_EDITIONS.map((b) => (
                <button
                  key={b.year}
                  onClick={() => setSelectedYear(b.year)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    selectedYear === b.year
                      ? 'bg-[#0F1115] text-white'
                      : 'bg-[#F2EFE8] text-[#4C4A43] hover:text-[#0F1115]'
                  }`}
                >
                  {b.flag} {b.year}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-12">
            <div className="space-y-2 md:col-span-8">
              <span className="font-mono-tech text-[10px] font-bold uppercase text-[#FF4D29]">
                {activeBootcamp.edition} · {activeBootcamp.participants}
              </span>
              <h4 className="font-display text-2xl font-bold text-[#0F1115]">
                {activeBootcamp.flag} {activeBootcamp.city}, {activeBootcamp.country}
              </h4>
              <p className="text-sm font-semibold text-[#254EDB]">{activeBootcamp.theme}</p>
              <ul className="space-y-1.5 pt-1">
                {activeBootcamp.highlights.map((hl) => (
                  <li key={hl} className="flex items-start gap-2 text-xs text-[#3D3B36]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-[#F7F5F0] p-4 md:col-span-4">
              <div>
                <p className="font-mono-tech text-[10px] font-bold uppercase text-[#5B5952]">
                  Anfitriones
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activeBootcamp.hosts.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0F1115]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              {activeBootcamp.videoUrl && (
                <a
                  href={activeBootcamp.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0F1115] px-4 py-2 text-xs font-bold text-white hover:bg-[#FF4D29]"
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Ver video oficial</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Directory Search */}
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-1.5">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setCountryFilter(c)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    countryFilter === c
                      ? 'bg-[#0F1115] text-white'
                      : 'border border-[#0F1115]/12 bg-white text-[#4C4A43]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative md:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-[#5B5952]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar ciudad o referente..."
                className="w-full rounded-full border border-[#0F1115]/15 bg-white py-2 pr-4 pl-9 text-xs focus:border-[#0F1115] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCities.map((city) => (
              <div
                key={city.id}
                className="flex flex-col justify-between rounded-[24px] border border-[#0F1115]/10 bg-white p-5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs text-[#5B5952]">
                        {city.flag} {city.country}
                      </span>
                      <h4 className="font-display text-lg font-bold text-[#0F1115]">{city.city}</h4>
                    </div>
                    <span className="font-mono-tech rounded-full bg-[#F2EFE8] px-2.5 py-0.5 text-[10px] font-bold text-[#254EDB]">
                      {city.highlightMetric}
                    </span>
                  </div>
                  <p className="mt-2 rounded-xl bg-[#F7F5F0] p-2.5 text-xs font-medium text-[#0F1115]">
                    {city.labName}
                  </p>
                  <div className="mt-3 space-y-1">
                    {city.focalPoints.map((fp) => (
                      <p key={fp.name} className="text-xs text-[#4C4A43]">
                        <strong className="text-[#0F1115]">{fp.name}</strong> · {fp.role}
                      </p>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onConnectWithCity(city)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-full border border-[#0F1115]/15 py-2 text-xs font-bold text-[#0F1115] transition hover:bg-[#0F1115] hover:text-white"
                >
                  <span>Conectar vía Hub</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
