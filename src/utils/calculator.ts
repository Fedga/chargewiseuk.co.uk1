import { PARKING_SETUP_OPTIONS } from '../data/evData';
import { CalculationResult, CalculatorState } from '../types';

export const OZEV_GRANT_AMOUNT = 350;

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  annualMileage: 8000,
  efficiency: 3.5,
  selectedPresetId: 'vw-id3',
  homeTariffPence: 7.0,
  publicRatePence: 79.0,
  parkingSetup: 'cross-pavement',
  applyOzevGrant: false,
};

export function calculateEvSavings(state: CalculatorState): CalculationResult {
  const safeMileage = Math.max(0, Number.isFinite(state.annualMileage) ? state.annualMileage : 0);
  const safeEfficiency = Math.max(0.5, Number.isFinite(state.efficiency) && state.efficiency > 0 ? state.efficiency : 3.5);
  const safeHomePence = Math.max(0, Number.isFinite(state.homeTariffPence) ? state.homeTariffPence : 0);
  const safePublicPence = Math.max(0, Number.isFinite(state.publicRatePence) ? state.publicRatePence : 0);

  const annualKwh = safeMileage / safeEfficiency;
  const annualHomeCost = annualKwh * (safeHomePence / 100);
  const annualPublicCost = annualKwh * (safePublicPence / 100);

  const homeCostPerMilePence = safeMileage > 0 ? (annualHomeCost * 100) / safeMileage : 0;
  const publicCostPerMilePence = safeMileage > 0 ? (annualPublicCost * 100) / safeMileage : 0;

  const potentialYearlySavings = Math.max(0, annualPublicCost - annualHomeCost);

  const setupOption =
    PARKING_SETUP_OPTIONS.find((opt) => opt.id === state.parkingSetup) ?? PARKING_SETUP_OPTIONS[0];

  const isPublicOnly = state.parkingSetup === 'public-only';
  const baseHardwareCost = setupOption.hardwareCost;
  const grantDiscountApplied =
    !isPublicOnly && setupOption.grantEligible && state.applyOzevGrant
      ? Math.min(baseHardwareCost, OZEV_GRANT_AMOUNT)
      : 0;
  const netHardwareCost = Math.max(0, baseHardwareCost - grantDiscountApplied);

  const effectiveYearlySavings = isPublicOnly ? 0 : potentialYearlySavings;
  const fiveYearGrossSavings = effectiveYearlySavings * 5;
  const fiveYearNetSavings = isPublicOnly ? 0 : fiveYearGrossSavings - netHardwareCost;

  let paybackMonths: number | null = null;
  if (!isPublicOnly && potentialYearlySavings > 0) {
    const monthlySavings = potentialYearlySavings / 12;
    paybackMonths = Math.round((netHardwareCost / monthlySavings) * 10) / 10;
  }

  const savingsPercent =
    annualPublicCost > 0
      ? Math.max(0, Math.round(((annualPublicCost - annualHomeCost) / annualPublicCost) * 100))
      : 0;

  const fiveYearHomeTotalWithHardware = annualHomeCost * 5 + netHardwareCost;
  const fiveYearPublicTotal = annualPublicCost * 5;

  return {
    annualKwh,
    annualHomeCost,
    annualPublicCost,
    homeCostPerMilePence,
    publicCostPerMilePence,
    potentialYearlySavings,
    effectiveYearlySavings,
    fiveYearGrossSavings,
    fiveYearNetSavings,
    baseHardwareCost,
    grantDiscountApplied,
    netHardwareCost,
    paybackMonths,
    savingsPercent,
    fiveYearHomeTotalWithHardware,
    fiveYearPublicTotal,
  };
}

export function formatGBP(amount: number, showDecimals = false): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  return formatter.format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 0,
  }).format(amount);
}
