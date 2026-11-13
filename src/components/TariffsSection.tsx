import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { UK_EV_TARIFFS } from '../data/evData';
import { formatGBP, formatNumber } from '../utils/calculator';

interface TariffsSectionProps {
  annualKwh: number;
  annualMileage: number;
  activeHomeTariffPence: number;
  onApplyTariffRate: (ratePence: number) => void;
}

export function TariffsSection({
  annualKwh,
  annualMileage,
  activeHomeTariffPence,
  onApplyTariffRate,
}: TariffsSectionProps) {
  return (
    <section id="ev-tariffs" className="py-14 sm:py-20 border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-700 mb-1.5">
              Smart Meter Time-of-Use Plans
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              Top UK Overnight EV Energy Tariffs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Estimated yearly charging costs below update automatically for your{' '}
              <strong className="font-mono font-semibold text-slate-800 tabular-nums">
                {formatNumber(annualMileage)} miles/yr
              </strong>{' '}
              ({formatNumber(Math.round(annualKwh))} kWh) driving profile.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Indicative UK averages · Rates vary slightly by DNO region
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-600">
                <th scope="col" className="py-3.5 pl-6 pr-4">
                  Tariff &amp; Supplier
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  Off-Peak Rate
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Cheap Window
                </th>
                <th scope="col" className="py-3.5 px-4">
                  How It Works
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  Est. Cost / Yr
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-6 text-right">
                  Compare &amp; Switch
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {UK_EV_TARIFFS.map((tariff) => {
                const estimatedYearlyCost = annualKwh * (tariff.offPeakRatePence / 100);
                const isRateActive =
                  Math.abs(activeHomeTariffPence - tariff.offPeakRatePence) < 0.05;

                return (
                  <tr
                    key={tariff.id}
                    className="hover:bg-slate-50/70 transition-colors align-top"
                  >
                    <td className="py-5 pl-6 pr-4">
                      <div className="font-display font-bold text-slate-900">
                        {tariff.tariffName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {tariff.supplier} · {tariff.exitFee}
                      </div>
                    </td>

                    <td className="py-5 px-4 text-right whitespace-nowrap">
                      <span className="font-mono text-base font-semibold text-emerald-700 tabular-nums">
                        {tariff.offPeakDisplay}
                      </span>
                    </td>

                    <td className="py-5 px-4 whitespace-nowrap text-slate-700 font-medium">
                      <div>{tariff.windowDisplay}</div>
                      <div className="text-xs font-normal text-slate-500 mt-0.5">
                        {tariff.tariffTypeMeta}
                      </div>
                    </td>

                    <td className="py-5 px-4 text-xs text-slate-600 leading-relaxed max-w-xs">
                      {tariff.highlights}
                    </td>

                    <td className="py-5 px-4 text-right whitespace-nowrap">
                      <div className="font-mono text-base font-semibold text-slate-900 tabular-nums">
                        {formatGBP(estimatedYearlyCost)}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">per year</div>
                    </td>

                    <td className="py-5 pl-4 pr-6 text-right">
                      <div className="inline-flex flex-col items-end gap-2">
                        <a
                          href={tariff.referralUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                        >
                          <span>{tariff.ctaLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onApplyTariffRate(tariff.offPeakRatePence)}
                          className={`inline-flex items-center gap-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isRateActive
                              ? 'text-emerald-700 font-semibold'
                              : 'text-slate-500 hover:text-slate-900 underline underline-offset-2'
                          }`}
                        >
                          <SlidersHorizontal className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>
                            {isRateActive
                              ? `Active in calculator (${tariff.offPeakRatePence}p)`
                              : `Test ${tariff.offPeakRatePence}p in calculator`}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile-First Stacked Comparison List */}
        <div className="md:hidden bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200 overflow-hidden">
          {UK_EV_TARIFFS.map((tariff) => {
            const estimatedYearlyCost = annualKwh * (tariff.offPeakRatePence / 100);
            const isRateActive =
              Math.abs(activeHomeTariffPence - tariff.offPeakRatePence) < 0.05;

            return (
              <div key={tariff.id} className="p-5 space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {tariff.tariffName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {tariff.supplier} · {tariff.exitFee}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-lg font-semibold text-emerald-700 tabular-nums">
                      {tariff.offPeakDisplay}
                    </div>
                    <div className="text-xs text-slate-500 font-mono tabular-nums">
                      Est. {formatGBP(estimatedYearlyCost)}/yr
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-700 font-medium">
                  {tariff.windowDisplay} ·{' '}
                  <span className="font-normal text-slate-500">{tariff.tariffTypeMeta}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{tariff.highlights}</p>

                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  <a
                    href={tariff.referralUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{tariff.ctaLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onApplyTariffRate(tariff.offPeakRatePence)}
                    className={`px-3.5 py-2.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isRateActive
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isRateActive
                      ? `Active (${tariff.offPeakRatePence}p)`
                      : `Test ${tariff.offPeakRatePence}p rate`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
