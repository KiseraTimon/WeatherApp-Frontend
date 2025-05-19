"use client";

import { Droplet, Gauge } from "lucide-react";
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
    <div className="card card-compact bg-base-100 shadow-md justify-start">
      {/* Card Title */}
      <div className="justify-start">
        <h3 className="card-title text-sm text-purple-500">Humidity</h3>
      </div>

      {/* Values & Scale */}
      <div className="card-body p-4">
        <p className="flex items-center space-x-10">
          <Droplet className="h-4 w-4 text-yellow-500" />
          <span className="text-green-500">
            <strong className="text-red-500">Value:</strong>
            <br />
            {humidity}%
          </span>
        </p>
        <p className="flex items-center space-x-10 text-pink-500">
          <Gauge className="h-4 w-4 text-pink-500" />
          <span className="text-pink-500">
            <strong className="text-yellow-500">Scale:</strong>
            <br />
            {scale}
          </span>
        </p>
      </div>
    </div>
  );
}
