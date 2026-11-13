export type ParkingSetupId = 'driveway' | 'cross-pavement' | 'public-only';

export type RouteView =
  | 'calculator'
  | 'privacy-policy'
  | 'affiliate-disclosure'
  | 'contact';

export interface EvPreset {
  id: string;
  name: string;
  efficiency: number;
  segment: string;
}

export interface ParkingSetupOption {
  id: ParkingSetupId;
  label: string;
  shortLabel: string;
  hardwareCost: number;
  grantEligible: boolean;
  description: string;
}

export interface CalculatorState {
  annualMileage: number;
  efficiency: number;
  selectedPresetId: string;
  homeTariffPence: number;
  publicRatePence: number;
  parkingSetup: ParkingSetupId;
  applyOzevGrant: boolean;
}

export interface CalculationResult {
  annualKwh: number;
  annualHomeCost: number;
  annualPublicCost: number;
  homeCostPerMilePence: number;
  publicCostPerMilePence: number;
  potentialYearlySavings: number;
  effectiveYearlySavings: number;
  fiveYearGrossSavings: number;
  fiveYearNetSavings: number;
  baseHardwareCost: number;
  grantDiscountApplied: number;
  netHardwareCost: number;
  paybackMonths: number | null;
  savingsPercent: number;
  fiveYearHomeTotalWithHardware: number;
  fiveYearPublicTotal: number;
}

export interface GearItem {
  id: string;
  title: string;
  categoryMeta: string;
  guidePrice: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  specs: {
    label: string;
    value: string;
  }[];
  amazonUrl: string;
  ctaLabel: string;
}

export interface TariffItem {
  id: string;
  tariffName: string;
  supplier: string;
  offPeakRatePence: number;
  offPeakDisplay: string;
  windowDisplay: string;
  tariffTypeMeta: string;
  highlights: string;
  exitFee: string;
  referralUrl: string;
  ctaLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
