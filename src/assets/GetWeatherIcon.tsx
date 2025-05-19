import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";

import { JSX } from "react";

export function GetWeatherIcon(
  id: number,
  props: Omit<JSX.IntrinsicElements["svg"], "ref">
): JSX.Element {
  // Thunderstorm for Weather IDs in Range (200–232)
  if (id >= 200 && id <= 232) {
    return <CloudLightning {...props} />;
  }
  // Drizzle for Weather IDs in Range (300–321)
  if (id >= 300 && id <= 321) {
    return <CloudDrizzle {...props} />;
  }
  // Rain for Weather IDs in Range (500–531)
  if (id >= 500 && id <= 531) {
    return <CloudRain {...props} />;
  }
  // Snow for Weather IDs in Range (600–622)
  if (id >= 600 && id <= 622) {
    return <CloudSnow {...props} />;
  }
  // Atmosphere for Weather IDs in Range (701–781)
  if (id >= 701 && id <= 781) {
    return <CloudFog {...props} />;
  }
  // Clear sky for Weather ID in (800)
  if (id === 800) {
    return <Sun {...props} />;
  }
  // Clouds for Weather IDs in Range (801–804)
  if (id >= 801 && id <= 804) {
    return <Cloud {...props} />;
  }
  // Fallback
  return <Sun {...props} />;
}
