/**
 * Checkout URLs per pricing tier (DOM order: standard 1mo–12mo, then premium 1mo–12mo).
 * Used for order/invoice emails and the order modal. USD and EUR use the same G2G offer links.
 * Update when offer URLs change.
 */
export type CurrencyCode = "usd" | "eur";

export type SellAppTier = {
  /** Stable id for debugging / analytics */
  id: string;
  sellAppUrlUsd: string;
  sellAppUrlEur: string;
};

const both = (url: string) => ({ sellAppUrlUsd: url, sellAppUrlEur: url });

export const SELLAPP_TIERS: SellAppTier[] = [
  {
    id: "std-1m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=1",
    ),
  },
  {
    id: "std-3m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=3",
    ),
  },
  {
    id: "std-6m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=5",
    ),
  },
  {
    id: "std-12m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=7",
    ),
  },
  {
    id: "prem-1m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=2",
    ),
  },
  {
    id: "prem-3m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=4",
    ),
  },
  {
    id: "prem-6m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=6",
    ),
  },
  {
    id: "prem-12m",
    ...both(
      "https://apollogt.vip/api/pay-a?tier=8",
    ),
  },
];

export function getSellAppLinkForTier(
  tierIndex: number,
  currency: CurrencyCode,
): string | undefined {
  const tier = SELLAPP_TIERS[tierIndex];
  if (!tier) return undefined;
  return currency === "usd" ? tier.sellAppUrlUsd : tier.sellAppUrlEur;
}
