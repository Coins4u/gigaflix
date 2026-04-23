"use client";

import { Text } from "@mantine/core";
import { SportCategoryIcon, type SportCategoryId } from "./SportCategoryIcon";

export type SportsMarqueeItem = { id: SportCategoryId; label: string };

type Props = {
  title: string;
  pillKicker: string;
  pillMeta: string;
  marqueeAriaLabel: string;
  items: SportsMarqueeItem[];
};

export default function SportsMarqueeSection({
  title,
  pillKicker,
  pillMeta,
  marqueeAriaLabel,
  items,
}: Props) {
  const loop = [...items, ...items];

  return (
    <div className="sports-slider-block" data-scroll="fade">
      <Text
        className="sports-slider-block__title"
        fw={800}
        fz="lg"
        ta="center"
        style={{ letterSpacing: 0.3, marginBottom: 16 }}
      >
        {title}
      </Text>
      <div className="sports-slider-ui">
        <div className="sports-slider-ui__glow" aria-hidden />
        <div className="sports-slider-ui__scan" aria-hidden />
        <div
          className="sports-marquee"
          role="region"
          aria-label={marqueeAriaLabel}
        >
          <div className="sports-marquee__track" aria-hidden="true">
            {loop.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="sports-marquee__item">
                <div className="sports-pill">
                  <div className="sports-pill__icon" aria-hidden>
                    <SportCategoryIcon category={item.id} className="icon" />
                  </div>
                  <div className="sports-pill__body">
                    <span className="sports-pill__kicker">{pillKicker}</span>
                    <span className="sports-pill__label">{item.label}</span>
                    <span className="sports-pill__meta">{pillMeta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
