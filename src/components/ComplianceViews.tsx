import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { RouteView } from '../types';

interface ComplianceViewProps {
  route: Exclude<RouteView, 'calculator'>;
  onBackToCalculator: () => void;
  onNavigateRoute: (route: RouteView) => void;
}

export function ComplianceView({
  route,
  onBackToCalculator,
  onNavigateRoute,
}: ComplianceViewProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Tariff or Calculator Feedback');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setFormError('Please enter your name so we know how to address our reply.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid UK or international email address.');
      return;
    }
    if (trimmedMsg.length < 10) {
      setFormError('Please include a brief message (at least 10 characters).');
      return;
    }

    setFormError(null);
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-[75vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Breadcrumb & Compliance Page Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <button
            type="button"
            onClick={onBackToCalculator}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Back to EV Savings Calculator</span>
          </button>

          <div
            role="navigation"
            aria-label="Compliance pages"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start sm:self-auto"
          >
            <button
              type="button"
              onClick={() => onNavigateRoute('privacy-policy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route === 'privacy-policy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigateRoute('affiliate-disclosure')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route === 'affiliate-disclosure'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Affiliate Disclosure
            </button>
            <button
              type="button"
              onClick={() => onNavigateRoute('contact')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                route === 'contact'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </button>
          </div>
        </div>

        {/* View 1: Privacy Policy */}
        {route === 'privacy-policy' && (
          <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6">
            <header className="pb-5 border-b border-slate-200">
              <p className="text-xs text-slate-500 mb-1.5">
                Legal &amp; UK GDPR Compliance · Effective November 2026
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Privacy Policy
              </h1>
            </header>

            <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  1. Overview &amp; Calculator Data Processing
                </h2>
                <p>
                  Chargewise UK operates in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. All mileage, vehicle efficiency, tariff, and parking inputs entered into the EV Charging Savings Calculator are processed locally inside your browser. We do not transmit, log, or store your personal calculator figures on external servers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  2. Advertising &amp; Google AdSense Cookies
                </h2>
                <p>
                  Third-party vendors, including Google, may use cookies to serve advertisements based on a user’s prior visits to this website or other websites on the internet. Google’s use of advertising cookies enables it and its partners to serve relevant ads to visitors based on their browsing activity.
                </p>
                <p>
                  UK and EEA visitors may manage or opt out of personalised advertising at any time by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or{' '}
                  <a
                    href="https://www.youronlinechoices.com/uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                  >
                    YourOnlineChoices UK
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  3. Outbound Retail &amp; Energy Supplier Links
                </h2>
                <p>
                  Our pages contain outbound links to third-party merchants (including Amazon.co.uk) and UK domestic energy suppliers (such as Octopus Energy, OVO Energy, and British Gas). Once you click an external link, that third party’s own privacy policy and cookie controls govern any data collected on their domain.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  4. Contact Enquiries &amp; Your Rights
                </h2>
                <p>
                  If you contact us via our enquiry form or email, we use your name and email address solely to respond to your question. Under UK data protection law, you have the right to request access to, rectification of, or erasure of any correspondence held by contacting us via our{' '}
                  <button
                    type="button"
                    onClick={() => onNavigateRoute('contact')}
                    className="text-emerald-700 font-medium underline underline-offset-2 hover:text-emerald-800 cursor-pointer"
                  >
                    Contact page
                  </button>
                  .
                </p>
              </section>
            </div>
          </article>
        )}

        {/* View 2: Affiliate Disclosure */}
        {route === 'affiliate-disclosure' && (
          <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6">
            <header className="pb-5 border-b border-slate-200">
              <p className="text-xs text-slate-500 mb-1.5">
                Commercial Transparency · UK ASA &amp; CAP Code Compliant
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Affiliate &amp; Referral Disclosure
              </h1>
            </header>

            <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p className="py-4 border-b border-slate-200 text-slate-800 text-sm">
                <strong>Amazon Associates UK Statement:</strong> Chargewise UK is a participant in the Amazon EU Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to{' '}
                <span className="font-mono">Amazon.co.uk</span>. As an Amazon Associate, we earn from qualifying purchases.
              </p>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  1. How Chargewise UK Is Funded
                </h2>
                <p>
                  Chargewise UK is free for drivers to use without registration or paywalls. To cover research, hosting, and ongoing UK tariff rate maintenance, some links to EV charging hardware and domestic energy suppliers are affiliate or customer-referral links. If you click one of these links and complete an eligible purchase or tariff switch, we may receive a small commission or bill credit at <strong>zero extra cost to you</strong>.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  2. Mathematical &amp; Editorial Independence
                </h2>
                <p>
                  Commercial partnerships never alter our calculator formulas. Every annual energy figure, 5-year savings projection, and hardware payback period is computed strictly from the mileage, vehicle efficiency, tariff rate, and installation setup you select. You can enter any custom home or public kWh rate from any UK supplier to compare objectively.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  3. Price &amp; Tariff Accuracy Notice
                </h2>
                <p>
                  Retail hardware prices on Amazon UK and regional DNO electricity unit rates change periodically. Guide prices and tariff windows listed on this site are provided for comparison purposes—always verify final unit rates, standing charges, and OZEV grant eligibility on the provider’s official website prior to purchase.
                </p>
              </section>
            </div>
          </article>
        )}

        {/* View 3: Contact */}
        {route === 'contact' && (
          <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6">
            <header className="pb-5 border-b border-slate-200">
              <p className="text-xs text-slate-500 mb-1.5">
                Editorial &amp; Partnership Enquiries · United Kingdom
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Contact Chargewise UK
              </h1>
              <p className="text-sm text-slate-600 mt-2">
                Spotted an updated UK council cross-pavement gully trial, EV tariff change, or have a media enquiry? Send our editorial team a message below.
              </p>
            </header>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 pb-2">
              <div className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span className="font-mono">editorial@chargewise-uk.example</span>
              </div>
              <span>·</span>
              <span>Typical response within 2 UK working days</span>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-display font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Enquiry received — thank you, {name.trim()}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  We have logged your message regarding <strong>{topic}</strong> and will reply to{' '}
                  <span className="font-mono">{email.trim()}</span> within two UK working days.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 font-medium"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full h-11 px-3.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.co.uk"
                      className="w-full h-11 px-3.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-slate-800 mb-1.5"
                  >
                    Enquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-11 px-3.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  >
                    <option value="Tariff or Calculator Feedback">
                      Tariff or Calculator Feedback
                    </option>
                    <option value="UK Council Cross-Pavement Scheme Update">
                      UK Council Cross-Pavement Scheme Update
                    </option>
                    <option value="Advertising or Affiliate Enquiry">
                      Advertising or Affiliate Enquiry
                    </option>
                    <option value="Privacy or Data Request">Privacy or Data Request</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-800 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know how we can help..."
                    className="w-full p-3.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </article>
        )}
      </div>
    </div>
  );
}
