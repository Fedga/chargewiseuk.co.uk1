import { useState } from 'react';
import { ExternalLink, Zap } from 'lucide-react';
import { RECOMMENDED_GEAR } from '../data/evData';
import { GearItem } from '../types';

function GearCard({ item }: { item: GearItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between">
      <div>
        {/* 4:3 Studio Product Visual with Zero-Broken-Image Fallback */}
        <div className="aspect-[4/3] w-full bg-slate-100 border-b border-slate-200 overflow-hidden relative">
          {!imgFailed ? (
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-emerald-50">
              <Zap className="w-8 h-8 text-emerald-700 mb-2" aria-hidden="true" />
              <span className="font-display text-sm font-semibold text-slate-800">
                {item.title}
              </span>
            </div>
          )}
        </div>

        {/* Clean Unboxed Metadata & Editorial Title */}
        <div className="p-5 sm:p-6">
          <p className="text-xs text-slate-500 mb-1.5">{item.categoryMeta}</p>
          <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {item.summary}
          </p>

          {/* Technical Specifications List */}
          <dl className="border-t border-slate-200 divide-y divide-slate-100 text-xs">
            {item.specs.map((spec) => (
              <div key={spec.label} className="py-2 flex items-baseline justify-between gap-3">
                <dt className="text-slate-500 shrink-0">{spec.label}</dt>
                <dd className="font-medium text-slate-800 text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Price Guide & Amazon UK CTA */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{item.guidePrice}</span>
          <span>UK Specification</span>
        </div>
        <a
          href={item.amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <span>{item.ctaLabel}</span>
          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function GearSection() {
  return (
    <section id="charging-gear" className="py-14 sm:py-20 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-emerald-700 mb-1.5">
              UK Home &amp; Kerbside Hardware
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              Recommended UK Home &amp; Pavement Charging Gear
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Essential UKCA-compliant charging equipment for private driveways, terraced front gardens, and kerbside bays.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECOMMENDED_GEAR.map((item) => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
