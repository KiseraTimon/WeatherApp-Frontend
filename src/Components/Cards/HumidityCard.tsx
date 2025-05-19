"use client";

import { Droplet } from "lucide-react";
import { JSX } from "react";

// Type Definition
interface HumidityCardProps {
  humidity: number;
}

// Helper Func to Categorize Humidity Values
function humidityScale(h: number): string {
  if (h < 30) return "Low";
  if (h < 60) return "Moderate";
  return "High";
}

// Rendering Humidity Card
export default function HumidityCard(props: HumidityCardProps): JSX.Element {
  const { humidity } = props;
  const scale = humidityScale(humidity);

  return (
    <div className="card card-compact bg-base-100 shadow-md">
      {/* Card Title */}
      <div className="card-header flex items-center space-x-2">
        <Droplet className="h-5 w-5 text-primary" />
        <h3 className="card-title text-sm">Humidity</h3>
      </div>

      {/* Values & Scale */}
      <div className="card-body p-4">
        <p>
          <strong>Value:</strong> {humidity}%
        </p>
        <p>
          <strong>Scale:</strong> {scale}
        </p>
      </div>
    </div>
  );
}
