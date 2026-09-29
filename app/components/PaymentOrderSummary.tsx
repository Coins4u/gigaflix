type Props = {
  plan: string;
  amountDisplay: string;
  invoiceRef: string;
  /** Optional second amount line (e.g. USDT total) */
  secondaryAmount?: string;
  secondaryLabel?: string;
};

export default function PaymentOrderSummary({
  plan,
  amountDisplay,
  invoiceRef,
  secondaryAmount,
  secondaryLabel,
}: Props) {
  return (
    <section className="pay-summary" aria-label="Order summary">
      <h2 className="pay-summary__heading">Order summary</h2>
      <dl className="pay-summary__grid">
        <div>
          <dt>Plan</dt>
          <dd>{plan}</dd>
        </div>
        <div>
          <dt>Final price (15% off)</dt>
          <dd className="pay-summary__price">{amountDisplay}</dd>
        </div>
        {secondaryAmount ? (
          <div>
            <dt>{secondaryLabel || "Amount to send"}</dt>
            <dd className="pay-summary__price">{secondaryAmount}</dd>
          </div>
        ) : null}
        <div>
          <dt>Order reference</dt>
          <dd className="pay-summary__ref">{invoiceRef}</dd>
        </div>
      </dl>
    </section>
  );
}
