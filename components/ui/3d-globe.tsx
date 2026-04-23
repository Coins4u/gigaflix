"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

export type GlobeMarker = {
  lat: number;
  lng: number;
  src?: string;
  label?: string;
};

export type GlobeConfig = {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
  /**
   * If true, occasionally randomizes autoRotateSpeed (direction + speed).
   * Gives a more "alive" feel than constant rotation.
   */
  randomAutoRotate?: boolean;
};

type Props = {
  className?: string;
  markers: GlobeMarker[];
  config?: GlobeConfig;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
};

// react-globe.gl uses Three.js and needs the browser.
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function Globe3D({
  className,
  markers,
  config,
  onMarkerClick,
  onMarkerHover,
}: Props) {
  const ref = useRef<GlobeMethods | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<GlobeMarker | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const htmlData = useMemo(() => markers, [markers]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const w = Math.max(0, Math.floor(el.clientWidth));
      const h = Math.max(0, Math.floor(el.clientHeight));
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    // react-globe.gl initializes controls asynchronously; be robust and retry.
    let cancelled = false;
    let retryTimer: number | null = null;
    let randomTimer: number | null = null;

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const apply = () => {
      const globe = ref.current;
      const controls = globe?.controls?.();
      if (!globe || !controls) return false;

      // Make sure rotation is enabled (some init paths reset this).
      controls.autoRotate = true;
      controls.autoRotateSpeed = config?.autoRotateSpeed ?? 0.35;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;

      return true;
    };

    const scheduleRandom = () => {
      if (!config?.randomAutoRotate) return;
      const controls = ref.current?.controls?.();
      if (!controls) return;

      const pickSpeed = () => {
        const magnitude = rand(0.45, 1.15);
        const direction = Math.random() < 0.5 ? -1 : 1;
        return magnitude * direction;
      };

      const nextInMs = Math.floor(rand(4500, 11000));
      randomTimer = window.setTimeout(() => {
        if (cancelled) return;
        const controlsNow = ref.current?.controls?.();
        if (controlsNow) {
          controlsNow.autoRotate = true;
          controlsNow.autoRotateSpeed = pickSpeed();
        }
        scheduleRandom();
      }, nextInMs);
    };

    const start = () => {
      if (cancelled) return;
      if (apply()) {
        scheduleRandom();
        return;
      }
      // Retry for a short window until controls exist.
      retryTimer = window.setTimeout(start, 120);
    };

    start();

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      if (randomTimer) window.clearTimeout(randomTimer);
    };
  }, [config?.autoRotateSpeed, config?.randomAutoRotate, size.w, size.h]);

  useEffect(() => {
    onMarkerHover?.(hovered);
  }, [hovered, onMarkerHover]);

  return (
    <div ref={wrapRef} className={className}>
      <Globe
        ref={ref as any}
        width={size.w || undefined}
        height={size.h || undefined}
        backgroundColor="rgba(0,0,0,0)"
        // Globe visuals
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor={config?.atmosphereColor ?? "#4da6ff"}
        atmosphereAltitude={(config?.atmosphereIntensity ?? 20) / 200}
        // Markers as HTML elements (avatar + pulse)
        htmlElementsData={htmlData as any}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlAltitude={() => 0.05}
        htmlElement={(d: any) => {
          const marker: GlobeMarker = d;
          const el = document.createElement("div");
          el.className = "globe-marker";
          el.innerHTML = `
            <span class="globe-marker__pulse"></span>
            <span class="globe-marker__dot"></span>
            ${
              marker.src
                ? `<img class="globe-marker__img" src="${marker.src}" alt="" loading="lazy" />`
                : ""
            }
          `;

          el.addEventListener("mouseenter", () => setHovered(marker));
          el.addEventListener("mouseleave", () => setHovered(null));
          el.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            onMarkerClick?.(marker);
          });

          return el;
        }}
      />
    </div>
  );
}

export function GlobeMarkerLabel({ marker }: { marker: GlobeMarker | null }) {
  if (!marker?.label) return null;
  return <span className="globe-marker-label">{marker.label}</span>;
}

