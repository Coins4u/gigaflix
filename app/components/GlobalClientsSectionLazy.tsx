"use client";

import dynamic from "next/dynamic";
import type { GlobalClientsSectionProps } from "./GlobalClientsSection";

const GlobalClients = dynamic(
  () => import("./GlobalClientsSection"),
  {
    ssr: false,
    loading: () => (
      <section
        className="global-clients-section"
        style={{ minHeight: 420 }}
        role="status"
        aria-label="Loading map"
      />
    ),
  },
);

export default function GlobalClientsSectionLazy(props: GlobalClientsSectionProps) {
  return <GlobalClients {...props} />;
}
