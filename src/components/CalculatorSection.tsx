import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { PARKING_SETUP_OPTIONS, UK_EV_PRESETS } from '../data/evData';
import { CalculationResult, CalculatorState, ParkingSetupId } from '../types';
import { formatGBP, formatNumber, OZEV_GRANT_AMOUNT } from '../utils/calculator';

interface CalculatorSectionProps {
  state: CalculatorState;
  results: CalculationResult;
  onUpdateMileage: (miles: number) => void;
  onUpdateEfficiency: (value: number, presetId?: string) => void;
  onUpdateHomeTariff: (pence: number) => void;
  onUpdatePublicRate: (pence: number) => void;
  onUpdateParkingSetup: (setup: ParkingSetupId) => void;
  onToggleGrant: () => void;
  onReset: () => void;
}

export function CalculatorSection({
  state,
  results,
  onUpdateMileage,
  onUpdateEfficiency,
  onUpdateHomeTariff,
  onUpdatePublicRate,
  onUpdateParkingSetup,
  onToggleGrant,
  onReset,
}: CalculatorSectionProps) {
  const [chartHorizon, setChartHorizon] = useState<'annual' | 'five-year'>('annual');
  const [efficiencyInput, setEfficiencyInput] = useState<string>(String(state.efficiency));
  const [homeTariffInput, setHomeTariffInput] = useState<string>(state.homeTariffPence.toFixed(1));
  const [publicRateInput, setPublicRateInput] = useState<string>(String(state.publicRatePence));

  useEffect(() => {
    setEfficiencyInput((prev) =>
      parseFloat(prev) === state.efficiency ? prev : String(state.efficiency)
    );
  }, [state.efficiency]);

  useEffect(() => {
    setHomeTariffInput((prev) =>
      parseFloat(prev) === state.homeTariffPence ? prev : String(state.homeTariffPence)
    );
  }, [state.homeTariffPence]);

  useEffect(() => {
    setPublicRateInput((prev) =>
      parseFloat(prev) === state.publicRatePence ? prev : String(state.publicRatePence)
    );
  }, [state.publicRatePence]);

  const isPublicOnly = state.parkingSetup === 'public-only';

  // Slider fill percentage for visual track background
  const sliderPercent = ((state.annualMileage - 2000) / (30000 - 2000)) * 100;

  // Bar comparison math
  const barHomeValue =
    chartHorizon === 'annual' ? results.annualHomeCost : results.fiveYearHomeTotalWithHardware;
  const barPublicValue =
    chartHorizon === 'annual' ? results.annualPublicCost : results.fiveYearPublicTotal;
  const maxBarValue = Math.max(barHomeValue, barPublicValue, 1);
  const homeBarPct = Math.max(4, Math.min(100, (barHomeValue / maxBarValue) * 100));
  const publicBarPct = Math.max(4, Math.min(100, (barPublicValue / maxBarValue) * 100));

  return (
    <section id="calculator" className="pt-8 pb-14 sm:pt-12 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Proposition Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-medium text-emerald-700 mb-2">
            United Kingdom · Home Wallbox &amp; Cross-Pavement Gully Calculator
          </p>
          <h1
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.15] mb-3"
            style={{ textWrap: 'balance' }}
          >
            See how fast home or kerbside EV charging pays for itself
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Compare overnight 7p/kWh UK smart tariffs against 79p/kWh public rapid chargers—whether you park on a private driveway or outside a terraced home with a flush pavement channel.
          </p>
        </div>

        {/* Single-Elevation Split Calculator Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Interactive Inputs (7 cols) */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:border-r border-b lg:border-b-0 border-slate-200 flex flex-col justify-between gap-7">
              <div className="space-y-7">
                {/* Top Toolbar inside form */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-slate-900">
                      Your Driving &amp; Tariff Setup
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Adjust sliders or test a popular UK EV model below
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onReset();
                      setEfficiencyInput('3.5');
                      setHomeTariffInput('7.0');
                      setPublicRateInput('79');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    Reset Defaults
                  </button>
                </div>

                {/* 1. Annual UK Mileage Slider */}
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2.5">
                    <label
                      htmlFor="annual-mileage"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Annual UK Mileage
                    </label>
                    <div className="font-mono text-lg font-semibold text-emerald-700 tabular-nums">
                      {formatNumber(state.annualMileage)}{' '}
                      <span className="text-xs font-sans font-normal text-slate-500">miles/yr</span>
                    </div>
                  </div>
                  <div className="py-2">
                    <input
                      id="annual-mileage"
                      type="range"
                      min={2000}
                      max={30000}
                      step={500}
                      value={state.annualMileage}
                      onChange={(e) => onUpdateMileage(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #059669 0%, #059669 ${sliderPercent}%, #e2e8f0 ${sliderPercent}%, #e2e8f0 100%)`,
                      }}
                      className="ev-slider w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono tabular-nums mt-1">
                    <button
                      type="button"
                      onClick={() => onUpdateMileage(2000)}
                      className="hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      2,000 mi
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateMileage(8000)}
                      className="hover:text-emerald-700 font-sans transition-colors cursor-pointer"
                    >
                      8,000 mi (UK avg)
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateMileage(15000)}
                      className="hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      15,000 mi
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateMileage(30000)}
                      className="hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      30,000 mi
                    </button>
                  </div>
                </div>

                {/* 2. Vehicle Efficiency + Popular UK EV Presets */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <label
                      htmlFor="ev-efficiency"
                      className="text-sm font-semibold text-slate-800"
                    >
                      Vehicle Efficiency (mi/kWh)
                    </label>
                    <span className="text-xs text-slate-500">
                      Est. annual energy:{' '}
                      <strong className="font-mono font-medium text-slate-700 tabular-nums">
                        {formatNumber(Math.round(results.annualKwh))} kWh
                      </strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                    <div className="sm:col-span-4 relative">
                      <input
                        id="ev-efficiency"
                        type="number"
                        inputMode="decimal"
                        min={1.5}
                        max={6.5}
                        step={0.1}
                        value={efficiencyInput}
                        onChange={(e) => {
                          setEfficiencyInput(e.target.value);
                          const parsed = parseFloat(e.target.value);
                          if (!Number.isNaN(parsed) && parsed >= 1.0 && parsed <= 8.0) {
                            onUpdateEfficiency(parsed, 'custom');
                          }
                        }}
                        onBlur={() => {
                          const parsed = parseFloat(efficiencyInput);
                          if (Number.isNaN(parsed) || parsed < 1.5) {
                            setEfficiencyInput('1.5');
                            onUpdateEfficiency(1.5, 'custom');
                          } else if (parsed > 6.5) {
                            setEfficiencyInput('6.5');
                            onUpdateEfficiency(6.5, 'custom');
                          }
                        }}
                        className="w-full h-11 pl-3.5 pr-16 font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 tabular-nums"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
                        mi/kWh
                      </span>
                    </div>

                    {/* Interactive UK EV Quick-Select Presets */}
                    <div
                      role="group"
                      aria-label="Popular UK EV efficiency presets"
                      className="sm:col-span-8 flex flex-wrap gap-1.5"
                    >
                      {UK_EV_PRESETS.map((preset) => {
                        const isSelected =
                          state.selectedPresetId === preset.id &&
                          Math.abs(state.efficiency - preset.efficiency) < 0.01;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setEfficiencyInput(String(preset.efficiency));
                              onUpdateEfficiency(preset.efficiency, preset.id);
                            }}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {preset.name} ·{' '}
                            <span className="font-mono tabular-nums">{preset.efficiency}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Tariff Inputs: Home Off-Peak vs Public Rapid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="home-tariff"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Home Off-Peak EV Tariff
                    </label>
                    <div className="relative">
                      <input
                        id="home-tariff"
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={100}
                        step={0.5}
                        value={homeTariffInput}
                        onChange={(e) => {
                          setHomeTariffInput(e.target.value);
                          const parsed = parseFloat(e.target.value);
                          if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 150) {
                            onUpdateHomeTariff(parsed);
                          }
                        }}
                        onBlur={() => {
                          const parsed = parseFloat(homeTariffInput);
                          if (Number.isNaN(parsed) || parsed < 0) {
                            setHomeTariffInput('0');
                            onUpdateHomeTariff(0);
                          }
                        }}
                        className="w-full h-11 pl-3.5 pr-14 font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 tabular-nums"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
                        p/kWh
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Typical UK EV overnight rate: 7.0p – 8.5p
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="public-rate"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Public Rapid Charger Rate
                    </label>
                    <div className="relative">
                      <input
                        id="public-rate"
                        type="number"
                        inputMode="decimal"
                        min={5}
                        max={200}
                        step={1}
                        value={publicRateInput}
                        onChange={(e) => {
                          setPublicRateInput(e.target.value);
                          const parsed = parseFloat(e.target.value);
                          if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 250) {
                            onUpdatePublicRate(parsed);
                          }
                        }}
                        onBlur={() => {
                          const parsed = parseFloat(publicRateInput);
                          if (Number.isNaN(parsed) || parsed < 0) {
                            setPublicRateInput('79');
                            onUpdatePublicRate(79);
                          }
                        }}
                        className="w-full h-11 pl-3.5 pr-14 font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 tabular-nums"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
                        p/kWh
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      UK PAYG DC rapid average: 75p – 85p
                    </p>
                  </div>
                </div>

                {/* 4. Parking Setup Selector */}
                <fieldset>
                  <legend className="text-sm font-semibold text-slate-800 mb-2.5">
                    Parking &amp; Home Installation Setup
                  </legend>
                  <div className="space-y-2.5">
                    {PARKING_SETUP_OPTIONS.map((option) => {
                      const active = state.parkingSetup === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer ${
                            active
                              ? 'bg-emerald-50/70 border-emerald-600'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="parking-setup"
                            value={option.id}
                            checked={active}
                            onChange={() => onUpdateParkingSetup(option.id)}
                            className="mt-1 h-4 w-4 accent-emerald-600 shrink-0"
                          />
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-slate-900">
                              {option.label}
                            </span>
                            <span className="block text-xs text-slate-600 mt-0.5">
                              {option.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {/* 5. £350 UK OZEV Grant Deduction Toggle */}
              <div className="pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Apply £{OZEV_GRANT_AMOUNT} UK OZEV Chargepoint Grant
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isPublicOnly
                      ? 'Select Private Driveway or Terraced Gully above to model grant payback.'
                      : state.parkingSetup === 'cross-pavement'
                        ? 'Available for UK on-street households installing a council-approved gully.'
                        : 'Available for eligible UK renters and flat owners with dedicated parking.'}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={!isPublicOnly && state.applyOzevGrant}
                  aria-label="Apply £350 UK OZEV Chargepoint Grant"
                  disabled={isPublicOnly}
                  onClick={onToggleGrant}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed ${
                    !isPublicOnly && state.applyOzevGrant ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ${
                      !isPublicOnly && state.applyOzevGrant ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Live Results Panel (5 cols) */}
            <div
              aria-live="polite"
              className="lg:col-span-5 bg-slate-50/90 p-5 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div className="space-y-6">
                {/* Primary Focal Savings Metric */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">
                    {isPublicOnly
                      ? 'Current Yearly Savings (Public Charging Only)'
                      : 'Estimated Total Yearly Savings'}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-4xl sm:text-5xl font-semibold tracking-tight text-emerald-700 tabular-nums">
                      {formatGBP(results.effectiveYearlySavings)}
                    </span>
                    <span className="text-sm font-medium text-slate-600">/ year</span>
                  </div>
                  {isPublicOnly ? (
                    <p className="text-xs text-amber-800 mt-2">
                      You could save{' '}
                      <strong className="font-mono font-semibold tabular-nums">
                        {formatGBP(results.potentialYearlySavings)}/yr
                      </strong>{' '}
                      ({results.savingsPercent}% less) by installing a home wallbox or cross-pavement gully.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-600 mt-1.5">
                      Cuts per-mile energy cost by{' '}
                      <strong className="font-mono font-semibold text-emerald-700 tabular-nums">
                        {results.savingsPercent}%
                      </strong>{' '}
                      ({results.homeCostPerMilePence.toFixed(1)}p vs{' '}
                      {results.publicCostPerMilePence.toFixed(1)}p per mile)
                    </p>
                  )}
                </div>

                {/* Structured 2x2 KPI Breakdown with Hairline Dividers */}
                <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    <div className="py-3.5 pr-4">
                      <p className="text-xs text-slate-500">
                        {isPublicOnly ? 'Home Benchmark Cost' : 'Annual Home Cost'}
                      </p>
                      <p className="font-mono text-xl font-semibold text-slate-900 tabular-nums mt-0.5">
                        {formatGBP(results.annualHomeCost)}
                      </p>
                      <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                        {results.homeCostPerMilePence.toFixed(1)}p / mile
                      </p>
                    </div>
                    <div className="py-3.5 pl-4">
                      <p className="text-xs text-slate-500">Annual Public Cost</p>
                      <p className="font-mono text-xl font-semibold text-slate-900 tabular-nums mt-0.5">
                        {formatGBP(results.annualPublicCost)}
                      </p>
                      <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                        {results.publicCostPerMilePence.toFixed(1)}p / mile
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    <div className="py-3.5 pr-4">
                      <p className="text-xs text-slate-500">5-Year Savings</p>
                      <p className="font-mono text-xl font-semibold text-emerald-700 tabular-nums mt-0.5">
                        {formatGBP(results.fiveYearGrossSavings)}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isPublicOnly
                          ? '£0 saved on public PAYG'
                          : `${formatGBP(results.fiveYearNetSavings)} net after setup`}
                      </p>
                    </div>
                    <div className="py-3.5 pl-4">
                      <p className="text-xs text-slate-500">Hardware Payback</p>
                      <p className="font-mono text-xl font-semibold text-slate-900 tabular-nums mt-0.5">
                        {isPublicOnly
                          ? 'N/A'
                          : results.paybackMonths !== null
                            ? `${results.paybackMonths} mos`
                            : 'No payback'}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isPublicOnly
                          ? 'No home hardware (£0)'
                          : results.grantDiscountApplied > 0
                            ? `Net ${formatGBP(results.netHardwareCost)} (incl. £${results.grantDiscountApplied} grant)`
                            : `Est. install ${formatGBP(results.netHardwareCost)}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Visual Bar Comparison Chart */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xs font-semibold text-slate-800">
                      Cost Comparison Breakdown
                    </h3>
                    <div
                      role="group"
                      aria-label="Chart timeframe selector"
                      className="inline-flex p-0.5 bg-slate-200/80 rounded-lg"
                    >
                      <button
                        type="button"
                        onClick={() => setChartHorizon('annual')}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          chartHorizon === 'annual'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        1-Year Energy
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartHorizon('five-year')}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          chartHorizon === 'five-year'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        5-Yr + Hardware
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {/* Bar 1: Home / Gully */}
                    <div>
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="font-medium text-slate-800">
                          {chartHorizon === 'annual'
                            ? `Home Off-Peak (${state.homeTariffPence}p/kWh)`
                            : `5-Yr Home + ${formatGBP(results.netHardwareCost)} Setup`}
                        </span>
                        <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                          {formatGBP(barHomeValue)}
                        </span>
                      </div>
                      <div className="w-full h-7 bg-slate-200/70 rounded-md overflow-hidden flex items-center">
                        <div
                          className="h-full bg-emerald-600 rounded-md origin-left transition-all duration-150"
                          style={{ width: `${homeBarPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Bar 2: Public Rapid */}
                    <div>
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="font-medium text-slate-800">
                          {chartHorizon === 'annual'
                            ? `Public Rapid (${state.publicRatePence}p/kWh)`
                            : '5-Yr Public Rapid Charging'}
                        </span>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums">
                          {formatGBP(barPublicValue)}
                        </span>
                      </div>
                      <div className="w-full h-7 bg-slate-200/70 rounded-md overflow-hidden flex items-center">
                        <div
                          className="h-full bg-slate-600 rounded-md origin-left transition-all duration-150"
                          style={{ width: `${publicBarPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiet Contextual Footnote */}
              <p className="text-xs text-slate-500 leading-relaxed pt-3 border-t border-slate-200">
                Figures assume {formatNumber(state.annualMileage)} miles/yr at {state.efficiency} mi/kWh (
                {formatNumber(Math.round(results.annualKwh))} kWh/yr) excluding daily standing charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
