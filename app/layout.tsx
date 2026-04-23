import type { Metadata, Viewport } from "next";
import { siteLogoAbsoluteUrl } from "@/lib/site-images";
import { Outfit } from "next/font/google";
import { SetLang } from "./components/SetLang";
import ThirdPartyScripts from "./components/ThirdPartyScripts";
import ScrollEffects from "./components/ScrollEffects";
import Providers from "./providers";
import "./globals.css";
import "./catchontv-style.css";
import "@mantine/core/styles.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  adjustFontFallback: true,
});

/** Mobile-first: correct viewport + theme / status bar color for phones. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1b0d5f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gigaflixiptv.com"),
  title: "GiGa FliX IPTV | Premium IPTV Service 2026",
  description:
    "GiGa FliX offers premium IPTV streaming with 4K quality, stable servers, and quick setup for Firestick, Kodi, Smart TVs, and IPTV apps.",
  keywords:
    "IPTV service, IPTV provider, premium IPTV subscription, IPTV streaming, IPTV server, Smart IPTV, Xtream IPTV, M3U IPTV playlist, IPTV channels, IPTV on Firestick, IPTV on Kodi, IPTV Smarters, 4K IPTV streaming, live TV streaming, IPTV VOD, IPTV EPG, reliable IPTV provider",
  alternates: {
    canonical: "https://gigaflixiptv.com/",
    languages: {
      en: "https://gigaflixiptv.com/",
      fr: "https://gigaflixiptv.com/fr",
      de: "https://gigaflixiptv.com/de",
      it: "https://gigaflixiptv.com/it",
      nl: "https://gigaflixiptv.com/nl",
      pt: "https://gigaflixiptv.com/pt",
      "x-default": "https://gigaflixiptv.com/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://gigaflixiptv.com/",
    title: "GiGa FliX IPTV | Premium IPTV Service 2026",
    description:
      "GiGa FliX delivers premium IPTV streaming with 4K quality, stable servers, and fast setup across popular devices and apps.",
    images: [siteLogoAbsoluteUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiGa FliX IPTV | Premium IPTV Service 2026",
    description:
      "GiGa FliX is a premium IPTV provider with 4K live TV streaming, stable servers, and fast setup for popular devices.",
    images: [siteLogoAbsoluteUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://assets.aceternity.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://assets.aceternity.com" />
        <link rel="shortcut icon" href="/img/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://gigaflixiptv.com/",
              name: "GiGa FliX",
              url: "https://gigaflixiptv.com/",
              logo: siteLogoAbsoluteUrl,
              description:
                "GiGa FliX is a premium IPTV provider focused on stable streaming, fast setup, and broad device/app compatibility.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-579-3893-759",
                contactType: "customer service",
                email: "support@gigaflixiptv.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "GiGa FliX IPTV Subscription | Premium IPTV Service 2026",
              description:
                "GiGa FliX IPTV subscription with live channels, VOD library, and stable 4K-ready streaming. Fast setup and broad device support.",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "EUR",
                lowPrice: "13.97",
                highPrice: "69.97",
                offerCount: "3",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1250",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Amelie P.",
                  },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                  },
                  reviewBody:
                    "Setup was a breeze! The interface is slick, and the streaming quality is flawless. Best IPTV 2026 for sure.",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How to install IPTV?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Getting set up is incredibly fast and simple! 1. Pick your device (Smart TV, Android Box, Firestick, etc.). 2. Download our recommended IPTV player app. 3. Enter the subscription credentials we provide. 4. Launch the app and immediately start watching!",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is IPTV legal to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, IPTV is legal when the service provider strictly adheres to copyright laws and possesses the correct licensing for all the content they distribute. To stay protected and compliant, always choose established, reputable providers who operate within legal guidelines.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What internet speed do I need for IPTV?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "To guarantee the best viewing experience, we recommend: 10 Mbps for Standard Definition (SD), 20 Mbps for High Definition (HD), and 30+ Mbps for stunning Ultra HD (4K). However, remember that stability is even more crucial than raw speed—a consistent connection is key!",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need a VPN to use IPTV?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "While a VPN is not mandatory, we strongly recommend using one, especially depending on your region. A VPN enhances your online privacy, helps you bypass frustrating geo-restrictions, and prevents your Internet Service Provider (ISP) from deliberately slowing down (throttling) your streaming speed. It ensures a safer, smoother, and completely unrestricted streaming experience.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={outfit.variable}>
        <Providers>
          <SetLang />
          <ThirdPartyScripts />
          <ScrollEffects />
          {children}
        </Providers>
      </body>
    </html>
  );
}
