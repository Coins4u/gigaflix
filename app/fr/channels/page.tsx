import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  channelCategoryImageSrc,
  CHANNEL_CATEGORY_IMAGE_SIZES,
  logoImageSrc,
} from "@/lib/site-images";
import Icon from "../../components/Icon";
import CatchonTVUIClient from "../../components/CatchonTVUIClient";
import MobileMenuToggle from "../../components/MobileMenuToggle";

export const metadata: Metadata = {
  title: "Catégories de chaînes | GiGa FliX IPTV",
  description:
    "Parcourez les catégories de chaînes GiGa FliX : sport, films, infos, enfants, divertissement et musique en HD et 4K.",
  alternates: { canonical: "https://gigaflixiptv.com/fr/channels" },
};

const categories: {
  title: string;
  text: string;
  imageKey: keyof typeof channelCategoryImageSrc;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageLayout?: "tall";
}[] = [
  {
    title: "Sports Channels",
    text:
      "Watch live sports from around the world. Football, basketball, tennis, PPV, and major leagues with fast zapping and buffer-free quality when your connection is stable.",
    imageKey: "sport",
    imageAlt: "Sports channels: football, basketball, and live events",
    imageWidth: 800,
    imageHeight: 800,
  },
  {
    title: "Movie Channels",
    text:
      "A huge VOD and movie line-up: blockbusters, classics, and new releases in multiple languages, ready for a cinema-style night on your TV, box, or mobile.",
    imageKey: "movie",
    imageAlt: "Movie channels and cinema VOD",
    imageWidth: 1200,
    imageHeight: 1200,
  },
  {
    title: "News Channels",
    text:
      "24/7 news from the US, UK, EU, and global networks. Follow breaking stories, business, and analysis as they unfold, all in one subscription.",
    imageKey: "news",
    imageAlt: "News channels and live updates",
    imageWidth: 1280,
    imageHeight: 1280,
  },
  {
    title: "Kids Channels",
    text:
      "Family-friendly and educational content for children: cartoons, learning shows, and safe entertainment so kids can enjoy TV while you stay in control.",
    imageKey: "kids",
    imageAlt: "Kids channels and family programming",
    imageWidth: 2764,
    imageHeight: 3209,
    imageLayout: "tall",
  },
  {
    title: "Entertainment Channels",
    text:
      "Reality, drama, lifestyle, and top series. Discover weekly premieres, popular shows, and variety programming for every taste.",
    imageKey: "entertainment",
    imageAlt: "Entertainment and series channels",
    imageWidth: 600,
    imageHeight: 600,
  },
  {
    title: "Music Channels",
    text:
      "Concert, chart, and genre-dedicated music channels. From pop and rock to regional hits—soundtracks for your home and parties.",
    imageKey: "music",
    imageAlt: "Music channels and concerts",
    imageWidth: 800,
    imageHeight: 800,
  },
];

export default function FrChannelsPage() {
  return (
    <>
      <CatchonTVUIClient currency="eur" />
      <header className="header">
        <div className="container">
          <div className="nav-wrapper">
            <Link href="/fr" className="logo">
              <Image
                src={logoImageSrc}
                alt="GiGa FliX Logo"
                width={160}
                height={40}
                sizes="160px"
                loading="eager"
              />
            </Link>
            <MobileMenuToggle />
            <nav className="nav-links">
              <Link href="/fr" className="nav-link">
                Accueil
              </Link>
              <a href="/fr#sports" className="nav-link">
                Sports
              </a>
              <a href="/fr#movies" className="nav-link">
                Films
              </a>
              <a href="/fr#pricing" className="nav-link">
                Tarifs
              </a>
              <Link href="/fr/channels" className="nav-link active">
                Chaînes
              </Link>
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

      <main className="channel-categories-page" role="main">
        <div className="container">
          <h1 className="channel-categories-hero__title">Nos catégories de chaînes</h1>
          <p className="channel-categories-hero__lead">
            Un aperçu rapide de ce qui est inclus dans les offres GiGa FliX. Le nombre
            exact de chaînes varie selon le plan et le serveur — consultez les tarifs
            pour les détails les plus récents.
          </p>
        </div>

        <ol className="channel-timeline" aria-label="Liste des catégories de chaînes">
          {categories.map((item, i) => {
            const { title, text, imageKey, imageAlt, imageWidth, imageHeight, imageLayout } =
              item;
            const alt = i % 2 === 1;
            const src = channelCategoryImageSrc[imageKey];
            return (
              <li
                key={item.title}
                className={
                  alt
                    ? "channel-timeline__row channel-timeline__row--text-first"
                    : "channel-timeline__row"
                }
              >
                <div className="channel-timeline__cell channel-timeline__cell--art">
                  <div
                    className={
                      imageLayout === "tall"
                        ? "channel-cat-illu channel-cat-illu--tall"
                        : "channel-cat-illu"
                    }
                  >
                    <Image
                      src={src}
                      alt={imageAlt}
                      width={imageWidth}
                      height={imageHeight}
                      className="channel-cat-illu__img"
                      sizes={CHANNEL_CATEGORY_IMAGE_SIZES}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="channel-timeline__axis" aria-hidden="true">
                  <span className="channel-timeline__num">{i + 1}</span>
                </div>
                <div className="channel-timeline__cell channel-timeline__cell--text">
                  <h2 className="channel-timeline__heading">{title}</h2>
                  <p className="channel-timeline__desc">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="container">
          <div className="channel-categories-cta">
            <Link href="/fr#pricing" className="btn btn-primary">
              Voir les offres
            </Link>
            <Link href="/fr/contact" className="btn btn-outline">
              Contacter le support
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Link href="/fr" className="footer-logo">
                <Image src={logoImageSrc} alt="GiGa FliX Logo" width={160} height={40} sizes="160px" />
              </Link>
              <p className="footer-desc">Service d&apos;abonnement IPTV Premium.</p>
            </div>
            <div className="footer-links">
              <h3>Liens Rapides</h3>
              <ul>
                <li>
                  <Link href="/fr">Accueil</Link>
                </li>
                <li>
                  <Link href="/fr/channels">Chaînes</Link>
                </li>
                <li>
                  <a href="/fr#pricing">Tarifs</a>
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

