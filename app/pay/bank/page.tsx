import type { Metadata } from "next";
import CopyableField from "../../components/CopyableField";
import PaymentOrderSummary from "../../components/PaymentOrderSummary";
import PaymentPageShell from "../../components/PaymentPageShell";
import PaymentWarnings from "../../components/PaymentWarnings";
import {
  BANK_PAYMENT_DETAILS,
  paymentReferenceHint,
} from "../../../lib/payment-details";
import { parsePaymentPageParams } from "../../../lib/payment-method";

export const metadata: Metadata = {
  title: "Bank Transfer Payment | GiGa FliX",
  description:
    "Complete your GiGa FliX order by SEPA Instant bank transfer. Pay the discounted plan total and reply with your receipt.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ plan?: string; amount?: string; ref?: string }>;
};

export default async function BankPaymentPage({ searchParams }: PageProps) {
  const params = parsePaymentPageParams(await searchParams);
  const b = BANK_PAYMENT_DETAILS;
  const referenceHint = paymentReferenceHint(params.invoiceRef);

  return (
    <PaymentPageShell
      title="Bank transfer (SEPA Instant)"
      subtitle="Pay the final discounted amount below by SEPA Instant transfer, then reply to your order email with a receipt."
    >
      <PaymentOrderSummary
        plan={params.plan}
        amountDisplay={params.amountDisplay}
        invoiceRef={params.invoiceRef}
      />

      <section className="pay-panel">
        <h2 className="pay-panel__heading">SEPA Instant instructions</h2>
        <ol className="pay-steps">
          <li>Open your banking app or online banking.</li>
          <li>
            Choose <strong>{b.transferType}</strong> (not a standard delayed
            SEPA credit transfer if Instant is available).
          </li>
          <li>Enter the beneficiary details below exactly as shown.</li>
          <li>
            Send exactly <strong>{params.amountDisplay}</strong> (final price
            with 15% off).
          </li>
          <li>
            Set the payment reference to{" "}
            <strong>{params.invoiceRef} + your full name</strong>. Do not
            include words like &quot;TV&quot; or &quot;IPTV&quot; in the
            payment reference or description.
          </li>
          <li>
            After the transfer, reply to your order confirmation email with a
            screenshot or receipt so we can activate your account.
          </li>
        </ol>
      </section>

      <section className="pay-panel">
        <h2 className="pay-panel__heading">Account details</h2>
        <div className="pay-fields">
          <CopyableField label="Beneficiary" value={b.beneficiary} mono={false} />
          <CopyableField label="Bank name" value={b.bankName} mono={false} />
          <CopyableField label="IBAN" value={b.iban} />
          <CopyableField label="BIC / SWIFT" value={b.bic} />
          <CopyableField
            label="Bank address"
            value={b.bankAddress}
            mono={false}
          />
          <CopyableField
            label="Amount to transfer"
            value={params.amountDisplay}
          />
          <CopyableField
            label="Reference / description"
            value={referenceHint}
            mono={false}
          />
        </div>
      </section>

      <PaymentWarnings invoiceRef={params.invoiceRef} />
    </PaymentPageShell>
  );
}
