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
      "https://www.g2g.com/categories/dino-iptv-accounts/offer/G1776945010505AC?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "std-3m",
    ...both(
      "https://www.g2g.com/categories/dino-iptv-accounts/offer/G1776945180122MY?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "std-6m",
    ...both(
      "https://www.g2g.com/categories/dino-iptv-accounts/offer/G1776945241101FO?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "std-12m",
    ...both(
      "https://www.g2g.com/categories/dino-iptv-accounts/offer/G1776945322940VL?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "prem-1m",
    ...both(
      "https://www.g2g.com/categories/strng-iptv-8k-accounts/offer/G1776945528798UP?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "prem-3m",
    ...both(
      "https://www.g2g.com/categories/strng-iptv-8k-accounts/offer/G1776945585974AK?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "prem-6m",
    ...both(
      "https://www.g2g.com/categories/strng-iptv-8k-accounts/offer/G1776945662340BS?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
    ),
  },
  {
    id: "prem-12m",
    ...both(
      "https://www.g2g.com/categories/strng-iptv-8k-accounts/offer/G1776945715792GW?region_id=0f76ac42-3267-4d77-9fba-f9d9d719dac9&seller=Usopp7z",
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
