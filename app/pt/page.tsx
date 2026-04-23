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
import PtHomeContentClient from "../components/locale-home/PtHomeContentClient";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6Xc9E0AAAAASUVORK5CYII=";

export default function PtHomePage() {
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
                Início
              </a>
              <a href="#sports" className="nav-link">
                Desporto
              </a>
              <a href="#movies" className="nav-link">
                Filmes
              </a>
              <a href="#pricing" className="nav-link">
                Preços
              </a>
              <Link href="/pt/guide" className="nav-link">
                Guia de Instalação
              </Link>
              <Link href="/pt/contact" className="nav-link">
                Contacto
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
                GiGa FliX IPTV: <span>IPTV Premium Portugal</span>
              </h1>
              <p className="hero-subtitle">
                GiGa FliX é para quem procura
                <strong>melhor iptv em portugal</strong> com estabilidade. Oferecemos <strong>IPTV Portugal</strong> em 4K,
                <strong>playlist IPTV Portugal</strong> e <strong>m3u iptv</strong> atualizados. Se procura
                <strong>iptv legal portugal</strong>, está no lugar certo.
              </p>
              <ul className="hero-features">
                <li>
                  <Icon name="check-circle" className="icon" /> IPTV 4K Portugal sem falhas
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Canais PT e internacionais
                </li>
                <li>
                  <Icon name="check-circle" className="icon" /> Suporte rápido e humano
                </li>
              </ul>
              <div className="hero-buttons">
                <a href="#pricing" className="btn btn-primary">
                  Começar Agora
                </a>
                <a href="#features" className="btn btn-outline">
                  Mais Info
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
                    <Icon name="bolt" className="icon" /> Configuração instantânea
                  </span>
                  <span className="hero-pill">
                    <Icon name="signal" className="icon" /> Correntes Estáveis
                  </span>
                </div>
              </div>
              <HeroStats
                labels={{
                  channels: "Canais ao vivo",
                  movies: "Filmes & séries",
                  support: "Suporte 24/7",
                }}
              />
            </div>
          </div>
        </section>

        <PtHomeContentClient />
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
                Serviço de Assinatura IPTV Premium.
              </p>
            </div>
            <div className="footer-links">
              <h3>Links Rápidos</h3>
              <ul>
                <li>
                  <a href="#home">Início</a>
                </li>
                <li>
                  <a href="#pricing">Preços</a>
                </li>
                <li>
                  <Link href="/pt/guide">Guia de Instalação</Link>
                </li>
                <li>
                  <Link href="/pt/contact">Contacto</Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link href="/pt/TermsConditions">Termos e Condições</Link>
                </li>
                <li>
                  <Link href="/pt/privacy">Política de Privacidade</Link>
                </li>
                <li>
                  <Link href="/pt/RefundPolicy">Política de Reembolso</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2026 GiGa FliX. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/17624385265"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacte-nos no WhatsApp"
      >
        <Icon name="whatsapp" className="icon" />
      </a>
    </>
  );
}
