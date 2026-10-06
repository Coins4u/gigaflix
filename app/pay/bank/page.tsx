import type { Metadata } from "next";
import PaymentOrderSummary from "../../components/PaymentOrderSummary";
import PaymentPageShell from "../../components/PaymentPageShell";
import { parsePaymentPageParams } from "../../../lib/payment-method";

export const metadata: Metadata = {
  title: "Bank Transfer | GiGa FliX",
  description:
    "Bank transfer details are provided privately by email after you confirm your order.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ plan?: string; amount?: string; ref?: string }>;
};

export default async function BankPaymentPage({ searchParams }: PageProps) {
  const params = parsePaymentPageParams(await searchParams);

  return (
    <PaymentPageShell
      title="Bank transfer"
      subtitle="Secure bank payment details are sent privately by email — they are not published on this page."
    >
      <PaymentOrderSummary
        plan={params.plan}
        amountDisplay={params.amountDisplay}
        invoiceRef={params.invoiceRef}
      />

      <section className="pay-panel">
        <h2 className="pay-panel__heading">How to complete payment</h2>
        <ol className="pay-steps">
          <li>
            Open the order confirmation email we sent you (check Spam /
            Promotions if needed).
          </li>
          <li>
            Reply directly to that email to confirm your order and request your
            secure bank payment details.
          </li>
          <li>
            We will review your reply and send IBAN / transfer instructions
            through that private email thread.
          </li>
          <li>
            After payment is confirmed, we activate your account and send your
            credentials.
          </li>
        </ol>
        <p className="pay-panel__note">
          For your security, bank account details are never shown on this
          website or in the first automated email.
        </p>
      </section>

      <section className="pay-warnings" aria-label="Important">
        <div className="pay-warnings__box pay-warnings__box--action">
          <h2>Reply to your order email</h2>
          <p>
            Please reply to your previous order confirmation email so we can
            match your order reference <strong>{params.invoiceRef}</strong> and
            send payment details safely.
          </p>
        </div>
      </section>
    </PaymentPageShell>
  );
}
