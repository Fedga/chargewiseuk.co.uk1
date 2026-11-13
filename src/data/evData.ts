import smartChargerImg from '../assets/images/gear_smart_ev_charger_1794569588550.jpg';
import type2CableImg from '../assets/images/gear_type2_ev_cable_1794569588830.jpg';
import cableRampImg from '../assets/images/gear_pavement_cable_ramp_1794569592932.jpg';
import ukTerracedStreetImg from '../assets/images/guide_uk_terraced_ev_1794569592591.jpg';
import { EvPreset, FaqItem, GearItem, ParkingSetupOption, TariffItem } from '../types';

export const GUIDE_HERO_IMAGE = {
  src: ukTerracedStreetImg,
  alt: 'Electric hatchback parked beside a British terraced house kerb connected via a flush recessed cross-pavement cable channel',
};

export const UK_EV_PRESETS: EvPreset[] = [
  { id: 'vw-id3', name: 'VW ID.3', efficiency: 3.5, segment: 'Hatchback' },
  { id: 'tesla-y', name: 'Tesla Model Y', efficiency: 3.8, segment: 'SUV' },
  { id: 'mg4', name: 'MG4 EV', efficiency: 3.6, segment: 'Hatchback' },
  { id: 'kia-niro', name: 'Kia Niro EV', efficiency: 3.9, segment: 'Crossover' },
  { id: 'nissan-leaf', name: 'Nissan Leaf', efficiency: 3.4, segment: 'Hatchback' },
  { id: 'audi-q4', name: 'Audi Q4 e-tron', efficiency: 3.1, segment: 'SUV' },
];

export const PARKING_SETUP_OPTIONS: ParkingSetupOption[] = [
  {
    id: 'driveway',
    label: 'Private Driveway (Home Charger ~£1,000)',
    shortLabel: 'Private Driveway',
    hardwareCost: 1000,
    grantEligible: true,
    description: 'Dedicated 7kW smart wallbox with standard single-phase domestic installation.',
  },
  {
    id: 'cross-pavement',
    label: 'Terraced House (Cross-Pavement Gully ~£1,200)',
    shortLabel: 'Terraced Gully',
    hardwareCost: 1200,
    grantEligible: true,
    description: 'Home smart wallbox paired with a council-approved flush pavement cable channel.',
  },
  {
    id: 'public-only',
    label: 'Public Charging Only',
    shortLabel: 'Public Only',
    hardwareCost: 0,
    grantEligible: false,
    description: 'Relying exclusively on public rapid and ultra-rapid charging networks (£0 upfront).',
  },
];

export const RECOMMENDED_GEAR: GearItem[] = [
  {
    id: 'smart-home-charger',
    title: '7kW Smart Home EV Charger',
    categoryMeta: '7.4kW Single-Phase · App Scheduled · OZEV Compliant',
    guidePrice: 'Typical UK price ~£549',
    imageSrc: smartChargerImg,
    imageAlt: 'Matte dark-slate 7kW UK smart home EV wallbox charger with subtle emerald indicator ring',
    summary:
      'Compact weatherproof Type 2 wallbox engineered for UK single-phase homes, featuring built-in PEN fault protection and automatic off-peak smart tariff scheduling.',
    specs: [
      { label: 'Charging Output', value: '7.4 kW (32A, ~25–30 miles/hr)' },
      { label: 'Smart Regulations', value: 'UK Smart Charge Points Regs compliant' },
      { label: 'Enclosure Rating', value: 'IP65 weatherproof & IK10 impact rated' },
    ],
    amazonUrl: 'https://amazon.co.uk&tag=chargewiseuk-21',
    ctaLabel: 'Check Price on Amazon UK',
  },
  {
    id: 'type2-10m-cable',
    title: '10m Heavy-Duty Type 2 Cable',
    categoryMeta: '10-Metre Reach · 32A / 7.4kW · UKCA & TUV Certified',
    guidePrice: 'Typical UK price ~£139',
    imageSrc: type2CableImg,
    imageAlt: 'Coiled 10-metre heavy-duty black Type 2 EV charging cable with ergonomic weatherproof connectors',
    summary:
      'Extra-length 10m Type 2 Mennekes charging lead designed specifically for terraced front gardens and cross-pavement gullies where the kerbside bay isn’t directly opposite the house.',
    specs: [
      { label: 'Cable Length', value: '10 metres (ideal for kerbside bays)' },
      { label: 'Current & Power', value: '32A Single-Phase (up to 7.4 kW)' },
      { label: 'Jacket Durability', value: ' Crush-resistant TPU (-30°C to +50°C)' },
    ],
    amazonUrl: 'https://amazon.co.uk&tag=chargewiseuk-21',
    ctaLabel: 'Check Price on Amazon UK',
  },
  {
    id: 'pavement-cable-ramp',
    title: 'Cross-Pavement Cable Protector Ramp',
    categoryMeta: 'Anti-Trip Bevel · High-Visibility · Vulcanised Rubber',
    guidePrice: 'Typical UK price ~£45',
    imageSrc: cableRampImg,
    imageAlt: 'Low-profile black rubber cross-pavement EV cable protector ramp with high-visibility yellow strips on slate paving',
    summary:
      'Low-profile tapered rubber pedestrian ramp for private driveways, shared access paths, or councils permitting temporary covered charging while awaiting permanent gully installation.',
    specs: [
      { label: 'Profile Design', value: 'Gentle anti-trip wheelchair/pram bevel' },
      { label: 'Channel Bore', value: '18mm underside slot fits heavy EV leads' },
      { label: 'Safety Visibility', value: 'Embedded high-visibility yellow strips' },
    ],
    amazonUrl: 'https://amazon.co.uk&tag=chargewiseuk-21',
    ctaLabel: 'Check Price on Amazon UK',
  },
];

export const UK_EV_TARIFFS: TariffItem[] = [
  {
    id: 'octopus-intelligent-go',
    tariffName: 'Octopus Intelligent Go',
    supplier: 'Octopus Energy',
    offPeakRatePence: 7.0,
    offPeakDisplay: '7.0p / kWh',
    windowDisplay: '11:30pm – 5:30am (6 hrs)',
    tariffTypeMeta: 'Whole-home off-peak · Smart dispatch bonus slots',
    highlights:
      'Drops your entire household electricity rate during the 6-hour overnight window, plus extra cheap daytime slots when grid renewables peak.',
    exitFee: '£0 exit fee',
    referralUrl: 'https://octopus.energy',
    ctaLabel: 'View £50 Credit Offer',
  },
  {
    id: 'ovo-charge-anytime',
    tariffName: 'OVO Charge Anytime',
    supplier: 'OVO Energy',
    offPeakRatePence: 14.0,
    offPeakDisplay: '14.0p / kWh',
    windowDisplay: 'Anytime smart schedule',
    tariffTypeMeta: 'EV-only bolt-on · Keep standard home day rate',
    highlights:
      'Plug in whenever you get home and set your ready-by time; smart-scheduled EV kWh are credited back on your monthly bill without raising daytime kitchen/home rates.',
    exitFee: '£0 exit fee',
    referralUrl: 'https://www.ovoenergy.com',
    ctaLabel: 'Check OVO Eligibility',
  },
  {
    id: 'british-gas-ev',
    tariffName: 'British Gas EV Tariff',
    supplier: 'British Gas',
    offPeakRatePence: 7.9,
    offPeakDisplay: '7.9p / kWh',
    windowDisplay: '12:00am – 5:00am (5 hrs)',
    tariffTypeMeta: 'ElectricDriver overnight · Hive SmartCharge compatible',
    highlights:
      'Dedicated 5-hour overnight off-peak electricity rate for whole-home appliances and EV charging, with optional FreeCharge credit incentives via Hive chargers.',
    exitFee: 'Varies by fix',
    referralUrl: 'https://www.britishgas.co.uk',
    ctaLabel: 'Compare British Gas EV',
  },
];

export const GRANT_STEPS = [
  {
    step: '01. Confirm On-Street Eligibility',
    detail:
      'You must own or rent a UK residential property with no usable off-street driveway and own, lease, or have ordered an eligible plug-in electric vehicle.',
  },
  {
    step: '02. Secure Local Council Gully Permission',
    detail:
      'Apply to your local highways authority for a Section 178 licence or approved cross-pavement channel scheme (such as Kerbo Charge, Gul-e, or Chargearm) before charger installation.',
  },
  {
    step: '03. Book an OZEV-Authorised Installer',
    detail:
      'Select an OZEV-registered electrical installer and choose a smart chargepoint model on the official UK government approved equipment list.',
  },
  {
    step: '04. Receive Upfront Invoice Deduction',
    detail:
      'Your installer submits the OZEV claim directly and deducts the grant (historically £350, with recent scheme caps up to 75% of socket install cost) straight from your final bill.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Cross-Pavement Legalities',
    question: 'Is it legal to trail an EV cable across a public UK pavement using a rubber mat?',
    answer:
      'Under Section 162 of the Highways Act 1980, placing wires or mats across a public footway without explicit local council permission can create liability if a pedestrian trips. Most UK councils prohibit loose mats on public pavements and instead require an approved flush recessed cross-pavement gully channel. Rubber protector ramps remain ideal for private driveways, shared courts, or councils running permitted trial schemes.',
  },
  {
    id: 'faq-2',
    category: 'OZEV Grants',
    question: 'Who can claim the £350 UK OZEV EV Chargepoint Grant?',
    answer:
      'In March 2024, the Office for Zero Emission Vehicles (OZEV) expanded the EV Chargepoint Grant specifically to households with on-street parking installing an approved cross-pavement charging solution, alongside renters and flat owners with dedicated off-street spaces. Standard freehold houses with private driveways no longer qualify unless renting.',
  },
  {
    id: 'faq-3',
    category: 'Payback & Costs',
    question: 'How long does a £1,200 cross-pavement gully and charger take to pay back?',
    answer:
      'For an average UK driver covering 8,000 miles a year at 3.5 mi/kWh, switching from 79p/kWh public rapid chargers (£1,806/yr) to a 7.0p/kWh overnight home EV tariff (£160/yr) saves roughly £1,646 per year—meaning a £1,200 setup pays for itself in under 9 months, or around 6.2 months when the £350 grant deduction is applied.',
  },
  {
    id: 'faq-4',
    category: 'Parking Bays',
    question: 'Does installing a cross-pavement gully reserve the parking space outside my house?',
    answer:
      'No. Public kerbside parking outside a terraced house remains open to any road user (or permit holder in Controlled Parking Zones). For this reason, most terraced-house EV owners pair their gully with a 10-metre Type 2 cable so they can still plug in smoothly even when parked one bay up or down the street.',
  },
  {
    id: 'faq-5',
    category: 'Smart Tariffs',
    question: 'Do I need a smart meter to get 7p–8p/kWh overnight EV electricity rates?',
    answer:
      'Yes. All UK time-of-use and smart EV tariffs—including Octopus Intelligent Go, OVO Charge Anytime, and British Gas ElectricDriver—require a working SMETS2 (or upgraded SMETS1) smart meter sending half-hourly readings so your supplier can bill off-peak kWh separately.',
  },
  {
    id: 'faq-6',
    category: 'Vehicle Efficiency',
    question: 'What mi/kWh efficiency figure should I enter for realistic UK weather?',
    answer:
      'Most mid-size electric hatchbacks and crossovers average 3.5 to 4.0 mi/kWh in mild UK spring/summer conditions and 2.8 to 3.3 mi/kWh in winter when cabin heating is active. Using 3.5 mi/kWh provides a balanced year-round UK average for an everyday family EV.',
  },
];
