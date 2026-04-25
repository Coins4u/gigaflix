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
  title: "Categorie canali | GiGa FliX IPTV",
  description:
    "Scopri le categorie canali GiGa FliX: sport, film, news, kids, intrattenimento e musica in HD e 4K.",
  alternates: { canonical: "https://gigaflixiptv.com/it/channels" },
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

export default function ItChannelsPage() {
  return (
    <>
      <CatchonTVUIClient currency="eur" />
      <header className="header">
        <div className="container">
          <div className="nav-wrapper">
            <Link href="/it" className="logo">
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
              <Link href="/it" className="nav-link">
                Home
              </Link>
              <a href="/it#sports" className="nav-link">
                Sport
              </a>
              <a href="/it#movies" className="nav-link">
                Film
              </a>
              <a href="/it#pricing" className="nav-link">
                Prezzi
              </a>
              <Link href="/it/channels" className="nav-link active">
                Canali
              </Link>
              <Link href="/it/guide" className="nav-link">
                Guida Installazione
              </Link>
              <Link href="/it/contact" className="nav-link">
                Contatti
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="channel-categories-page" role="main">
        <div className="container">
          <h1 className="channel-categories-hero__title">Le nostre categorie canali</h1>
          <p className="channel-categories-hero__lead">
            Una panoramica rapida di cosa include GiGa FliX. Il numero esatto di canali
            varia in base al piano e al server — consulta i prezzi per i dettagli più
            aggiornati.
          </p>
        </div>

        <ol className="channel-timeline" aria-label="Elenco categorie canali">
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
            <Link href="/it#pricing" className="btn btn-primary">
              Vedi i piani
            </Link>
            <Link href="/it/contact" className="btn btn-outline">
              Parla col supporto
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Link href="/it" className="footer-logo">
                <Image src={logoImageSrc} alt="GiGa FliX Logo" width={160} height={40} sizes="160px" />
              </Link>
              <p className="footer-desc">Servizio di abbonamento IPTV Premium.</p>
            </div>
            <div className="footer-links">
              <h3>Link Rapidi</h3>
              <ul>
                <li>
                  <Link href="/it">Home</Link>
                </li>
                <li>
                  <Link href="/it/channels">Canali</Link>
                </li>
                <li>
                  <a href="/it#pricing">Prezzi</a>
                </li>
                <li>
                  <Link href="/it/guide">Guida Installazione</Link>
                </li>
                <li>
                  <Link href="/it/contact">Contatti</Link>
                </li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Legale</h3>
              <ul>
                <li>
                  <Link href="/it/TermsConditions">Termini e Condizioni</Link>
                </li>
                <li>
                  <Link href="/it/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/it/RefundPolicy">Politica di Rimborso</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2026 GiGa FliX. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/17624385265"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contattaci su WhatsApp"
      >
        <Icon name="whatsapp" className="icon" />
      </a>
    </>
  );
}

