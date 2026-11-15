import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import {
  CITY_NODES,
  CityNode,
  Language,
  SOLUTION_PILOTS,
  SolutionPilot,
} from './data/hubData';
import { CHAPTER_NAV, ChapterView } from './types/os';
import { TopFloatingNav } from './components/TopFloatingNav';
import { CommandPalette } from './components/CommandPalette';
import { KineticHomeSection } from './components/KineticHomeSection';
import { LoopSolutionsSection } from './components/LoopSolutionsSection';
import { SessionsAndMapSection } from './components/SessionsAndMapSection';
import { DiagnosticAndJoinSection } from './components/DiagnosticAndJoinSection';

export function App() {
  const [lang, setLang] = useState<Language>('es');
  const [activeChapter, setActiveChapter] = useState<ChapterView>('home');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityNode>(CITY_NODES[0]);
  const [selectedSolution, setSelectedSolution] = useState<SolutionPilot>(SOLUTION_PILOTS[0]);
  const [onboardingContext, setOnboardingContext] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigateChapter = (chapter: ChapterView) => {
    setActiveChapter(chapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConnectCity = (city: CityNode) => {
    setOnboardingContext(
      `Solicitud de intercambio par-a-par con ${city.city} (${city.labName}) sobre ${city.focusAreas.join(', ')}.`
    );
    navigateChapter('join');
  };

  const handleAdoptPilot = (sol: SolutionPilot) => {
    setOnboardingContext(
      `Interés en replicar "${sol.title}" de ${sol.city} (${sol.category}, despliegue estimado ${sol.replicabilityTime}).`
    );
    navigateChapter('join');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0F1115]">
      <TopFloatingNav
        activeChapter={activeChapter}
        onSelectChapter={navigateChapter}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'es' ? 'pt' : 'es'))}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      <main className="min-h-[calc(100vh-140px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {activeChapter === 'home' && (
              <KineticHomeSection lang={lang} onNavigate={navigateChapter} />
            )}
            {activeChapter === 'solutions' && (
              <LoopSolutionsSection
                selectedSolution={selectedSolution}
                onSelectSolution={setSelectedSolution}
                onAdoptPilot={handleAdoptPilot}
              />
            )}
            {activeChapter === 'network' && (
              <SessionsAndMapSection
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                onConnectWithCity={handleConnectCity}
              />
            )}
            {activeChapter === 'join' && (
              <DiagnosticAndJoinSection prefilledContext={onboardingContext} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Clean Minimal Editorial Footer */}
      <footer className="border-t border-[#0F1115]/10 bg-white px-4 py-8 text-xs text-[#5B5952] sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="font-display font-bold text-[#0F1115]">
              Hub de Ciudades Latinoamérica &amp; Caribe
            </span>{' '}
            · City Science Lab MIT × Universidad de Guadalajara · Origen BID (2023)
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {CHAPTER_NAV.map((ch) => (
              <button
                key={ch.id}
                onClick={() => navigateChapter(ch.id)}
                className="font-semibold text-[#0F1115] hover:text-[#FF4D29]"
              >
                {ch.labelEs}
              </button>
            ))}
            <span className="text-[#D4D0C7]">|</span>
            <a
              href="https://www.instagram.com/hubdeciudades/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#FF4D29]"
            >
              Instagram <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.linkedin.com/company/hubdeciudades/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#254EDB]"
            >
              LinkedIn <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSwitchChapter={navigateChapter}
        onSelectCity={setSelectedCity}
        onSelectSolution={setSelectedSolution}
      />
    </div>
  );
}

export default App;
