import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  buildBuyerOrderEmailHtml,
  buildBuyerOrderEmailText,
  getBuyerEmailSubject,
  generateInvoiceRef,
  resolveBuyerLocaleFromCountry,
} from "../../../lib/buyer-order-email-html";
import { resolveOrderPrices } from "../../../lib/order-pricing";
import {
  getPaymentDetailsUrl,
  isSelectablePaymentMethod,
  PAYMENT_METHOD_LABELS,
  type SelectablePaymentMethod,
} from "../../../lib/payment-method";

type Body = {
  fullName?: string;
  email?: string;
  country?: string;
  tierName?: string;
  /** Display price from the pricing card, e.g. "€14.32 /mo" */
  priceDisplay?: string;
  paymentMethod?: string;
};

function normalizeSiteOrigin(raw: string | undefined): string {
  const fallback = "https://gigaflixiptv.com";
  const value = (raw || "").trim();
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, "");
  return `https://${value.replace(/\/$/, "")}`;
}

/** Inbox that receives customer replies (bank verification loop). */
function resolveReplyTo(from: string): string {
  const explicit = process.env.SMTP_REPLY_TO?.trim();
  if (explicit) return explicit;
  const user = process.env.SMTP_USER?.trim();
  if (user) return user;
  const match = from.match(/<([^>]+)>/);
  return match?.[1]?.trim() || from;
}

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("Missing SMTP_HOST, SMTP_USER, or SMTP_PASS");
  }
  const port = Number(process.env.SMTP_PORT) || 587;
  // Port 465 uses implicit TLS (SSL); Hostinger needs secure: true
  const secure =
    port === 465 || process.env.SMTP_SECURE === "true";
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const country = typeof body.country === "string" ? body.country.trim() : "";
  const tierName =
    typeof body.tierName === "string" ? body.tierName.trim() : "";
  const priceDisplay =
    typeof body.priceDisplay === "string" ? body.priceDisplay.trim() : "";
  const paymentMethodRaw =
    typeof body.paymentMethod === "string" ? body.paymentMethod.trim() : "";

  if (!fullName || !email || !country || !tierName || !paymentMethodRaw) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!isSelectablePaymentMethod(paymentMethodRaw)) {
    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 },
    );
  }

  // Keep a uniquely named const (avoid object-shorthand minify bugs in prod).
  const selectedPaymentMethod: SelectablePaymentMethod = paymentMethodRaw;
  const paymentMethodLabel = PAYMENT_METHOD_LABELS[selectedPaymentMethod];
  const isBankTransfer = selectedPaymentMethod === "bank_transfer";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const prices = resolveOrderPrices(priceDisplay);
  const listedPriceDisplay = prices?.listedDisplay ?? (priceDisplay || "—");
  const discountedPriceDisplay = prices?.discountedDisplay ?? "—";
  const discountedAmount =
    prices?.discountedPrice ??
    (parseFloat(discountedPriceDisplay.replace(/[^\d.]/g, "")) || 0);

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const from = (process.env.SMTP_FROM || process.env.SMTP_USER)?.trim();
  if (!adminEmail || !from) {
    console.error(
      "send-order-link: Missing ADMIN_EMAIL or SMTP_FROM/SMTP_USER — add them to .env.local (not only .env.example)",
    );
    return NextResponse.json(
      { error: "Server email configuration error" },
      { status: 500 },
    );
  }

  let transporter: nodemailer.Transporter;
  try {
    transporter = buildTransporter();
  } catch (e) {
    console.error("send-order-link: SMTP config error:", e);
    return NextResponse.json(
      { error: "Server email configuration error" },
      { status: 500 },
    );
  }

  try {
    const siteOrigin = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
    const invoiceRef = generateInvoiceRef();
    const locale = resolveBuyerLocaleFromCountry(country);
    const replyTo = resolveReplyTo(from);

    // Crypto: link to payment page. Bank: no public credentials / no CTA URL.
    const paymentDetailsUrl = isBankTransfer
      ? ""
      : getPaymentDetailsUrl(selectedPaymentMethod, {
          siteOrigin,
          plan: tierName,
          amount: discountedAmount,
          invoiceRef,
        });

    const buyerSubject = getBuyerEmailSubject(tierName, invoiceRef, locale);
    const buyerHtml = buildBuyerOrderEmailHtml({
      fullName,
      email,
      country,
      tierName,
      listedPriceDisplay,
      discountedPriceDisplay,
      invoiceRef,
      siteOrigin,
      locale,
      paymentMethod: selectedPaymentMethod,
      paymentDetailsUrl,
    });

    const buyerText = buildBuyerOrderEmailText({
      fullName,
      tierName,
      listedPriceDisplay,
      discountedPriceDisplay,
      invoiceRef,
      locale,
      paymentMethod: selectedPaymentMethod,
      paymentDetailsUrl,
    });

    const adminSubject = `NEW FORM FILLED: ${tierName} - ${fullName}`;
    const adminStatus = isBankTransfer
      ? "Bank transfer order — customer was asked to REPLY to the confirmation email for private bank details (no IBAN in automated email). When they reply, send credentials manually in that thread."
      : `Cryptocurrency follow-up email sent with payment page link.\nPayment page: ${paymentDetailsUrl}`;
    const adminText = [
      "A user has filled the order form.",
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Country: ${country}`,
      `Tier Selected: ${tierName}`,
      `Payment Method: ${paymentMethodLabel}`,
      `Listed price: ${listedPriceDisplay}`,
      `Discounted price (15% off bank transfer / crypto): ${discountedPriceDisplay}`,
      `Order reference: ${invoiceRef}`,
      `Reply-To on buyer email: ${replyTo}`,
      `Status: ${adminStatus}`,
    ].join("\n");

    await Promise.all([
      transporter.sendMail({
        from,
        replyTo,
        to: email,
        subject: buyerSubject,
        text: buyerText,
        html: buyerHtml,
      }),
      transporter.sendMail({
        from,
        to: adminEmail,
        subject: adminSubject,
        text: adminText,
      }),
    ]);

    return NextResponse.json({
      ok: true,
      listedPriceDisplay,
      discountedPriceDisplay,
      paymentMethod: selectedPaymentMethod,
    });
  } catch (err) {
    console.error("send-order-link: order processing error:", err);
    const message =
      err instanceof Error && /smtp|mail|econn|auth/i.test(err.message)
        ? "Failed to send emails. Please try again later."
        : "Failed to process order. Please try again later.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
