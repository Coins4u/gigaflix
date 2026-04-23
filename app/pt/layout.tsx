import type { Metadata } from "next";
import { siteLogoAbsoluteUrl } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "GiGa FliX IPTV Portugal | IPTV Premium",
  description:
    "GiGa FliX oferece IPTV premium com streaming 4K, servidores estáveis e configuração rápida em apps e dispositivos populares.",
  alternates: {
    canonical: "https://gigaflixiptv.com/pt",
  },
  openGraph: {
    type: "website",
    url: "https://gigaflixiptv.com/pt",
    title: "GiGa FliX IPTV Portugal | IPTV Premium",
    description:
      "GiGa FliX: IPTV Portugal, streaming 4K, playlists M3U e streams estáveis.",
    images: [siteLogoAbsoluteUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "GiGa FliX IPTV Portugal | IPTV Premium",
    description:
      "GiGa FliX: IPTV premium com 4K, playlists M3U e streams estáveis.",
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
