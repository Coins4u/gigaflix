"use client";

import { useState, type ReactNode } from "react";
import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { Globe3D, GlobeMarkerLabel, type GlobeMarker } from "@/components/ui/3d-globe";

const markers: GlobeMarker[] = [
  
  // Europe-heavy footprint (primary client base)
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
  { lat: 52.3676, lng: 4.9041, src: "https://assets.aceternity.com/avatars/12.webp", label: "Amsterdam" },
  { lat: 52.52, lng: 13.405, src: "https://assets.aceternity.com/avatars/9.webp", label: "Berlin" },
  { lat: 41.9028, lng: 12.4964, src: "https://assets.aceternity.com/avatars/6.webp", label: "Rome" },
  { lat: 40.4168, lng: -3.7038, src: "https://assets.aceternity.com/avatars/4.webp", label: "Madrid" },
  { lat: 38.7223, lng: -9.1393, src: "https://assets.aceternity.com/avatars/8.webp", label: "Lisbon" },
  { lat: 52.2297, lng: 21.0122, src: "https://assets.aceternity.com/avatars/10.webp", label: "Warsaw" },
  { lat: 50.0755, lng: 14.4378, src: "https://assets.aceternity.com/avatars/7.webp", label: "Prague" },
  { lat: 47.4979, lng: 19.0402, src: "https://assets.aceternity.com/avatars/11.webp", label: "Budapest" },
  { lat: 48.2082, lng: 16.3738, src: "https://assets.aceternity.com/avatars/1.webp", label: "Vienna" },
  { lat: 59.3293, lng: 18.0686, src: "https://assets.aceternity.com/avatars/3.webp", label: "Stockholm" },
  { lat: 55.6761, lng: 12.5683, src: "https://assets.aceternity.com/avatars/13.webp", label: "Copenhagen" },
  { lat: 41.0082, lng: 28.9784, src: "https://assets.aceternity.com/avatars/14.webp", label: "Istanbul" },
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/15.webp", label: "New York" },
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
  { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/7.webp", label: "Moscow" },
  { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio de Janeiro" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },

];

const defaultDescription: ReactNode = (
  <>
    GiGa FliX serves viewers worldwide with <strong>4K-ready</strong> streaming,{" "}
    <strong>stable servers</strong>, and fast setup on Firestick, Smart TVs, mobile, and
    IPTV apps. Wherever you are, your channels and PPV events stay smooth.
  </>
);

export type GlobalClientsSectionProps = {
  title?: string;
  description?: ReactNode;
  ctaPrimary?: string;
  ctaSecondary?: string;
  supportHref?: string;
};

export default function GlobalClientsSection({
  title = "Global clients. One stable IPTV experience.",
  description = defaultDescription,
  ctaPrimary = "Get Started",
  ctaSecondary = "Talk to Support",
  supportHref = "/contact",
}: GlobalClientsSectionProps) {
  const [hovered, setHovered] = useState<GlobeMarker | null>(null);

  return (
    <section className="global-clients-section" data-scroll="scale">
      <div className="container">
        <div className="global-clients-shell">
          <Card withBorder radius="xl" padding="xl" className="global-clients-card">
            <div className="global-clients-grid">
              <Stack gap="md" className="global-clients-copy">
                <Text fw={900} fz={38} lh={1.1} style={{ letterSpacing: -0.5 }}>
                  {title}
                </Text>
                <Text c="dimmed" fz="lg" lh={1.6} maw={560}>
                  {description}
                </Text>

                <Group gap="md" wrap="wrap">
                  <Button component="a" href="#pricing" radius="xl" size="md">
                    {ctaPrimary}
                  </Button>
                  <Button
                    component="a"
                    href={supportHref}
                    radius="xl"
                    size="md"
                    variant="light"
                  >
                    {ctaSecondary}
                  </Button>
                </Group>
              </Stack>

              <div
                className="global-clients-globeWrap"
                role="region"
                aria-label="GiGa FliX global clients map"
              >
                <Globe3D
                  className="global-clients-globe"
                  markers={markers}
                  config={{
                    atmosphereColor: "#4da6ff",
                    atmosphereIntensity: 20,
                    autoRotateSpeed: 0.9,
                    randomAutoRotate: true,
                  }}
                  onMarkerHover={(m) => setHovered(m)}
                />
                <div className="global-clients-label">
                  <GlobeMarkerLabel marker={hovered} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

