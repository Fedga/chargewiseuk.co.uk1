import { RouteView } from '../types';

interface HeaderProps {
  activeRoute: RouteView;
  onNavigateSection: (sectionId: string) => void;
  onNavigateHome: () => void;
}

export function Header({ activeRoute, onNavigateSection, onNavigateHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-14">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#calculator"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 rounded"
        >
          Chargewise UK
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#calculator"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('calculator');
            }}
            className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
              activeRoute === 'calculator' ? 'text-slate-900' : ''
            }`}
          >
            Calculator
          </a>
          <a
            href="#charging-gear"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('charging-gear');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Charging Gear
          </a>
          <a
            href="#ev-tariffs"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('ev-tariffs');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            EV Tariffs
          </a>
          <a
            href="#grant-guide"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('grant-guide');
            }}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Grant Guide
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigateSection('ev-tariffs')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Compare Tariffs
          </button>
        </div>
      </div>
    </header>
  );
}
