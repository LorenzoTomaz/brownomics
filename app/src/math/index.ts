type PriceArray = number[];

export interface Kpis {
  inflationRate: number;
  volatility: number;
  averageTokenPrice: number;
  peakToTrough: number;
  priceMomentum: number;
  movingInflation: { x: number[]; y: number[] };
}

// 1. Inflation Rate
export function computeInflationRate(y: PriceArray): number {
  if (y.length < 2) {
    return 0; // Not enough data points
  }
  let startPrice = y[0];
  let endPrice = y[y.length - 1];
  return ((endPrice - startPrice) / startPrice) * 100;
}

// 2. Volatility (Standard Deviation of Price Changes)
export function computeVolatility(y: PriceArray): number {
  let priceChanges: PriceArray = [];
  for (let i = 1; i < y.length; i++) {
    priceChanges.push(y[i] - y[i - 1]);
  }

  let meanChange =
    priceChanges.reduce((acc, val) => acc + val, 0) / priceChanges.length;
  let variance =
    priceChanges.reduce((acc, val) => acc + Math.pow(val - meanChange, 2), 0) /
    priceChanges.length;

  return Math.sqrt(variance);
}

// 3. Average Token Price
export function computeAverageTokenPrice(y: PriceArray): number {
  return y.reduce((acc, val) => acc + val, 0) / y.length;
}

// 4. Peak-to-Trough Decline
export function computePeakToTrough(y: PriceArray): number {
  let peak = Math.max(...y);
  let trough = Math.min(...y);
  return ((peak - trough) / peak) * 100;
}

// 5. Price Momentum
export function computePriceMomentum(y: PriceArray): number {
  if (y.length < 2) {
    return 0; // Not enough data points
  }
  let startPrice = y[0];
  let endPrice = y[y.length - 1];
  return (endPrice - startPrice) / y.length;
}

export function computeInflationRateForPeriod(
  y: PriceArray,
  start: number,
  end: number
): number {
  if (end > y.length || start < 0) {
    throw new Error("Invalid period specified");
  }

  let startPrice = y[start];
  let endPrice = y[end];
  return ((endPrice - startPrice) / startPrice) * 100;
}

function normalizeData(data: number[]): number[] {
  const min = Math.min(...data);
  const max = Math.max(...data);

  return data.map((value) => (value - min) / (max - min));
}

export function computeMovingInflation(
  y: PriceArray,
  windowSize: number = 30
): { y: number[]; x: number[] } {
  let results: number[] = [];
  for (let i = windowSize; i <= y.length; i += windowSize) {
    let inflationRate = computeInflationRateForPeriod(y, i - windowSize, i - 1);
    results.push(inflationRate);
  }
  results.pop(); // Remove last element because it's not a full window
  const x = results.map((_, i) => (i + 1) * windowSize);

  return { y: normalizeData(results), x };
}

export default function computeKpis(y: PriceArray): Kpis {
  return {
    inflationRate: computeInflationRate(y),
    volatility: computeVolatility(y),
    averageTokenPrice: computeAverageTokenPrice(y),
    peakToTrough: computePeakToTrough(y),
    priceMomentum: computePriceMomentum(y),
    movingInflation: computeMovingInflation(y),
  };
}
