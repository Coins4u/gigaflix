/**
 * Listed plan prices and 15% bank-transfer / crypto discount helpers.
 */

export const BANK_CRYPTO_DISCOUNT_RATE = 0.15;

/** Parse the first euro amount from a price display string (e.g. "€13.67 /mo"). */
export function parseListedEuroAmount(priceDisplay: string): number | null {
  const match = priceDisplay.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

/** Final price = listed × 0.85, rounded to 2 decimals. */
export function applyBankCryptoDiscount(listedPrice: number): number {
  return Math.round(listedPrice * (1 - BANK_CRYPTO_DISCOUNT_RATE) * 100) / 100;
}

export function formatEuro(amount: number): string {
  return `€${amount.toFixed(2)}`;
}

export type OrderPricePair = {
  listedPrice: number;
  discountedPrice: number;
  listedDisplay: string;
  discountedDisplay: string;
};

export function resolveOrderPrices(
  priceDisplay: string,
): OrderPricePair | null {
  const listedPrice = parseListedEuroAmount(priceDisplay);
  if (listedPrice == null) return null;
  const discountedPrice = applyBankCryptoDiscount(listedPrice);
  return {
    listedPrice,
    discountedPrice,
    listedDisplay: formatEuro(listedPrice),
    discountedDisplay: formatEuro(discountedPrice),
  };
}
