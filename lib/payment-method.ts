/**
 * Order-form payment methods and payment-page URL builders.
 */

export const SELECTABLE_PAYMENT_METHODS = [
  "bank_transfer",
  "cryptocurrency",
] as const;

export type SelectablePaymentMethod =
  (typeof SELECTABLE_PAYMENT_METHODS)[number];

export type PaymentMethodOption =
  | SelectablePaymentMethod
  | "credit_card"
  | "paypal";

/** Admin / English labels for selectable methods */
export const PAYMENT_METHOD_LABELS: Record<SelectablePaymentMethod, string> = {
  bank_transfer: "Bank Transfer",
  cryptocurrency: "Cryptocurrency",
};

export type PaymentDetailsUrlParams = {
  siteOrigin: string;
  plan: string;
  /** Final discounted euro amount, e.g. 57.36 */
  amount: number | string;
  invoiceRef: string;
};

export function isSelectablePaymentMethod(
  value: string,
): value is SelectablePaymentMethod {
  return (SELECTABLE_PAYMENT_METHODS as readonly string[]).includes(value);
}

function paymentPath(method: SelectablePaymentMethod): "/pay/bank" | "/pay/crypto" {
  return method === "bank_transfer" ? "/pay/bank" : "/pay/crypto";
}

/**
 * Builds the customer email CTA URL for the matching payment page,
 * including plan, discounted amount, and order reference as query params.
 *
 * Optional env overrides (base URL only; query params are still appended):
 * BANK_TRANSFER_DETAILS_URL / CRYPTO_DETAILS_URL
 */
export function getPaymentDetailsUrl(
  method: SelectablePaymentMethod,
  params: PaymentDetailsUrlParams,
): string {
  const origin = params.siteOrigin.replace(/\/$/, "");
  const envBase =
    method === "bank_transfer"
      ? process.env.BANK_TRANSFER_DETAILS_URL?.trim()
      : process.env.CRYPTO_DETAILS_URL?.trim();

  const base = envBase || `${origin}${paymentPath(method)}`;
  const url = new URL(base);
  url.searchParams.set("plan", params.plan);
  const amountStr =
    typeof params.amount === "number"
      ? params.amount.toFixed(2)
      : String(params.amount).replace(/[^\d.]/g, "") || "0";
  url.searchParams.set("amount", amountStr);
  url.searchParams.set("ref", params.invoiceRef);
  return url.toString();
}

/** Parse /pay/* search params into a safe display model */
export function parsePaymentPageParams(raw: {
  plan?: string;
  amount?: string;
  ref?: string;
}): {
  plan: string;
  amount: number | null;
  amountDisplay: string;
  invoiceRef: string;
} {
  const plan = (raw.plan || "").trim() || "Your selected plan";
  const amountRaw = (raw.amount || "").replace(/[^\d.]/g, "");
  const amount = amountRaw ? Number(amountRaw) : null;
  const validAmount =
    amount != null && Number.isFinite(amount) && amount > 0 ? amount : null;
  const invoiceRef = (raw.ref || "").trim() || "—";
  return {
    plan,
    amount: validAmount,
    amountDisplay: validAmount != null ? `€${validAmount.toFixed(2)}` : "—",
    invoiceRef,
  };
}
