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
import FrHomeContentClient from "../components/locale-home/FrHomeContentClient";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xc9E0AAAAASUVORK5CYII=";

export default function FrHomePage() {
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
                Accueil
              </a>
              <a href="#sports" className="nav-link">
                Sports
              </a>
              <a href="#movies" className="nav-link">
                Films
              </a>
              <a href="#pricing" className="nav-link">
                Tarifs
              </a>
              <Link href="/fr/guide" className="nav-link">
                Guide d&apos;installation
              </Link>
              <Link href="/fr/contact" className="nav-link">
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
                GiGa FliX IPTV : <span>abonnement IPTV premium France</span>
              </h1>
              <p className="hero-subtitle">
                GiGa FliX propose un <strong>abonnement IPTV</strong> pensé pour le public français.
                Vous profitez d&apos;un streaming fluide en 4K, d&apos;une <strong>liste mise à jour de l IPTV M3U</strong> et de
                chaînes françaises. Notre <strong>fournisseur IPTV</strong> mise sur la stabilité et l&apos;accompagnement,
                pour un <strong>iptv abonnement</strong> fiable et agréable au quotidien.
              </p>
              <ul className="hero-features">
                <li>
                  <Icon name="check-circle" className="icon" /> Abonnement IPTV premium en 4K
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> IPTV France : chaînes françaises
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Support rapide et fiable
                </li>
              </ul>
              <div className="hero-buttons">
                <a href="#pricing" className="btn btn-primary">
                  Commencer
                </a>
                <a href="#features" className="btn btn-outline">
                  En savoir plus
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
                    <Icon name="bolt" className="icon" /> Installation instantanée
                  </span>
                  <span className="hero-pill">
                    <Icon name="signal" className="icon" /> Streams stables
                  </span>
                </div>
              </div>
              <HeroStats
                labels={{
                  channels: "Chaînes en direct",
                  movies: "Films & Séries",
                  support: "Support 24/7",
                }}
              />
            </div>
          </div>
        </section>

        <FrHomeContentClient />
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
                Service d&apos;abonnement IPTV Premium.
              </p>
            </div>
            <div className="footer-links">
              <h3>Liens Rapides</h3>
              <ul>
                <li>
                  <a href="#home">Accueil</a>
                </li>
                <li>
                  <a href="#pricing">Tarifs</a>
                </li>
                <li>
                  <Link href="/fr/guide">Guide d&apos;installation</Link>
                </li>
                <li>
                  <Link href="/fr/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Légal</h3>
              <ul>
                <li>
                  <Link href="/fr/TermsConditions">Conditions Générales</Link>
                </li>
                <li>
                  <Link href="/fr/privacy">Confidentialité</Link>
                </li>
                <li>
                  <Link href="/fr/RefundPolicy">Remboursement</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2026 GiGa FliX. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/17624385265"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
      >
        <Icon name="whatsapp" className="icon" />
      </a>
    </>
  );
}
