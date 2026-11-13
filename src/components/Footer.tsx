import { RouteView } from '../types';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onNavigateRoute: (route: RouteView) => void;
}

export function Footer({ onNavigateSection, onNavigateRoute }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Disclosure Summary */}
          <div className="md:col-span-6 space-y-3">
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('calculator');
              }}
              className="font-display text-lg font-bold text-white tracking-tight inline-block"
            >
              Chargewise UK
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md tracking-wide">
              Independent UK electric vehicle home wallbox, cross-pavement gully, and overnight smart tariff savings calculator built for British drivers.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              As an Amazon Associate, Chargewise UK earns from qualifying purchases. Tariff comparisons are provided for informational guidance and do not constitute regulated financial advice.
            </p>
          </div>

          {/* Tools & Guides */}
          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-display text-xs font-semibold text-white tracking-wide">
              Calculator &amp; Guides
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href="#calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('calculator');
                  }}
                  className="hover:text-white transition-colors"
                >
                  EV Savings Calculator
                </a>
              </li>
              <li>
                <a
                  href="#charging-gear"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('charging-gear');
                  }}
                  className="hover:text-white transition-colors"
                >
                  UK Charging Gear
                </a>
              </li>
              <li>
                <a
                  href="#ev-tariffs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('ev-tariffs');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Overnight EV Tariffs
                </a>
              </li>
              <li>
                <a
                  href="#grant-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('grant-guide');
                  }}
                  className="hover:text-white transition-colors"
                >
                  OZEV Cross-Pavement Grants
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Views */}
          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-display text-xs font-semibold text-white tracking-wide">
              Legal &amp; Compliance
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href="#privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRoute('privacy-policy');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#affiliate-disclosure"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRoute('affiliate-disclosure');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Affiliate Disclosure
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRoute('contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Editorial Team
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Chargewise UK. All figures in GBP (£).</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('privacy-policy');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#affiliate-disclosure"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('affiliate-disclosure');
              }}
              className="hover:text-white transition-colors"
            >
              Affiliate Disclosure
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigateRoute('contact');
              }}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
