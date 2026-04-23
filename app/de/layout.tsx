import type { Metadata } from "next";
import { siteLogoAbsoluteUrl } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "GiGa FliX IPTV – Premium IPTV in Deutschland",
  description:
    "GiGa FliX bietet Premium IPTV mit 4K-Streaming, stabilen Servern und schneller Einrichtung für Firestick, Kodi, Smart TVs und IPTV-Apps.",
  alternates: {
    canonical: "https://gigaflixiptv.com/de",
  },
  openGraph: {
    type: "website",
    url: "https://gigaflixiptv.com/de",
    title: "GiGa FliX IPTV – Premium IPTV in Deutschland",
    description:
      "GiGa FliX bietet IPTV mit 4K-Qualität, stabilen Streams und einfacher Einrichtung auf beliebten Geräten.",
    images: [siteLogoAbsoluteUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiGa FliX IPTV – Premium IPTV in Deutschland",
    description:
      "GiGa FliX: Premium IPTV mit 4K-Streaming, stabilen Servern und schneller Einrichtung.",
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
