export type ChapterView = 'home' | 'solutions' | 'network' | 'join';

export interface ChapterNavItem {
  id: ChapterView;
  num: string;
  labelEs: string;
  labelPt: string;
}

export const CHAPTER_NAV: ChapterNavItem[] = [
  { id: 'home', num: '01', labelEs: 'El Hub', labelPt: 'O Hub' },
  { id: 'solutions', num: '02', labelEs: 'Ciclo & Pilotos', labelPt: 'Ciclo & Pilotos' },
  { id: 'network', num: '03', labelEs: 'Cátedras & Red', labelPt: 'Cátedras & Rede' },
  { id: 'join', num: '04', labelEs: 'Radar & Súmate', labelPt: 'Radar & Participe' },
];
