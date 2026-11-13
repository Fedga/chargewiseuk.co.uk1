import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { FAQ_ITEMS, GRANT_STEPS, GUIDE_HERO_IMAGE } from '../data/evData';

export function GrantGuideAndFaq() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [guideImgFailed, setGuideImgFailed] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="grant-guide" className="py-14 sm:py-20 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
        {/* Part 1: How UK Cross-Pavement EV Charging Grants Work */}
        <div>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium text-emerald-700 mb-1.5">
              OZEV On-Street Households Guidance
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              How UK Cross-Pavement EV Charging Grants Work
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Nearly 40% of British households live in terraced properties or flats without a private driveway. Government OZEV funding and local council gully trials now allow on-street residents to access cheap 7p/kWh domestic electricity safely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Visual Showcase */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] lg:aspect-auto lg:flex-1 w-full bg-slate-100 overflow-hidden relative min-h-[240px]">
                {!guideImgFailed ? (
                  <img
                    src={GUIDE_HERO_IMAGE.src}
                    alt={GUIDE_HERO_IMAGE.alt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setGuideImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-emerald-50">
                    <MapPin className="w-8 h-8 text-emerald-700 mb-2" aria-hidden="true" />
                    <span className="font-display text-sm font-semibold text-slate-800">
                      UK Kerbside Cross-Pavement Gully Channel
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6 border-t border-slate-200 bg-white">
                <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                  What is a cross-pavement cable gully?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A shallow aluminium or polymer channel cut flush into the public footway between your garden wall and the road kerb. You press your Type 2 cable into the self-closing brush or hinged lid while charging, leaving zero raised bump for wheelchairs, prams, or pedestrians.
                </p>
              </div>
            </div>

            {/* Right 4-Step Editorial Process */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200 flex flex-col justify-between">
              {GRANT_STEPS.map((item) => (
                <div key={item.step} className="p-5 sm:p-6">
                  <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                    {item.step}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Interactive FAQ Accordion */}
        <div id="faq" className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium text-emerald-700 mb-1.5">
                Common UK EV Driver Questions
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                Home &amp; Cross-Pavement Charging FAQs
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                setOpenFaqId((prev) => (prev === 'ALL' ? null : 'ALL'))
              }
              className="self-start sm:self-auto px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {openFaqId === 'ALL' ? 'Collapse All' : 'Expand All Answers'}
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === 'ALL' || openFaqId === faq.id;
              const panelId = `panel-${faq.id}`;
              const buttonId = `btn-${faq.id}`;

              return (
                <div key={faq.id}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-600"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs text-slate-500 font-normal mb-0.5">
                          {faq.category}
                        </span>
                        <span className="block font-display text-sm sm:text-base font-semibold text-slate-900">
                          {faq.question}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-emerald-700' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed max-w-4xl"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
