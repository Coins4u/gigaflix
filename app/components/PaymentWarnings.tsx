type Props = {
  /** Suggested payment reference (invoice / order id) */
  invoiceRef: string;
};

export default function PaymentWarnings({ invoiceRef }: Props) {
  return (
    <section className="pay-warnings" aria-label="Important payment instructions">
      <div className="pay-warnings__box pay-warnings__box--danger">
        <h2>Payment reference — important</h2>
        <p>
          In the transfer / payment reference or memo field, use:{" "}
          <strong>
            {invoiceRef} + your full name
          </strong>
          .
        </p>
        <p>
          Do <strong>not</strong> include words like &quot;TV&quot;,
          &quot;IPTV&quot;, channel names, or any streaming-related wording in
          the payment reference or description. Using those words can delay or
          block confirmation.
        </p>
      </div>

      <div className="pay-warnings__box pay-warnings__box--action">
        <h2>After you pay</h2>
        <p>
          Reply to your previous order confirmation email and attach a receipt
          or screenshot of the payment. We confirm the payment from that reply
          before activating your account.
        </p>
        <p>
          Do not open a new support thread for the same order — reply to the
          order email so we can match your payment quickly.
        </p>
      </div>
    </section>
  );
}
