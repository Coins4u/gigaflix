/**
 * EUR → USDT conversion helpers for the crypto payment page.
 * Uses CoinGecko (EUR per 1 USDT). Falls back to a conservative rate if the API fails.
 */

const FALLBACK_EUR_PER_USDT = 0.92;

export type UsdtRateResult = {
  eurPerUsdt: number;
  usdtAmount: number;
  source: "live" | "fallback";
  fetchedAt: string;
};

export function euroToUsdt(euroAmount: number, eurPerUsdt: number): number {
  if (eurPerUsdt <= 0) return 0;
  // Stablecoin display: 2 decimal places
  return Math.round((euroAmount / eurPerUsdt) * 100) / 100;
}

export async function fetchEurUsdtRate(
  euroAmount: number,
): Promise<UsdtRateResult> {
  const fetchedAt = new Date().toISOString();
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=eur",
      {
        next: { revalidate: 300 },
        headers: { Accept: "application/json" },
      },
    );
    if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);
    const data = (await res.json()) as { tether?: { eur?: number } };
    const eurPerUsdt = data.tether?.eur;
    if (typeof eurPerUsdt !== "number" || eurPerUsdt <= 0) {
      throw new Error("Invalid tether EUR rate");
    }
    return {
      eurPerUsdt,
      usdtAmount: euroToUsdt(euroAmount, eurPerUsdt),
      source: "live",
      fetchedAt,
    };
  } catch {
    return {
      eurPerUsdt: FALLBACK_EUR_PER_USDT,
      usdtAmount: euroToUsdt(euroAmount, FALLBACK_EUR_PER_USDT),
      source: "fallback",
      fetchedAt,
    };
  }
}

export function formatUsdt(amount: number): string {
  return `${amount.toFixed(2)} USDT`;
}
