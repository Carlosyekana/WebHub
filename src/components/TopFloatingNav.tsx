import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Search } from 'lucide-react';
import { Language } from '../data/hubData';
import { CHAPTER_NAV, ChapterView } from '../types/os';

interface TopFloatingNavProps {
  activeChapter: ChapterView;
  onSelectChapter: (chapter: ChapterView) => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenCommand: () => void;
}

export const TopFloatingNav: React.FC<TopFloatingNavProps> = ({
  activeChapter,
  onSelectChapter,
  lang,
  onToggleLang,
  onOpenCommand,
}) => {
  return (
    <header className="sticky top-0 z-40 px-4 pt-3 pb-2 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-[#0F1115]/10 bg-white/85 px-3 py-2 shadow-[0_8px_30px_rgba(15,17,21,0.06)] backdrop-blur-xl sm:px-4">
        {/* Brand */}
        <button
          onClick={() => onSelectChapter('home')}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1115] font-mono-tech text-[11px] font-bold text-white">
            HC
          </span>
          <div className="hidden leading-tight sm:block">
            <span className="block font-display text-sm font-bold tracking-tight text-[#0F1115]">
              Hub de Ciudades
            </span>
            <span className="font-mono-tech flex items-center gap-1 text-[9px] text-[#5B5952]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              MIT · UdeG · 30 Gobiernos
            </span>
          </div>
        </button>

        {/* Center Clear 4-Chapter Pill Switcher */}
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-0.5 rounded-full bg-[#F2EFE8] p-1"
        >
          {CHAPTER_NAV.map((item) => {
            const active = activeChapter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectChapter(item.id)}
                className="relative rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4"
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#0F1115] shadow-sm"
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-1.5 ${
                    active ? 'text-white' : 'text-[#4C4A43] hover:text-[#0F1115]'
                  }`}
                >
                  <span className="font-mono-tech hidden text-[10px] opacity-60 md:inline">
                    {item.num}
                  </span>
                  <span>{lang === 'es' ? item.labelEs : item.labelPt}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Utility Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-1.5 rounded-full border border-[#0F1115]/12 bg-[#F7F5F0] px-2.5 py-1.5 text-xs font-medium text-[#4C4A43] transition hover:border-[#0F1115] hover:text-[#0F1115]"
            title="Buscar (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-[#FF4D29]" />
            <kbd className="font-mono-tech hidden text-[10px] sm:inline">⌘K</kbd>
          </button>

          <button
            onClick={onToggleLang}
            className="font-mono-tech hidden rounded-full border border-[#0F1115]/12 bg-[#F7F5F0] px-2.5 py-1.5 text-[11px] font-semibold text-[#0F1115] transition hover:border-[#0F1115] sm:inline-flex"
          >
            {lang === 'es' ? 'ES' : 'PT'}
          </button>

          <button
            onClick={() => onSelectChapter('join')}
            className="inline-flex items-center gap-1 rounded-full bg-[#FF4D29] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#E03D1B]"
          >
            <span className="hidden md:inline">Sumarse</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
