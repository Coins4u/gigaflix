import type { Metadata } from "next";
import { siteLogoAbsoluteUrl } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "GiGa FliX IPTV Nederland | IPTV Abonnement",
  description:
    "GiGa FliX biedt IPTV met abonnement, 4K-kwaliteit, stabiele streams en snelle installatie op populaire apparaten en apps.",
  alternates: {
    canonical: "https://gigaflixiptv.com/nl",
  },
  openGraph: {
    type: "website",
    url: "https://gigaflixiptv.com/nl",
    title: "GiGa FliX IPTV Nederland | IPTV Abonnement",
    description:
      "GiGa FliX: IPTV met abonnement, 4K, M3U-lijsten en stabiele streams op populaire apparaten.",
    images: [siteLogoAbsoluteUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiGa FliX IPTV Nederland | IPTV Abonnement",
    description:
      "GiGa FliX: IPTV met abonnement, 4K-kwaliteit en stabiele streams.",
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
