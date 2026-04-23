import type { SVGProps } from "react";
import {
  FaBasketball,
  FaFlagCheckered,
  FaFutbol,
  FaHorse,
  FaMotorcycle,
  FaTicket,
} from "react-icons/fa6";
import { IoTennisball } from "react-icons/io5";
import { MdOutlineSportsMartialArts, MdOutlineSportsMma, MdOutlineSportsRugby } from "react-icons/md";

const SPORT_ICONS = {
  football: FaFutbol,
  basketball: FaBasketball,
  tennis: IoTennisball,
  equestrian: FaHorse,
  rugby: MdOutlineSportsRugby,
  moto: FaMotorcycle,
  formula: FaFlagCheckered,
  mma: MdOutlineSportsMma,
  combat: MdOutlineSportsMartialArts,
  ppv: FaTicket,
} as const;

export type SportCategoryId = keyof typeof SPORT_ICONS;

export function SportCategoryIcon({
  category,
  className,
  ...rest
}: { category: SportCategoryId; className?: string } & SVGProps<SVGSVGElement>) {
  const Svg = SPORT_ICONS[category];
  return <Svg className={className} aria-hidden="true" focusable="false" {...rest} />;
}
