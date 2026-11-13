/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { CalculatorSection } from './components/CalculatorSection';
import { ComplianceView } from './components/ComplianceViews';
import { Footer } from './components/Footer';
import { GearSection } from './components/GearSection';
import { GrantGuideAndFaq } from './components/GrantGuideAndFaq';
import { Header } from './components/Header';
import { TariffsSection } from './components/TariffsSection';
import { CalculatorState, ParkingSetupId, RouteView } from './types';
import { calculateEvSavings, DEFAULT_CALCULATOR_STATE } from './utils/calculator';

function parseRouteFromHash(hash: string): RouteView {
  const clean = hash.replace(/^#\/?/, '').toLowerCase();
  if (clean === 'privacy-policy') return 'privacy-policy';
  if (clean === 'affiliate-disclosure') return 'affiliate-disclosure';
  if (clean === 'contact') return 'contact';
  return 'calculator';
}

export default function App() {
  const [route, setRoute] = useState<RouteView>(() =>
    typeof window !== 'undefined' ? parseRouteFromHash(window.location.hash) : 'calculator'
  );
  const [calcState, setCalcState] = useState<CalculatorState>(DEFAULT_CALCULATOR_STATE);

  // Sync URL hash changes (supports browser Back/Forward and direct reviewer links)
  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = parseRouteFromHash(window.location.hash);
      setRoute(nextRoute);
      if (nextRoute !== 'calculator') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keep document title contextual for compliance views
  useEffect(() => {
    const baseTitle = 'Chargewise UK – EV Home & Cross-Pavement Savings Calculator';
    if (route === 'privacy-policy') {
      document.title = 'Privacy Policy – Chargewise UK';
    } else if (route === 'affiliate-disclosure') {
      document.title = 'Affiliate Disclosure – Chargewise UK';
    } else if (route === 'contact') {
      document.title = 'Contact – Chargewise UK';
    } else {
      document.title = baseTitle;
    }
  }, [route]);

  const results = useMemo(() => calculateEvSavings(calcState), [calcState]);

  const navigateToRoute = (targetRoute: RouteView) => {
    setRoute(targetRoute);
    const targetHash = targetRoute === 'calculator' ? '#calculator' : `#${targetRoute}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId: string) => {
    if (route !== 'calculator') {
      setRoute('calculator');
      window.history.pushState(null, '', `#${sectionId}`);
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      return;
    }

    window.history.replaceState(null, '', `#${sectionId}`);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyTariffRate = (ratePence: number) => {
    setCalcState((prev) => ({
      ...prev,
      homeTariffPence: ratePence,
    }));
    navigateToSection('calculator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        activeRoute={route}
        onNavigateSection={navigateToSection}
        onNavigateHome={() => navigateToRoute('calculator')}
      />

      <main className="flex-1">
        {route === 'calculator' ? (
          <>
            <CalculatorSection
              state={calcState}
              results={results}
              onUpdateMileage={(annualMileage) =>
                setCalcState((prev) => ({ ...prev, annualMileage }))
              }
              onUpdateEfficiency={(efficiency, presetId = 'custom') =>
                setCalcState((prev) => ({
                  ...prev,
                  efficiency,
                  selectedPresetId: presetId,
                }))
              }
              onUpdateHomeTariff={(homeTariffPence) =>
                setCalcState((prev) => ({ ...prev, homeTariffPence }))
              }
              onUpdatePublicRate={(publicRatePence) =>
                setCalcState((prev) => ({ ...prev, publicRatePence }))
              }
              onUpdateParkingSetup={(parkingSetup: ParkingSetupId) =>
                setCalcState((prev) => ({ ...prev, parkingSetup }))
              }
              onToggleGrant={() =>
                setCalcState((prev) => ({
                  ...prev,
                  applyOzevGrant: !prev.applyOzevGrant,
                }))
              }
              onReset={() => setCalcState(DEFAULT_CALCULATOR_STATE)}
            />

            <GearSection />

            <TariffsSection
              annualKwh={results.annualKwh}
              annualMileage={calcState.annualMileage}
              activeHomeTariffPence={calcState.homeTariffPence}
              onApplyTariffRate={handleApplyTariffRate}
            />

            <GrantGuideAndFaq />
          </>
        ) : (
          <ComplianceView
            route={route}
            onBackToCalculator={() => navigateToRoute('calculator')}
            onNavigateRoute={navigateToRoute}
          />
        )}
      </main>

      <Footer
        onNavigateSection={navigateToSection}
        onNavigateRoute={navigateToRoute}
      />
    </div>
  );
}
