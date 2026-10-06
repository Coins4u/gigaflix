/**
 * Crypto payment page details (public).
 * Bank account credentials are never shown on the website or in automated emails —
 * they are sent manually after the customer replies to the order confirmation.
 */

export const CRYPTO_PAYMENT_DETAILS = {
  asset: "USDT",
  network: "BEP20 (BNB Smart Chain)",
  networkShort: "USDT (BEP20) BNB Smart Chain",
  walletAddress: "0x954705efe9a5c038d90fae64fd5408ea71d7a1cb",
  note: "Send only USDT on BEP20 (BNB Smart Chain). Other assets or networks may be lost.",
} as const;

/** Suggested payment reference: order ref + full name (no TV/IPTV wording). */
export function paymentReferenceHint(invoiceRef: string): string {
  const ref = invoiceRef.trim() || "ORDER REF";
  return `${ref} + your full name`;
}
