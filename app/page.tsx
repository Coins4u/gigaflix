import Image from "next/image";
import Link from "next/link";
import {
  heroImageSrc,
  HERO_IMAGE_SIZES,
  logoImageSrc,
} from "@/lib/site-images";
import Icon from "./components/Icon";
import CatchonTVUIClient from "./components/CatchonTVUIClient";
import MobileMenuToggle from "./components/MobileMenuToggle";
import HeroStats from "./components/HeroStats";
import HomeContentClient from "./components/HomeContentClient";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xc9E0AAAAASUVORK5CYII=";

/**
 * Home is a **Server Component** so the hero `next/image` (LCP) and header HTML
 * stream before the large client island (`HomeContentClient`) hydrates—better mobile
 * LCP/TBT than a single 900+ line `use client` page.
 */
export default function Home() {
  return (
    <>
      <CatchonTVUIClient currency="usd" />
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
                Sports
              </a>
              <a href="#movies" className="nav-link">
                Movies
              </a>
              <a href="#pricing" className="nav-link">
                Pricing
              </a>
              <Link href="/channels" className="nav-link">
                Channels
              </Link>
              <Link href="/guide" className="nav-link">
                installation guide
              </Link>
              <Link href="/contact" className="nav-link">
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
                GiGa FliX IPTV: <span>Premium IPTV Service 2026</span>
              </h1>
              <p className="hero-subtitle">
                GiGa FliX is a premium IPTV service built for{" "}
                <strong>stable streaming</strong> and{" "}
                <strong>quick setup</strong>. Stream live TV, sports, and VOD on{" "}
                <strong>Firestick</strong>, <strong>Kodi</strong>,{" "}
                <strong>Smart TVs</strong>, and popular IPTV apps using{" "}
                <strong>Xtream</strong> or <strong>M3U</strong>.
              </p>
              <ul className="hero-features">
                <li>
                  <Icon name="check-circle" className="icon" /> 4K-ready streaming
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Stable servers
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Fast activation
                </li>
              </ul>
              <div className="hero-buttons">
                <a href="#pricing" className="btn btn-primary">
                  Get Started
                </a>
                <a href="#features" className="btn btn-outline">
                  Learn More
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
                    <Icon name="bolt" className="icon" /> Instant Setup
                  </span>
                  <span className="hero-pill">
                    <Icon name="signal" className="icon" /> Stable Streams
                  </span>
                </div>
              </div>
              <HeroStats />
            </div>
          </div>
        </section>

        <HomeContentClient />
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
                The most reliable <strong>IPTV service provider</strong> for{" "}
                <strong>premium IPTV subscriptions</strong> world-wide.
              </p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <Link href="/channels">Channels</Link>
                </li>
                <li>
                  <Link href="/guide">Installation Guide</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link href="/TermsConditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/RefundPolicy">Refund Policy</Link>
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
        aria-label="Contact us on WhatsApp"
      >
        <Icon name="whatsapp" className="icon" />
      </a>
    </>
  );
}
