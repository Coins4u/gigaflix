import Image from "next/image";
import Link from "next/link";
import {
  heroImageSrc,
  HERO_IMAGE_SIZES,
  logoImageSrc,
} from "@/lib/site-images";
import Icon from "../components/Icon";
import CatchonTVUIClient from "../components/CatchonTVUIClient";
import MobileMenuToggle from "../components/MobileMenuToggle";
import HeroStats from "../components/HeroStats";
import NlHomeContentClient from "../components/locale-home/NlHomeContentClient";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xc9E0AAAAASUVORK5CYII=";

export default function NlHomePage() {
  return (
    <>
      <CatchonTVUIClient currency="eur" />
      <header className="header">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#hero" className="logo">
              <Image
                src={logoImageSrc}
                alt="GiGa FliX Logo"
                width={160}
                height={40}
                sizes="160px"
                loading="eager"
              />
            </a>
            <MobileMenuToggle />
            <nav className="nav-links">
              <a href="#hero" className="nav-link">
                Home
              </a>
              <a href="#sports" className="nav-link">
                Sport
              </a>
              <a href="#movies" className="nav-link">
                Films
              </a>
              <a href="#pricing" className="nav-link">
                Prijzen
              </a>
              <Link href="/nl/channels" className="nav-link">
                Kanalen
              </Link>
              <Link href="/nl/guide" className="nav-link">
                Installatie Gids
              </Link>
              <Link href="/nl/contact" className="nav-link">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main role="main">
        <section id="hero" className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <span className="hero-badge">GiGa FliX</span>
              <h1 className="hero-title">
                GiGa FliX IPTV: <span>IPTV abonnement</span>
              </h1>
              <p className="hero-subtitle">
                GiGa FliX is er voor wie <strong>IPTV kopen</strong>
                in Nederland eenvoudig wil houden. Je krijgt <strong>Nederlandse IPTV</strong>, 4K‑kwaliteit en
                <strong>IPTV met abonnement</strong> dat stabiel blijft. Zoek je <strong>legale IPTV aanbieders</strong> in
                Nederland? Dan zit je hier goed.
              </p>
              <ul className="hero-features">
                <li>
                  <Icon name="check-circle" className="icon" /> Nederlandse zenders in 4K
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> IPTV met abonnement zonder haperingen
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Support dat snel reageert
                </li>
              </ul>
              <div className="hero-buttons">
                <a href="#pricing" className="btn btn-primary">
                  Start Nu
                </a>
                <a href="#features" className="btn btn-outline">
                  Meer Info
                </a>
              </div>
            </div>
            <div className="hero-media">
              <div className="hero-card hero-card-main">
                <Image
                  src={heroImageSrc}
                  alt="GiGa FliX streaming preview"
                  width={600}
                  height={400}
                  sizes={HERO_IMAGE_SIZES}
                  priority
                  fetchPriority="high"
                />
                <div className="hero-card-overlay">
                  <span className="hero-pill">
                    <Icon name="bolt" className="icon" /> Instant setup
                  </span>
                  <span className="hero-pill">
                    <Icon name="signal" className="icon" /> Stable streams
                  </span>
                </div>
              </div>
              <HeroStats
                labels={{
                  channels: "Live kanalen",
                  movies: "Films & Series",
                  support: "Support 24/7",
                }}
              />
            </div>
          </div>
        </section>

        <NlHomeContentClient />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <a href="#hero" className="footer-logo">
                <Image
                  src={logoImageSrc}
                  alt="GiGa FliX Logo"
                  width={160}
                  height={40}
                  sizes="160px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </a>
              <p className="footer-desc">
                Premium IPTV Subscription Service.
              </p>
            </div>
            <div className="footer-links">
              <h3>Snelle Links</h3>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#pricing">Prijzen</a>
                </li>
                <li>
                  <Link href="/nl/guide">Installatie Gids</Link>
                </li>
                <li>
                  <Link href="/nl/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Juridisch</h3>
              <ul>
                <li>
                  <Link href="/nl/TermsConditions">Voorwaarden</Link>
                </li>
                <li>
                  <Link href="/nl/privacy">Privacybeleid</Link>
                </li>
                <li>
                  <Link href="/nl/RefundPolicy">Restitutiebeleid</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2026 GiGa FliX. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/17624385265"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Neem contact met ons op via WhatsApp"
      >
        <Icon name="whatsapp" className="icon" />
      </a>
    </>
  );
}
