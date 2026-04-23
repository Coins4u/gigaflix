import type { Metadata } from "next";
import { siteLogoAbsoluteUrl } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "GiGa FliX IPTV Italia | Servizio IPTV Premium",
  description:
    "GiGa FliX offre IPTV Italia con streaming 4K, server stabili e configurazione rapida su Smart TV, Firestick e app IPTV.",
  alternates: {
    canonical: "https://gigaflixiptv.com/it",
  },
  openGraph: {
    type: "website",
    url: "https://gigaflixiptv.com/it",
    title: "GiGa FliX IPTV Italia | Servizio IPTV Premium",
    description:
      "GiGa FliX: abbonamenti IPTV, streaming stabile, 4K e supporto per dispositivi e app popolari.",
    images: [siteLogoAbsoluteUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiGa FliX IPTV Italia | Servizio IPTV Premium",
    description:
      "GiGa FliX: IPTV Italia premium con 4K, server stabili e configurazione rapida.",
    images: [siteLogoAbsoluteUrl],
  },
};

export default function FrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
