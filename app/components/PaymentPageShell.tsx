import Image from "next/image";
import Link from "next/link";
import { logoImageSrc } from "@/lib/site-images";
import CatchonTVUIClient from "./CatchonTVUIClient";
import MobileMenuToggle from "./MobileMenuToggle";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function PaymentPageShell({ title, subtitle, children }: Props) {
  return (
    <>
      <CatchonTVUIClient currency="eur" />
      <header className="header">
        <div className="container">
          <div className="nav-wrapper">
            <Link href="/" className="logo">
              <Image
                src={logoImageSrc}
                alt="GiGa FliX Logo"
                width={160}
                height={40}
                sizes="160px"
                priority
              />
            </Link>
            <MobileMenuToggle />
            <nav className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <a href="/#pricing" className="nav-link">
                Pricing
              </a>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pay-page">
        <div className="container pay-page__inner">
          <p className="pay-page__eyebrow">Secure checkout</p>
          <h1 className="pay-page__title">{title}</h1>
          <p className="pay-page__subtitle">{subtitle}</p>
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <Image
                  src={logoImageSrc}
                  alt="GiGa FliX Logo"
                  width={160}
                  height={40}
                  sizes="160px"
                />
              </Link>
              <p className="footer-desc">
                Questions about payment? Reply to your order confirmation email.
              </p>
            </div>
            <div className="footer-links">
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link href="/TermsConditions">Terms &amp; Conditions</Link>
                </li>
                <li>
                  <Link href="/RefundPolicy">Refund Policy</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
