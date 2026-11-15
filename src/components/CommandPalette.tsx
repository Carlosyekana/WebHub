import React, { useEffect, useMemo, useState } from 'react';
import { Search, X, MapPin, Lightbulb, Video, Target, ArrowUpRight, Compass } from 'lucide-react';
import {
  CITY_NODES,
  SOLUTION_PILOTS,
  LIVE_SESSIONS,
  URBAN_CHALLENGES,
  CityNode,
  SolutionPilot,
} from '../data/hubData';
import { CHAPTER_NAV, ChapterView } from '../types/os';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchChapter: (chapter: ChapterView) => void;
  onSelectCity: (city: CityNode) => void;
  onSelectSolution: (solution: SolutionPilot) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSwitchChapter,
  onSelectCity,
  onSelectSolution,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const chapters = CHAPTER_NAV.filter(
      (c) => !q || c.labelEs.toLowerCase().includes(q)
    );

    const cities = CITY_NODES.filter(
      (c) =>
        !q ||
        c.city.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.labName.toLowerCase().includes(q) ||
        c.focalPoints.some((fp) => fp.name.toLowerCase().includes(q))
    ).slice(0, 5);

    const solutions = SOLUTION_PILOTS.filter(
      (s) =>
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    ).slice(0, 4);

    const sessions = LIVE_SESSIONS.filter(
      (s) =>
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 3);

    const challenges = URBAN_CHALLENGES.filter(
      (ch) =>
        !q ||
        ch.title.toLowerCase().includes(q) ||
        ch.city.toLowerCase().includes(q) ||
        ch.domain.toLowerCase().includes(q)
    ).slice(0, 3);

    return { chapters, cities, solutions, sessions, challenges };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#0F1115]/45 px-4 pt-20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#0F1115]/12 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#ECE8DF] px-5 py-4">
          <Search className="h-4 w-4 text-[#FF4D29]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ir a sección, ciudad (Ñuñoa, Curitiba, Quito), piloto (Yaku, Sandbox) o cátedra..."
            className="w-full bg-transparent text-sm text-[#0F1115] placeholder-[#8A877F] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#5B5952] hover:bg-[#F7F5F0]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[65vh] space-y-5 overflow-y-auto p-5">
          {results.chapters.length > 0 && (
            <div>
              <p className="font-mono-tech mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#6A675E]">
                Capítulos del Sitio
              </p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {results.chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSwitchChapter(ch.id);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 rounded-xl bg-[#F7F5F0] px-3 py-2.5 text-left text-xs font-bold text-[#0F1115] hover:bg-[#0F1115] hover:text-white"
                  >
                    <Compass className="h-3.5 w-3.5 text-[#FF4D29]" />
                    <span>
                      {ch.num} · {ch.labelEs}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.cities.length > 0 && (
            <div>
              <p className="font-mono-tech mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#6A675E]">
                Ciudades &amp; Laboratorios
              </p>
              <div className="space-y-1">
                {results.cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city);
                      onSwitchChapter('network');
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[#F7F5F0]"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-[#FF4D29]" />
                      <div>
                        <p className="text-xs font-bold text-[#0F1115]">
                          {city.flag} {city.city}, {city.country}
                        </p>
                        <p className="text-[11px] text-[#5B5952]">{city.labName}</p>
                      </div>
                    </div>
                    <span className="font-mono-tech rounded-full bg-[#F2EFE8] px-2.5 py-0.5 text-[10px] font-semibold text-[#254EDB]">
                      {city.highlightMetric}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.solutions.length > 0 && (
            <div>
              <p className="font-mono-tech mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#6A675E]">
                Soluciones Replicables
              </p>
              <div className="space-y-1">
                {results.solutions.map((sol) => (
                  <button
                    key={sol.id}
                    onClick={() => {
                      onSelectSolution(sol);
                      onSwitchChapter('solutions');
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[#F7F5F0]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Lightbulb className="h-4 w-4 text-[#254EDB]" />
                      <div>
                        <p className="text-xs font-bold text-[#0F1115]">{sol.title}</p>
                        <p className="text-[11px] text-[#5B5952]">
                          {sol.flag} {sol.city} · {sol.category}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#5B5952]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.sessions.length > 0 && (
            <div>
              <p className="font-mono-tech mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#6A675E]">
                Cátedras &amp; Sesiones
              </p>
              <div className="space-y-1">
                {results.sessions.map((ses) => (
                  <button
                    key={ses.id}
                    onClick={() => {
                      onSwitchChapter('network');
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[#F7F5F0]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Video className="h-4 w-4 text-[#10B981]" />
                      <div>
                        <p className="text-xs font-bold text-[#0F1115]">{ses.title}</p>
                        <p className="text-[11px] text-[#5B5952]">
                          {ses.speaker} · {ses.dateLabel}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.challenges.length > 0 && (
            <div>
              <p className="font-mono-tech mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#6A675E]">
                Desafíos Urbanos
              </p>
              <div className="space-y-1">
                {results.challenges.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSwitchChapter('join');
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[#F7F5F0]"
                  >
                    <div className="flex items-center gap-2.5">
                      <Target className="h-4 w-4 text-[#FF4D29]" />
                      <div>
                        <p className="text-xs font-bold text-[#0F1115]">{ch.title}</p>
                        <p className="text-[11px] text-[#5B5952]">
                          {ch.flag} {ch.city} · {ch.domain}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
