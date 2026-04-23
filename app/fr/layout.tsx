import type { Metadata } from "next";
import { siteLogoAbsoluteUrl } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "GiGa FliX IPTV | Abonnement IPTV France",
  description:
    "GiGa FliX propose un abonnement IPTV premium : streaming 4K, serveurs stables, installation rapide et compatibilité avec les principales apps IPTV.",
  alternates: {
    canonical: "https://gigaflixiptv.com/fr",
  },
  openGraph: {
    type: "website",
    url: "https://gigaflixiptv.com/fr",
    title: "GiGa FliX IPTV | Abonnement IPTV France",
    description:
      "GiGa FliX : abonnement IPTV premium, streaming 4K, serveurs stables et accès sur appareils et applications populaires.",
    images: [siteLogoAbsoluteUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiGa FliX IPTV | Abonnement IPTV France",
    description:
      "GiGa FliX : abonnement IPTV premium, 4K, serveurs stables et installation rapide.",
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
