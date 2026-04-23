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
import DeHomeContentClient from "../components/locale-home/DeHomeContentClient";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xc9E0AAAAASUVORK5CYII=";

export default function DeHomePage() {
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
                Startseite
              </a>
              <a href="#sports" className="nav-link">
                Sport
              </a>
              <a href="#movies" className="nav-link">
                Filme
              </a>
              <a href="#pricing" className="nav-link">
                Preise
              </a>
              <Link href="/de/guide" className="nav-link">
                Installationsanleitung
              </Link>
              <Link href="/de/contact" className="nav-link">
                Kontakt
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
                GiGa FliX IPTV: <span>Premium IPTV Anbieter</span>
              </h1>
              <p className="hero-subtitle">
                GiGa FliX ist ein <strong>IPTV Anbieter</strong> mit Fokus auf <strong>stabile Streams</strong> und schnelle Einrichtung.
                <strong>IPTV stream</strong> in 4K, <strong>Anti‑Freeze IPTV</strong> und einen stabilen
                <strong>IPTV server</strong>. So genießen Sie <strong>IPTV Deutsch</strong>, <strong>deutsches IPTV</strong>
                und internationale Sender – ideal für Suchende nach <strong>IPTV Germany</strong>, <strong>Germany IPTV</strong>,
                <strong>IPTV German</strong> oder <strong>German IPTV</strong>. Streaming funktioniert auf Firestick, Kodi,
                Smart TV und Apps wie <strong>IPTV Pro</strong> oder <strong>IPTV Extreme</strong>.
              </p>
              <ul className="hero-features">
                <li>
                  <Icon name="check-circle" className="icon" /> IPTV TV in 4K & stabile IPTV Streams
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Deutsches IPTV & IPTV Deutschland
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Bester IPTV Anbieter mit Support
                </li>
              </ul>
              <div className="hero-buttons">
                <a href="#pricing" className="btn btn-primary">
                  Jetzt starten
                </a>
                <a href="#features" className="btn btn-outline">
                  Mehr erfahren
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
                    <Icon name="bolt" className="icon" /> Schnelle Installation
                  </span>
                  <span className="hero-pill">
                    <Icon name="signal" className="icon" /> Stabile Streams
                  </span>
                </div>
              </div>
              <HeroStats
                labels={{
                  channels: "Live Kanäle",
                  movies: "Filme & Serien",
                  support: "Support",
                }}
              />
            </div>
          </div>
        </section>

        <DeHomeContentClient />
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
              <h3>Schnelllinks</h3>
              <ul>
                <li>
                  <a href="#home">Startseite</a>
                </li>
                <li>
                  <a href="#pricing">Preise</a>
                </li>
                <li>
                  <Link href="/de/guide">Installationsanleitung</Link>
                </li>
                <li>
                  <Link href="/de/contact">Kontakt</Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Rechtliches</h3>
              <ul>
                <li>
                  <Link href="/de/TermsConditions">AGB</Link>
                </li>
                <li>
                  <Link href="/de/privacy">Datenschutzerklärung</Link>
                </li>
                <li>
                  <Link href="/de/RefundPolicy">Rückerstattung</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2026 GiGa FliX. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/17624385265"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kontaktieren Sie uns auf WhatsApp"
      >
        <Icon name="whatsapp" className="icon" />
      </a>
    </>
  );
}
